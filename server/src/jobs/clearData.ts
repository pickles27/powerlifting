import { pool } from "../db";

async function clearData() {
  console.log("Clearing all data from lifts table...");

  try {
    const result = await pool.query("DELETE FROM lifts");
    console.log(`✓ Deleted ${result.rowCount} rows`);
    console.log("✅ Database cleared - ready for fresh import");
  } catch (error) {
    console.error("Error clearing data:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

clearData().catch(console.error);
