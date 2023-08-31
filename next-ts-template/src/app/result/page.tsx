"use client"
import "../globals.css"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Discount {
  pid:         String  
  sid :        String  
  dprice:      number
  quantity:    number
  stid:        String 
  product: Product
  state: State;
}

interface Product {
  pid: string;
  pname: string;
  price: number;
  image: string;
  cid: string;
  expiry_date: string;
}

interface State{
  stid:   String; 
  stname: String;
}

interface RegisteredStore{
  uid:    String;
  sid:   String;
  store: Store;
}

interface Store{
    sid: String;
    sname: String;
}

const MyPage: React.FC = () => {
    const router = useRouter();
    const [discounts, setDiscount] = useState<Discount[]>([]);
    const [users, setUser] = useState<RegisteredStore[]>([]);

    useEffect(() => {
        fetch('/api/discount_product')
        .then((response) => response.json())
        .then((data) => {
            setDiscount(data);
        })
        .catch((error) => {
            // エラーハンドリング
            console.error('Error fetching data:', error);
        });
    }, []);

    useEffect(() => {
        fetch('api/get_id')
        .then((response) => response.json())
        .then((data) => {
            setUser(data);
        })
        .catch((error) => {
            // エラーハンドリング
            console.error('Error fetching data:', error);
        });
    }, []);
    
    const renderRows = () => {
        return discounts.map((discount, index) => (
        <React.Fragment key={index}>
            <tr>
            <td className="border border-gray-300 p-2 text-center">{discount.product.pname}</td>
            <td className="border border-gray-300 p-2">
                <img src={`https://sabakan-backet.s3.ap-southeast-2.amazonaws.com/test/${discount.product.image}`} width={200} height={150} />
            </td>
            <td className="border border-gray-300 p-2 text-center">{discount.state.stname}</td>
            <td className="border border-gray-300 p-2 text-center">{discount.dprice}円</td>
            <td className="border border-gray-300 p-2 text-center">{discount.quantity}</td>
            </tr>

        </React.Fragment>
        ));
    };

    const handleSecondButtonClick = () => {
        router.push('/manage');
    };


    const handleSubmit = async () => {
        try {
        users.map((user) => (
            axios.post("api/linebot", {
            message: `${user.store.sname}で値下げ商品がでました。\nURLをタップして確認してみましょう。`,
            id: user.uid,
            }),
            axios.post("api/linebot", {
                message: `https://alatoku.link/product/`,
                id: user.uid,
            })
        ));
        console.log("リクエストが正常に送信されました");
        router.push('/finished');
        } catch (error) {
        console.error("リクエストの送信中にエラーが発生しました", error);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col  items-center">
        <h1  className="mt-4 mb-4 text-4xl">更新完了</h1>
            <table className="w-full border-collapse table-auto max-w-[80%]" >
            <thead>
                <tr>
                <th className="border border-gray-300 p-2 w-1/5">商品名</th>
                <th className="border border-gray-300 p-2 w-1/5">商品画像</th>
                <th className="border border-gray-300 p-2 w-1/5">状態</th>
                <th className="border border-gray-300 p-2 w-1/5">値段</th>
                <th className="border border-gray-300 p-2 w-1/5">数量</th>
                </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
            </table>
            <p className="text-3xl">上記の内容で送信してもよろしいですか？</p>
            <div className="flex mt-4">
            <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-16 rounded"
            onClick={handleSecondButtonClick}
            >
            修正
            </button>
            <button
            className="ml-28 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded"
            onClick={handleSubmit}
            >
            送信
            </button>
            </div>
        </div>
    );
    };

    export default MyPage;
