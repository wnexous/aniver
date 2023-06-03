// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data = req.body.data || { name: "andre" };
    const createHash = crypto.randomUUID();

    const DIRNAME = __dirname + "/../../../../db/users.json";
    const JSON_FILE = JSON.parse(fs.readFileSync(DIRNAME, "utf8"));

    JSON_FILE.push({
      user: data.name,
      hash: createHash,
    });

    fs.writeFileSync(DIRNAME, JSON.stringify(JSON_FILE));
    res.status(200).json({ hash: createHash });
  }
}
