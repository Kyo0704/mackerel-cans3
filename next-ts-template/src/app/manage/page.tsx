"use client"
import "../globals.css"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parseCookies, setCookie, destroyCookie } from 'nookies'


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
  const router = useRouter();
  const [formData, setFormData] = useState<string[]>([]);
  const [discounts, setDiscount] = useState<Discount[]>([]);
  const [classifications, setClassifications] = useState<Classification_state[]>([]); 

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
    fetch('api/state_Classification')
      .then((response) => response.json())
      .then((data) => {
        setClassifications(data);
      })
      .catch((error) => {
        // エラーハンドリング
        console.error('Error fetching data:', error);
      });
  }, []);

  const getstname = (index: number) => {
    const cid = discounts[index].product.cid;

    return classifications
      .filter((classification) => classification.cid === cid)
      .map((classification) => (
        <option key={classification.stid.toString()} value={String(classification.stid)}>
          {classification.state.stname}
        </option>
    ));
  };
  
  const renderRows = () => {
    return discounts.map((discount, index) => (
      <React.Fragment key={index}>
        <tr>
          <td className="border border-gray-300 p-2 text-center">{discount.product.pname}</td>
          <td className="border border-gray-300 p-2">
            <img src={`https://sabakan-backet.s3.ap-southeast-2.amazonaws.com/test/${discount.product.image}`} alt="写真" title="商品写真" 
            width={200} height={150} />
          </td>
          <td className="border border-gray-300 p-2 text-center">
            <select aria-label="状態選択"
              className="border border-gray-300 rounded-md p-2"
              value={formData[index] || '' as string}
              onChange={(e) => handleSelectChange(e, index)}
            >
               <option value={String(discount.stid)} hidden>{discount.state.stname}</option>
              {getstname(index)}
            </select>
          </td>
          <td className="border border-gray-300 p-2 text-center">{discount.dprice}円</td>
          <td className="border border-gray-300 p-2 text-center">{discount.quantity}</td>
        </tr>

      </React.Fragment>
    ));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newFormData = [...formData];
    newFormData[index] = e.target.value;
    setFormData(newFormData);
  };

  const handleSecondButtonClick = () => {
  try {
        axios.post("api/state_update", {
          formData: formData,
          discounts: discounts,
        });
      } catch (error) {
        console.error("リクエストの送信中にエラーが発生しました", error);
      }
      router.push('/result');
  }


  return (
    <div className="w-screen h-screen flex flex-col  items-center">
      <h1  className="mt-4 mb-4 font-semibold text-4xl">値下げ商品情報送信</h1>
      <h2  className="mt-4 mb-4 font-semibold text-2xl">商品の状態を選択してください</h2>

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
        <button
          className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-16 rounded"
          onClick={handleSecondButtonClick}
        >
          更新
        </button>
      </div>
      
  );
};

export default MyPage;
