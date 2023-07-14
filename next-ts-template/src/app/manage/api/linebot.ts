import { NextApiRequest, NextApiResponse} from "next";
import {useState, useEffect} from "react"
import * as line from "@line/bot-sdk";

interface RegisteredStore{
  uid:    String;
  sid:   String;
}

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!,
};

const client = new line.Client(config);

const [users, setUser] = useState<RegisteredStore[]>([]);

useEffect(() => {
  fetch('/api/discount_product')
    .then((response) => response.json())
    .then((data) => setUser(data));
}, []);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
  const message = req.body.message;
  
  try {
    await Promise.all(users.map(async (user) => {
      await client.pushMessage(String(user.uid), {
        type: "text",
        text: message,
      });
    }));
    
    res.status(200).json({ message: `${message}というメッセージが送信されました。` });
  } catch (e) {
    res.status(500).json({ message: `エラーが発生しました。 ${e}` });
  } 
}
