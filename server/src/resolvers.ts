import { pool } from "./db";

interface LeaderboardArgs {
  sex?: string;
  equipment?: string;
  weightClass?: string;
  event?: string;
  federation?: string;
  limit?: number;
  sortBy?: string;
}

export const resolvers = {
  Query: {
    leaderboard: async (_: any, args: LeaderboardArgs) => {
      let whereClauses = ["total_kg IS NOT NULL"];
      let params: any[] = [];
      let paramCount = 1;

      if (args.sex) {
        whereClauses.push(`sex = $${paramCount++}`);
        params.push(args.sex);
      }
      if (args.equipment) {
        whereClauses.push(`equipment = $${paramCount++}`);
        params.push(args.equipment);
      }
      if (args.weightClass) {
        whereClauses.push(`weight_class_kg = $${paramCount++}`);
        params.push(args.weightClass);
      }
      if (args.event) {
        whereClauses.push(`event = $${paramCount++}`);
        params.push(args.event);
      }
      if (args.federation) {
        whereClauses.push(`federation = $${paramCount++}`);
        params.push(args.federation);
      }

      const sortColumn = (args.sortBy || "DOTS").toLowerCase();

      const result = await pool.query(
        `
        SELECT 
          id,
          name,
          sex,
          event,
          equipment,
          age,
          age_class as "ageClass",
          division,
          bodyweight_kg as "bodyweightKg",
          weight_class_kg as "weightClassKg",
          best3_squat_kg as "best3SquatKg",
          best3_bench_kg as "best3BenchKg",
          best3_deadlift_kg as "best3DeadliftKg",
          total_kg as "totalKg",
          place,
          dots,
          wilks,
          federation,
          date::text,
          meet_name as "meetName",
          meet_town as "meetTown",
          meet_state as "meetState",
          meet_country as "meetCountry",
          tested
        FROM lifts
        WHERE ${whereClauses.join(" AND ")}
          AND ${sortColumn} IS NOT NULL
        ORDER BY ${sortColumn} DESC
        LIMIT $${paramCount}
      `,
        [...params, args.limit || 100]
      );

      return result.rows;
    },

    lifterHistory: async (_: any, { name }: { name: string }) => {
      const result = await pool.query(
        `
        SELECT 
          id,
          name,
          sex,
          event,
          equipment,
          age,
          age_class as "ageClass",
          division,
          bodyweight_kg as "bodyweightKg",
          weight_class_kg as "weightClassKg",
          best3_squat_kg as "best3SquatKg",
          best3_bench_kg as "best3BenchKg",
          best3_deadlift_kg as "best3DeadliftKg",
          total_kg as "totalKg",
          place,
          dots,
          wilks,
          federation,
          date::text,
          meet_name as "meetName",
          meet_town as "meetTown",
          meet_state as "meetState",
          meet_country as "meetCountry",
          tested
        FROM lifts
        WHERE name = $1
        ORDER BY date DESC
      `,
        [name]
      );

      return result.rows;
    },

    meetResults: async (
      _: any,
      { meetName, date }: { meetName: string; date: string }
    ) => {
      const result = await pool.query(
        `
        SELECT 
          id,
          name,
          sex,
          event,
          equipment,
          age,
          age_class as "ageClass",
          division,
          bodyweight_kg as "bodyweightKg",
          weight_class_kg as "weightClassKg",
          best3_squat_kg as "best3SquatKg",
          best3_bench_kg as "best3BenchKg",
          best3_deadlift_kg as "best3DeadliftKg",
          total_kg as "totalKg",
          place,
          dots,
          wilks,
          federation,
          date::text,
          meet_name as "meetName",
          meet_town as "meetTown",
          meet_state as "meetState",
          meet_country as "meetCountry",
          tested
        FROM lifts
        WHERE meet_name = $1 AND date = $2
        ORDER BY CASE 
          WHEN place ~ '^[0-9]+$' THEN place::integer 
          ELSE 999 
        END
      `,
        [meetName, date]
      );

      return result.rows;
    },
  },
};
