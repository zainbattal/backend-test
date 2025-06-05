const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
  connectionTimeoutMillis: 5000, // Timeout after 5 seconds
  family: 4,
});

module.exports = pool;
