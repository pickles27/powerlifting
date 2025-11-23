import {
  Lift,
  QueryLiftsArgs,
  ResolverFn,
} from "../__generated__/resolvers-types";
import { Context } from "../context";
import { toDbEnum, toGraphQLEnum } from "../transformers/enumConverters";

export const lifts: ResolverFn<Lift[], {}, Context, QueryLiftsArgs> = async (
  parent,
  args,
  context,
  info
) => {
  const { pool } = context;
  const {
    bodyweightMin,
    bodyweightMax,
    dateMin,
    dateMax,
    sex,
    event,
    equipment,
    ageMin,
    ageMax,
    ageClass,
    limit = 1000,
    offset = 0,
  } = args;

  const where: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (bodyweightMin !== undefined && bodyweightMin !== null) {
    where.push(`bodyweight_kg >= $${idx++}`);
    values.push(bodyweightMin);
  }
  if (bodyweightMax !== undefined && bodyweightMax !== null) {
    where.push(`bodyweight_kg <= $${idx++}`);
    values.push(bodyweightMax);
  }
  if (dateMin) {
    where.push(`date >= $${idx++}`);
    values.push(dateMin);
  }
  if (dateMax) {
    where.push(`date <= $${idx++}`);
    values.push(dateMax);
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
  if (ageMin !== undefined && ageMin !== null) {
    where.push(`age >= $${idx++}`);
    values.push(ageMin);
  }
  if (ageMax !== undefined && ageMax !== null) {
    where.push(`age <= $${idx++}`);
    values.push(ageMax);
  }
  if (ageClass) {
    where.push(`age_class = $${idx++}`);
    values.push(ageClass);
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const query = `
    SELECT *
    FROM lifts
    ${whereClause}
    ORDER BY date DESC
    LIMIT $${idx++}
    OFFSET $${idx}
  `;
  values.push(limit, offset);

  const { rows } = await pool.query(query, values);

  return rows.map((row) => ({
    ...row,
    equipment: row.equipment ? toGraphQLEnum(row.equipment) : row.equipment,
  })) as Lift[];
};
