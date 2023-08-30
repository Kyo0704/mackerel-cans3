import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const employees = await prisma.employee.findMany({});
    res.status(200).json(employees);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
  
}  