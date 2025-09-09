import { neon } from "@neondatabase/serverless";
// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.log("dotenv loaded PORT:", process.env.PORT);
  console.log("dotenv loaded DATABASE_URL:", process.env.DATABASE_URL);

  throw new Error("❌ DATABASE_URL is not defined. Did you set it in your .env file?");
}

const sql = neon(process.env.DATABASE_URL);

export default sql;
