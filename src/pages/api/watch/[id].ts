import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    res.status(400).json({ msg: "error" });
    return;
  }
  if (req.method === "GET") {
    const srv = await client.webService.findFirst({
      where: {
        id,
      },
    });
    const url = srv?.url;
    if (!url) {
      res.status(400).json({ msg: "none url" });
      return;
    }
    const result = await fetch(url);
    const status = result.status === 200;
    await client.webServiceStatus.create({
      data: {
        webServiceId: id,
        status: status,
      },
    });
    res.status(200).json({ status });
  }
}
