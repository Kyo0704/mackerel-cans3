import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {

    const state_Classification = await prisma.classification_state.findMany({
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