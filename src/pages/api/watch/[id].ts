import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const srv = await client.webService.findFirst({
      where: {
        id,
      },
    });
    const result = await fetch(srv?.url);
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
