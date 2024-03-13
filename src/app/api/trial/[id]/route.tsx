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

export const DELETE = async (req: NextRequest, { params }) => {
  const id = params.id;

  try {
    const result = await pool.query(
      `DELETE FROM history WHERE id=$1
      RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return new Response(`Error could not insert into history`, {
        status: 400,
      });
    }
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    return new Response(`Error Message: ${error.message}`, { status: 400 });
  }
};
