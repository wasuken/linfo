import { NextApiRequest, NextApiResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    const list = await client.webService.findMany({
      include: {
        statusList: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1,
        },
      },
    })
    res.status(200).json(list);
    return;
  }else if(req.method === 'POST'){
    const {
      name, description, url
    } = req.body;
    await client.webService.create({
      data: {
        name,
        description,
        url,
      }
    })
    res.status(200).json({ msg: 'success'});
    return;
  }
}
