// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import { Pool, Client } from "pg";

const pool = new Client({
  connectionString:
  process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool
  .connect()
  .then((ctt) => {
    console.log("CONECTADO COM SUCESSO");
  })
  .catch((err) => {
    console.log("ERRO AO SE CONECTAR", err);
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data = req.body.data || { name: "nome inváçido" };
    const createHash = crypto.randomUUID();

    data.name = data.name.replace(/[^a-zA-ZÀ-ÿ\s]/g, "").substring(0, 64);

    await pool
      .query(
        `insert into usuarios (username, userid) values ('${data.name}', '${createHash}')`
      )
      .then((msg) => {
        console.log(msg);
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json({ hash: createHash });
  }

  if (req.method == "GET") {
    const result = await pool.query("select * from usuarios;");

    res.json(
      result.rows.map((filt) => {
        delete filt["userid"];
        return filt;
      })
    );
  }
}
