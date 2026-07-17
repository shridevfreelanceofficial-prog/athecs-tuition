import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

// Parse .env.local to get DATABASE_URL
const envPath = path.resolve(process.cwd(), ".env.local");
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local file not found. Please create it first.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const dbUrlMatch = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
if (!dbUrlMatch) {
  console.error("Error: DATABASE_URL not found in .env.local");
  process.exit(1);
}
const databaseUrl = dbUrlMatch[1];
const sql = neon(databaseUrl);

async function main() {
  console.log("Initializing database tables...");

  try {
    // 1. Create admissions table
    await sql`
      CREATE TABLE IF NOT EXISTS admissions (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        parent_name VARCHAR(255) NOT NULL,
        mobile_number VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        grade VARCHAR(100) NOT NULL,
        school_name VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Admissions table checked/created.");

    // 2. Create contacts table
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Contacts table checked/created.");

    // 3. Create results table
    await sql`
      CREATE TABLE IF NOT EXISTS results (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        batch VARCHAR(50) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Results table checked/created.");

    // 4. Create activities table
    await sql`
      CREATE TABLE IF NOT EXISTS activities (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Activities table checked/created.");

    // 5. Create activity_images table
    await sql`
      CREATE TABLE IF NOT EXISTS activity_images (
        id SERIAL PRIMARY KEY,
        activity_id INT REFERENCES activities(id) ON DELETE CASCADE,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✓ Activity Images table checked/created.");

    // 6. Seed Results if empty
    const resultsCountRes = await sql`SELECT COUNT(*) as count FROM results`;
    const resultsCount = parseInt(resultsCountRes[0].count, 10);
    if (resultsCount === 0) {
      console.log("Seeding results table with default data...");
      const seedResults = [
        {
          title: "MGM School Toppers",
          batch: "23-25",
          category: "School Toppers",
          image_url: "/images/results/mgmschooltoppers_23_25.png"
        },
        {
          title: "School Toppers 23-25",
          batch: "23-25",
          category: "School Toppers",
          image_url: "/images/results/schooltopper_2324_and_-2325.png"
        },
        {
          title: "Subject Toppers 23-24",
          batch: "23-24",
          category: "Subject Toppers",
          image_url: "/images/results/subjecttoppers_23_24.png"
        },
        {
          title: "Subject Toppers 24-25",
          batch: "24-25",
          category: "Subject Toppers",
          image_url: "/images/results/subjecttoppers_24_25.png"
        },
        {
          title: "Toppers Batch 24-25",
          batch: "24-25",
          category: "Overall Toppers",
          image_url: "/images/results/toppers_batch_24_25.png"
        }
      ];

      for (const res of seedResults) {
        await sql`INSERT INTO results (title, batch, category, image_url) VALUES (${res.title}, ${res.batch}, ${res.category}, ${res.image_url})`;
      }
      console.log("✓ Results seeded.");
    } else {
      console.log("Results table already has data, skipping seed.");
    }

    // 7. Seed Activities if empty
    const activitiesCountRes = await sql`SELECT COUNT(*) as count FROM activities`;
    const activitiesCount = parseInt(activitiesCountRes[0].count, 10);
    if (activitiesCount === 0) {
      console.log("Seeding activities table with default data...");
      const seedActivities = [
        {
          title: "Drawing Competition",
          images: [
            "/images/Activities/drawing_competition/d1.png",
            "/images/Activities/drawing_competition/d2.png",
            "/images/Activities/drawing_competition/d3.png"
          ]
        },
        {
          title: "Farewell",
          images: [
            "/images/Activities/Farewell/f1.png",
            "/images/Activities/Farewell/f2.png",
            "/images/Activities/Farewell/f3.png",
            "/images/Activities/Farewell/f4.png"
          ]
        },
        {
          title: "Sports Day",
          images: [
            "/images/Activities/Sports_Day_Celebration_2k23/t1.png",
            "/images/Activities/Sports_Day_Celebration_2k23/t2.png",
            "/images/Activities/Sports_Day_Celebration_2k23/t3.png",
            "/images/Activities/Sports_Day_Celebration_2k23/t4.png",
            "/images/Activities/Sports_Day_Celebration_2k23/t5.png",
            "/images/Activities/Sports_Day_Celebration_2k23/t6.png",
            "/images/Activities/Sports_Day_Celebration_2k23/t7.png",
            "/images/Activities/Sports_Day_Celebration_2k23/t8.png",
            "/images/Activities/Sports_Day_Celebration_2k23/t10.png"
          ]
        },
        {
          title: "Wet N Joy Trip",
          images: [
            "/images/Activities/wetnjoy/w1.png",
            "/images/Activities/wetnjoy/w2.png"
          ]
        }
      ];

      for (const act of seedActivities) {
        // Insert activity
        const insertRes = await sql`INSERT INTO activities (title) VALUES (${act.title}) RETURNING id`;
        const activityId = insertRes[0].id;

        // Insert its images
        for (const imgUrl of act.images) {
          await sql`INSERT INTO activity_images (activity_id, image_url) VALUES (${activityId}, ${imgUrl})`;
        }
      }
      console.log("✓ Activities and images seeded.");
    } else {
      console.log("Activities table already has data, skipping seed.");
    }

    console.log("\nDatabase initialization complete! All set.");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

main();
