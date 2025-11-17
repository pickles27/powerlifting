import { pool } from "../db";

async function setupDatabase() {
  console.log("Setting up database...");

  try {
    // Create the lifts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lifts (
        id SERIAL PRIMARY KEY,
        source_hash VARCHAR(64) UNIQUE NOT NULL,
        
        -- Lifter information
        name VARCHAR(255) NOT NULL,
        sex VARCHAR(10),
        age NUMERIC(5,2),
        age_class VARCHAR(50),
        birth_year_class VARCHAR(50),
        bodyweight_kg NUMERIC(6,2),
        weight_class_kg VARCHAR(50),
        
        -- Competition information
        event VARCHAR(10),
        equipment VARCHAR(50),
        division VARCHAR(100),
        federation VARCHAR(100),
        parent_federation VARCHAR(100),
        tested VARCHAR(10),
        
        -- Squat attempts
        squat1_kg NUMERIC(6,2),
        squat2_kg NUMERIC(6,2),
        squat3_kg NUMERIC(6,2),
        squat4_kg NUMERIC(6,2),
        best3_squat_kg NUMERIC(6,2),
        
        -- Bench press attempts
        bench1_kg NUMERIC(6,2),
        bench2_kg NUMERIC(6,2),
        bench3_kg NUMERIC(6,2),
        bench4_kg NUMERIC(6,2),
        best3_bench_kg NUMERIC(6,2),
        
        -- Deadlift attempts
        deadlift1_kg NUMERIC(6,2),
        deadlift2_kg NUMERIC(6,2),
        deadlift3_kg NUMERIC(6,2),
        deadlift4_kg NUMERIC(6,2),
        best3_deadlift_kg NUMERIC(6,2),
        
        -- Results
        total_kg NUMERIC(7,2),
        place VARCHAR(20),
        
        -- Scoring systems
        dots NUMERIC(7,4),
        wilks NUMERIC(7,4),
        glossbrenner NUMERIC(7,4),
        goodlift NUMERIC(7,4),
        
        -- Meet information
        date DATE,
        meet_name VARCHAR(255),
        meet_town VARCHAR(255),
        meet_state VARCHAR(100),
        meet_country VARCHAR(100),
        country VARCHAR(100),
        state VARCHAR(100),
        sanctioned VARCHAR(10),
        
        -- Metadata
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("✓ Created lifts table");

    // Create indexes
    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_lifts_name ON lifts(name)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_sex ON lifts(sex)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_equipment ON lifts(equipment)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_weight_class ON lifts(weight_class_kg)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_event ON lifts(event)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_federation ON lifts(federation)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_date ON lifts(date)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_dots ON lifts(dots DESC)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_wilks ON lifts(wilks DESC)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_total ON lifts(total_kg DESC)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_meet_name_date ON lifts(meet_name, date)",
      "CREATE INDEX IF NOT EXISTS idx_lifts_leaderboard ON lifts(sex, equipment, weight_class_kg, event) WHERE total_kg IS NOT NULL",
    ];

    for (const indexQuery of indexes) {
      await pool.query(indexQuery);
    }

    console.log("✓ Created indexes");
    console.log("✅ Database setup complete!");
  } catch (error) {
    console.error("Error setting up database:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

setupDatabase().catch(console.error);
