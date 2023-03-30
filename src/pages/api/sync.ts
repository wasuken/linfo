import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function safeFetch(url: string) {
  let status = false;
  try {
    const result = await fetch(url);
    status = result.status === 200;
  } catch (e) {
    console.log(e);
  }
  return status;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // 全サービスの状態を取得。
    const srvs = await client.webService.findMany();
    let total_status = true;
    let failed_list = [];
    for (let i = 0; i < srvs.length; i++) {
      let srv = srvs[i];
      const status = await safeFetch(srv?.url);
      await client.webServiceStatus.create({
        data: {
          webServiceId: srv?.id,
          status,
        },
      });
      total_status = total_status && status;
      if (!status) failed_list.push(srv?.name);
    }
    if (total_status) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(400).json({ msg: "failed", failed_list });
    }
    return;
  }
}
