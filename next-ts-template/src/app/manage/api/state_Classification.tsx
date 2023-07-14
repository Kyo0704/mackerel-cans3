import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const cid = req.query.cid as string; // cidを取得

    const state_Classification = await prisma.classification_state.findMany({
      where: {
        cid: cid, // 取得したcidを使用してクエリを組み立てる
      },
      include: {
        state: true,
        Classification: true,
      },
    });
    res.status(200).json(state_Classification);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}