// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const DIRNAME = __dirname + "/../../../../db/users.json";
    const JSON_FILE = JSON.parse(fs.readFileSync(DIRNAME, "utf8"));
    res.status(200).json(
      JSON_FILE.map((e: any) => {
        return { user: e.user };
      })
    );
  }
}
