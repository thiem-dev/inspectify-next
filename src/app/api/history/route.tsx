// import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
// import History from "../../../../typeDefs/types";

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

// dynamic route handler
// export async function GET(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   const data = await pool.query(
//     `SELECT * FROM history
//       ORDER BY created_at DESC
//       LIMIT 20;
//       `
//   );
//   if (data.rows.length === 0) {
//     return res.status(400).json({ message: `No rows found in history table` });
//   }

//   // return res.json({ message: data.rows });
//   return res.json({ message: data.rows });
// }

// GET route handler
app.get("/api/history", async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await pool.query(
      `SELECT * FROM history 
      ORDER BY created_at DESC
      LIMIT 20;
      `
    );

    if (data.rows.length === 0) {
      return res
        .status(400)
        .json({ message: `No rows found in history table` });
    }

    return res.json({ message: data.rows });
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  app(req, res);
};
