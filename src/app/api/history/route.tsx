// https://blog.stackademic.com/a-guide-to-build-an-api-server-with-nextjs-14-and-mongoose-e01f0e10a68a

import { NextRequest, NextResponse } from 'next/server';
import { HistoryInsert } from '../../../../typeDefs/types';

// @ts-ignore
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DB_STRING,
});

// GET ALL
export const GET = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM history
            ORDER BY created_at DESC
            LIMIT 20;
            `
    );
    if (result.rows.length === 0) {
      return new Response(`Error Message: No rows found in history table`, {
        status: 400,
      });
    }
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return new Response(`Error Message: ${error.message}`, { status: 400 });
  }
};

// insert one
export const POST = async (req: NextRequest) => {
  const body: HistoryInsert = await req.json();
  const { image_url, caption, class_categories } = body;
  try {
    const result = await pool.query(
      `INSERT INTO history (image_url, caption, class_categories) VALUES ($1, $2, $3) RETURNING *;`,
      [image_url, caption, JSON.stringify(class_categories)]
    );
    if (result.rows.length === 0) {
      return new Response(`Error could not insert into history`, {
        status: 400,
      });
    }
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return new Response(`Error Message: ${error.message}`, { status: 400 });
  }
};
