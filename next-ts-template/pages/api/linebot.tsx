import { NextApiRequest, NextApiResponse} from "next";
import * as line from "@line/bot-sdk";

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!,
};

const client = new line.Client(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
  const message = req.body.message;
  const id = req.body.id;
  
  try {
      await client.pushMessage(String(id), {
        type: "text",
        text: message,
      });
    
    res.status(200).json({ message: `${message}というメッセージが送信されました。` });
  } catch (e) {
    res.status(500).json({ message: `エラーが発生しました。 ${e}` });
  } 
}
