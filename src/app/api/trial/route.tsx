import { NextRequest, NextResponse } from "next/server";

// @ts-ignore
import express from "express";
// @ts-ignore
import cors from "cors";
// @ts-ignore
import pg from "pg";

const { Pool } = pg;
const app = express();

// cors error fix
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DB_STRING,
});

const GET = async () => {
  const data = await pool.query(
    `SELECT * FROM history
          ORDER BY created_at DESC
          LIMIT 20;
          `
  );
  return NextResponse.json(data.rows);
};

export { GET };
