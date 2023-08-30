"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "../globals.css";

interface Employee {
    eid:         String  
    ename:      String  
    sid:         String
    jid:         String
    pass:        String 
  }

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [employees, setEmployee] = useState<Employee[]>([]);
  const [errorText, setErrorText] = useState(''); // エラーメッセージのステート

  const router = useRouter(); // useRouterを初期化

  useEffect(() => {
    fetch('/api/employee')
      .then((response) => response.json())
      .then((data) => {
        setEmployee(data);
      })
      .catch((error) => {
        // エラーハンドリング
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleLogin = () => {
    // ログインのロジックをここに追加する
    const loggedInUser = employees.find((employee) => employee.eid === username && employee.pass === password);

    if (loggedInUser) {
        router.push('/manage'); // ログイン成功時に指定のパスに遷移
    } else {
        setErrorText('IDまたはPasswordが間違っています'); // エラーメッセージを設定
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-md max-w-[70%]" >
        <div className="flex justify-center"> {/* 中央揃え */}
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">ID:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500 mb-2">{errorText}</p>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default LoginPage;
