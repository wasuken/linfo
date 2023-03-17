import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // 全サービスの状態を取得。
    const srvs = await client.webService.findMany();
    srvs.forEach(async (srv) => {
      const result = await fetch(srv?.url);
      const status = result.status === 200;
      await client.webServiceStatus.create({
        data: {
          webServiceId: srv?.id,
          status: status,
        },
      });
    });
    res.status(200).json({ msg: "success" });
  }
}
