import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function discountUpdateHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body.formData;
    const discounts = req.body.discounts;
    for (let i = 0; i < formData.length; i++) {
      const newState = formData[i];
      const discount = discounts[i];

      await prisma.discount.update({
        where: { pid_sid: { pid: discount.pid, sid: discount.sid } },
        data: {
          stid: newState,
        },
      });
    }

    console.log('行が正常に更新されました');
    res.status(200).json({ message: '行が正常に更新されました' });
  } catch (error) {
    console.error('行の更新中にエラーが発生しました:', error);
    res.status(500).json({ message: '行の更新中にエラーが発生しました' });
  }
}
