"use client"
import React from 'react';
import Link from 'next/link';
import "../globals.css";

const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">送信完了!</h1>
        <Link href="/login" passHref>
          <div className="text-blue-500 hover:underline mt-4 inline-block">ログアウト</div>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
