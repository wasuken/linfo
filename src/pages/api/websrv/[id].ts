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
    res.status(200).json(srv);
  } else if (req.method === "PUT") {
    const { name, url, description } = req.body;
    let srv = await client.webService.findFirst({
      where: {
        id,
      },
    });
    if (srv && name && url && description) {
      if (name) srv.name = name;
      if (url) srv.url = url;
      if (description) srv.description = description;
      await client.webService.update({
        where: {
          id,
        },
        data: srv,
      });
    }
    res.status(200).json({ msg: "success" });
  }
}
