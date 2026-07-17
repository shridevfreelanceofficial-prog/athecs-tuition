import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

const envPath = path.resolve(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const dbUrlMatch = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
const databaseUrl = dbUrlMatch[1];

const sql = neon(databaseUrl);

sql("SELECT 1")
  .then(res => console.log("Success:", res))
  .catch(err => {
    console.error("FAILED STACK:\n", err.stack);
    console.error("FAILED MESSAGE:\n", err.message);
  });
