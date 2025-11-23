import {
  Lift,
  QueryLiftsArgs,
  QuerySbdByBodyweightArgs,
  ResolverFn,
  SbdDataPoint,
} from "../__generated__/resolvers-types";
import { Context } from "../context";
import { toDbEnum, toGraphQLEnum } from "../transformers/enumConverters";

export const sbdByBodyweight: ResolverFn<
  SbdDataPoint[],
  {},
  Context,
  QuerySbdByBodyweightArgs
> = async (parent, args, context, info) => {
  const { pool } = context;
  const {
    bodyweightMin,
    bodyweightMax,
    sex,
    event,
    equipment,
    limit = 1000,
    offset = 0,
  } = args;

  const where: string[] = [];
  const values: any[] = [];
  let idx = 1;

  // Always require non-null bodyweight
  where.push(`bodyweight_kg IS NOT NULL`);

  if (bodyweightMin !== undefined && bodyweightMin !== null) {
    where.push(`bodyweight_kg >= $${idx++}`);
    values.push(bodyweightMin);
  }
  if (bodyweightMax !== undefined && bodyweightMax !== null) {
    where.push(`bodyweight_kg <= $${idx++}`);
    values.push(bodyweightMax);
  }
  if (sex) {
    where.push(`sex = $${idx++}`);
    values.push(sex);
  }
  if (event) {
    where.push(`event = $${idx++}`);
    values.push(event);
  }
  if (equipment) {
    where.push(`equipment = $${idx++}`);
    values.push(toDbEnum(equipment));
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const query = `
    SELECT id, bodyweight_kg, best3_squat_kg, best3_bench_kg, best3_deadlift_kg, total_kg, equipment, sex
    FROM lifts
    ${whereClause}
    ORDER BY date DESC
    LIMIT $${idx++}
    OFFSET $${idx}
  `;
  values.push(limit, offset);

  const { rows } = await pool.query(query, values);

  return rows.map((row) => ({
    bodyweightKg: row.bodyweight_kg,
    best3SquatKg: row.best3_squat_kg,
    best3BenchKg: row.best3_bench_kg,
    best3DeadliftKg: row.best3_deadlift_kg,
    totalKg: row.total_kg,
    equipment: row.equipment ? toGraphQLEnum(row.equipment) : row.equipment,
    sex: row.sex,
    event: row.event,
  })) as SbdDataPoint[];
};
