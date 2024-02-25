import { NextResponse } from "next/server";

//@ts-ignore
import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;
const app = express();

// cors error fix
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DB_STRING,
});

//  ------------------------------------------------------------ MIDDLEWARE

app.use(cors());
app.use(express.json());

// const DATA_SOURCE_URL

export async function GET(request: Request) {
  const res = await pool.query(
    `SELECT * FROM history 
      ORDER BY created_at DESC;`
  );
  if (res.rows.length === 0) {
    return res.status(400).send(`No rows found in history table`);
  }

  // const history: History[] = await res.json();

  return NextResponse.json(res.rows);
}
