// https://blog.stackademic.com/a-guide-to-build-an-api-server-with-nextjs-14-and-mongoose-e01f0e10a68a

import { NextRequest, NextResponse } from 'next/server';

type Error = {
  message: string;
};

// @ts-ignore
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DB_STRING,
});

//GET one by Id
export const GET = async (_: NextRequest, { params }) => {
  const id = params.id;

  try {
    const result = await pool.query(
      `SELECT * FROM history
    WHERE id=$1`,
      [id]
    );

    if (result.rows.length === 0) {
      return new Response(`Error could not find item id:${id}`, {
        status: 400,
      });
    }
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    return new Response(`Error Message: ${error.message}`, { status: 400 });
  }
};

//DELETE one by id
export const DELETE = async (_: NextRequest, { params }) => {
  const id = params.id;

  try {
    const result = await pool.query(
      `DELETE FROM history WHERE id=$1
      RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return new Response(`Error could not delete from id:${id}`, {
        status: 400,
      });
    }
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    return new Response(`Error Message: ${error.message}`, { status: 400 });
  }
};
