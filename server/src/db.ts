import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

// Load .env file if it exists
dotenv.config({ path: path.join(__dirname, "../../.env") });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  // Allow the pool to remove broken connections
  allowExitOnIdle: false,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});
