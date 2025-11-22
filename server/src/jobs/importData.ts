import https from "https";
import unzipper from "unzipper";
import csv from "csv-parser";
import { pipeline } from "stream/promises";
import { pool } from "../db";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import os from "os";

// Type for raw CSV row data
interface RawCSVRow {
  Name: string;
  Sex: string;
  Event: string;
  Equipment: string;
  Age?: string;
  AgeClass?: string;
  BirthYearClass?: string;
  Division?: string;
  BodyweightKg?: string;
  WeightClassKg?: string;
  Squat1Kg?: string;
  Squat2Kg?: string;
  Squat3Kg?: string;
  Squat4Kg?: string;
  Best3SquatKg?: string;
  Bench1Kg?: string;
  Bench2Kg?: string;
  Bench3Kg?: string;
  Bench4Kg?: string;
  Best3BenchKg?: string;
  Deadlift1Kg?: string;
  Deadlift2Kg?: string;
  Deadlift3Kg?: string;
  Deadlift4Kg?: string;
  Best3DeadliftKg?: string;
  TotalKg?: string;
  Place?: string;
  Dots?: string;
  Wilks?: string;
  Glossbrenner?: string;
  Goodlift?: string;
  Tested?: string;
  Country?: string;
  State?: string;
  Federation?: string;
  ParentFederation?: string;
  Date?: string;
  MeetCountry?: string;
  MeetState?: string;
  MeetTown?: string;
  MeetName: string;
  Sanctioned?: string;
}

// Type for transformed database row
interface LiftRow {
  source_hash: string;
  name: string;
  sex: string;
  event: string;
  equipment: string;
  age: number | null;
  age_class: string | undefined;
  birth_year_class: string | undefined;
  division: string | undefined;
  bodyweight_kg: number | null;
  weight_class_kg: string | undefined;
  squat1_kg: number | null;
  squat2_kg: number | null;
  squat3_kg: number | null;
  squat4_kg: number | null;
  best3_squat_kg: number | null;
  bench1_kg: number | null;
  bench2_kg: number | null;
  bench3_kg: number | null;
  bench4_kg: number | null;
  best3_bench_kg: number | null;
  deadlift1_kg: number | null;
  deadlift2_kg: number | null;
  deadlift3_kg: number | null;
  deadlift4_kg: number | null;
  best3_deadlift_kg: number | null;
  total_kg: number | null;
  place: string | undefined;
  dots: number | null;
  wilks: number | null;
  glossbrenner: number | null;
  goodlift: number | null;
  tested: string | undefined;
  country: string | undefined;
  state: string | undefined;
  federation: string | undefined;
  parent_federation: string | undefined;
  date: string | null;
  meet_country: string | undefined;
  meet_state: string | undefined;
  meet_town: string | undefined;
  meet_name: string;
  sanctioned: string | undefined;
}

function generateHash(row: RawCSVRow): string {
  // Include all key data that makes a lift unique:
  // - Lifter identity (name, sex, age class, bodyweight)
  // - Competition context (date, meet, division, equipment, event, weight class)
  // - Results (best lifts and total to distinguish different performances)
  const key = [
    row.Name,
    row.Date,
    row.MeetName,
    row.Equipment,
    row.Division,
    row.Event,
    row.WeightClassKg,
    row.BodyweightKg,
    row.AgeClass,
    // Include best lifts and total to make each performance unique
    row.Best3SquatKg,
    row.Best3BenchKg,
    row.Best3DeadliftKg,
    row.TotalKg,
    row.Place,
  ].join("|");

  return crypto.createHash("sha256").update(key).digest("hex");
}

function parseNumeric(value: string | undefined): number | null {
  if (!value || value === "") return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

function transformRow(row: RawCSVRow): LiftRow {
  return {
    source_hash: generateHash(row),
    name: row.Name,
    sex: row.Sex,
    event: row.Event,
    equipment: row.Equipment,
    age: parseNumeric(row.Age),
    age_class: row.AgeClass,
    birth_year_class: row.BirthYearClass,
    division: row.Division,
    bodyweight_kg: parseNumeric(row.BodyweightKg),
    weight_class_kg: row.WeightClassKg,

    squat1_kg: parseNumeric(row.Squat1Kg),
    squat2_kg: parseNumeric(row.Squat2Kg),
    squat3_kg: parseNumeric(row.Squat3Kg),
    squat4_kg: parseNumeric(row.Squat4Kg),
    best3_squat_kg: parseNumeric(row.Best3SquatKg),

    bench1_kg: parseNumeric(row.Bench1Kg),
    bench2_kg: parseNumeric(row.Bench2Kg),
    bench3_kg: parseNumeric(row.Bench3Kg),
    bench4_kg: parseNumeric(row.Bench4Kg),
    best3_bench_kg: parseNumeric(row.Best3BenchKg),

    deadlift1_kg: parseNumeric(row.Deadlift1Kg),
    deadlift2_kg: parseNumeric(row.Deadlift2Kg),
    deadlift3_kg: parseNumeric(row.Deadlift3Kg),
    deadlift4_kg: parseNumeric(row.Deadlift4Kg),
    best3_deadlift_kg: parseNumeric(row.Best3DeadliftKg),

    total_kg: parseNumeric(row.TotalKg),
    place: row.Place,
    dots: parseNumeric(row.Dots),
    wilks: parseNumeric(row.Wilks),
    glossbrenner: parseNumeric(row.Glossbrenner),
    goodlift: parseNumeric(row.Goodlift),
    tested: row.Tested,

    country: row.Country,
    state: row.State,
    federation: row.Federation,
    parent_federation: row.ParentFederation,

    date: row.Date || null,
    meet_country: row.MeetCountry,
    meet_state: row.MeetState,
    meet_town: row.MeetTown,
    meet_name: row.MeetName,
    sanctioned: row.Sanctioned,
  };
}

async function upsertBatch(rows: LiftRow[]): Promise<void> {
  if (rows.length === 0) return;

  // Deduplicate rows by source_hash - keep only the last occurrence
  const uniqueRows = Array.from(
    new Map(rows.map((row) => [row.source_hash, row])).values()
  );

  if (uniqueRows.length < rows.length) {
    console.log(
      `Deduplicated ${rows.length - uniqueRows.length} duplicate rows in batch`
    );
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const columns = Object.keys(uniqueRows[0]);
    const numCols = columns.length;

    const values = uniqueRows
      .map((_, idx) => {
        const offset = idx * numCols;
        const params = columns.map((_, colIdx) => `$${offset + colIdx + 1}`);
        return `(${params.join(",")})`;
      })
      .join(",");

    const flatValues = uniqueRows.flatMap((row) =>
      columns.map((col) => row[col as keyof LiftRow])
    );

    await client.query(
      `
      INSERT INTO lifts (${columns.join(",")})
      VALUES ${values}
      ON CONFLICT (source_hash) 
      DO NOTHING
    `,
      flatValues
    );

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Batch upsert failed:", e);
    throw e;
  } finally {
    client.release();
  }
}

async function downloadZipFile(url: string): Promise<string> {
  const tempFile = path.join(os.tmpdir(), `openpowerlifting-${Date.now()}.zip`);
  const fileStream = fs.createWriteStream(tempFile);

  console.log(`Downloading ${url}...`);

  await new Promise<void>((resolve, reject) => {
    https.get(url, (response) => {
      const totalBytes = parseInt(
        response.headers["content-length"] || "0",
        10
      );
      let downloadedBytes = 0;
      let lastPercent = 0;

      response.on("data", (chunk) => {
        downloadedBytes += chunk.length;
        const percent = Math.floor((downloadedBytes / totalBytes) * 100);
        if (percent % 10 === 0 && percent > lastPercent) {
          console.log(
            `${percent}% (${(downloadedBytes / 1024 / 1024).toFixed(1)} MB)`
          );
          lastPercent = percent;
        }
      });

      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
        console.log(
          `✓ Downloaded ${(downloadedBytes / 1024 / 1024).toFixed(1)} MB`
        );
        resolve();
      });

      fileStream.on("error", reject);
    });
  });

  return tempFile;
}

async function processZipFromUrl(url: string): Promise<void> {
  const batchSize = 100;
  let batch: LiftRow[] = [];
  let processedCount = 0;
  let errorCount = 0;
  const startTime = Date.now();

  console.log(`Starting import from: ${url}`);

  // Download the ZIP file first
  const zipFile = await downloadZipFile(url);
  console.log(`Processing: ${zipFile}`);

  try {
    await pipeline(
      fs.createReadStream(zipFile),
      unzipper.ParseOne(/\.csv$/),
      csv(),
      async function* (sourceStream) {
        for await (const row of sourceStream) {
          try {
            batch.push(transformRow(row as RawCSVRow));

            if (batch.length >= batchSize) {
              await upsertBatch(batch);
              processedCount += batch.length;

              if (processedCount % 10000 === 0) {
                const elapsed = (Date.now() - startTime) / 1000;
                const rate = Math.round(processedCount / elapsed);
                console.log(
                  `Processed ${processedCount.toLocaleString()} rows (${rate}/sec)${
                    errorCount > 0 ? ` | ${errorCount} errors` : ""
                  }`
                );
              }

              batch = [];
            }
          } catch (error) {
            errorCount++;
            console.error(`Error processing row:`, error);
          }
        }

        if (batch.length > 0) {
          await upsertBatch(batch);
          processedCount += batch.length;
        }

        const totalTime = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
        console.log(
          `✓ Complete: ${processedCount.toLocaleString()} rows in ${totalTime} minutes${
            errorCount > 0 ? ` (${errorCount} errors)` : ""
          }`
        );
      }
    );
  } catch (error: any) {
    console.error(`Import failed:`, error.message);
    const elapsed = (Date.now() - startTime) / 1000 / 60;
    console.log(`\nStopped after ${elapsed.toFixed(2)} minutes`);
    console.log(`Rows processed: ${processedCount.toLocaleString()}`);
    throw error;
  } finally {
    // Clean up temp file
    if (fs.existsSync(zipFile)) {
      fs.unlinkSync(zipFile);
    }
    await pool.end();
  }
}

// Default OpenPowerlifting data URL (updates daily)
const DATA_URL =
  "https://openpowerlifting.gitlab.io/opl-csv/files/openpowerlifting-latest.zip";

processZipFromUrl(DATA_URL).catch(console.error);
