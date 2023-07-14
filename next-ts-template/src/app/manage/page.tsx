"use client"
import "../globals.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';



interface Discount {
  pid: string;
  sid: string;
  stid: string;
  dprice: number;
  number: number;
  product: Product;
}

interface Product {
  pid: string;
  pname: string;
  expiry_date: string;
  price: number;
  image: string;
  cid: string;
}

interface Classification_state{
  stid: String;
  cid: String;
  classification: Classification;
  state: State;
}

interface Classification{
  cid:    String;
  cname:   String;
}

interface State{
  stid:   String; 
  stname: String;
}

const MyPage: React.FC = () => {
  const [formData, setFormData] = useState<string[]>([]);
  const [discounts, setDiscount] = useState<Discount[]>([]);

  useEffect(() => {
    fetch('/api/discount_product')
      .then((response) => response.json())
      .then((data) => setDiscount(data));
  }, []);

  const getstname = (index: number) => {
    const [classifications, setClassification] = useState<Classification_state[]>([]);
    const cid = discounts[index].product.cid
    useEffect(() => {
      fetch(`/api/state_classification${cid}`)
        .then((response) => response.json())
        .then((data) => setClassification(data));
    }, []);

    return classifications.map((classification) => (
    <option value={String(classification.state.stid)}>{classification.state.stname}</option>
    ));
  };

  const renderRows = () => {
    return discounts.map((discount, index) => (
      <React.Fragment key={index}>
        <tr>
          <td className="border border-gray-300 p-2">{discount.product.pname}</td>
          <td className="border border-gray-300 p-2">
            <img src={`https://sabakan-backet.s3.ap-southeast-2.amazonaws.com/test/${discount.product.image}`}  />
          </td>
          <td className="border border-gray-300 p-2">
            <select
              className="border border-gray-300 rounded-md p-2"
              value={formData[index] || '' as string}
              onChange={(e) => handleSelectChange(e, index)}
            >
              {getstname(index)}
            </select>
          </td>
        </tr>
      </React.Fragment>
    ));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newFormData = [...formData];
    newFormData[index] = e.target.value;
    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/state_update", {
        formData: formData,
        discounts: discounts,
      });
  
      await axios.post("/api/linebot", {
        message: "あなたが登録している店舗で値下げ商品がでました。\nURLをタップして確認してみましょう\nURL",
      });
  
      console.log("リクエストが正常に送信されました");
    } catch (error) {
      console.error("リクエストの送信中にエラーが発生しました", error);
    }
  };

  return (
    <div>
      <div className="w-screen h-screen flex flex-col  items-center">
      <h1  className="mt-4 mb-4 text-4xl">値下げ商品情報送信</h1>
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">商品名</th>
              <th className="border border-gray-300 p-2">商品画像</th>
              <th className="border border-gray-300 p-2">状態</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default MyPage;
