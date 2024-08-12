"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getMetaData, getInvest } from "@/lib/userService";
import Loading from "@/components/Loading";
import InvestCard from "@/components/InvestCard";
export default function Deposite() {
  const [meta, setMeta] = useState(null);
  const [invest, setInvest] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const d = await getMetaData();
    const i = await getInvest();
    setMeta(d);
    setInvest(i);
  };
  if (!meta) {
    return <Loading />;
  }
  return (
    <main className="bg-white min-h-svh">
      <div className="w-5/6 mx-auto">
        <nav className="py-4">
          <Link className="text-blue-400" href="/">
            হোম এ ফিরে যান
          </Link>
        </nav>
        <h1 className="font-bold text-2xl text-center py-4 bg-gray-100 mb-10">
          মোট জমা
        </h1>
        <div className="flex flex-col justity-center items-center w-full">
          <h1 className="font-bold text-5xl max-sm:text-3xl">
            {meta.totalAll}
          </h1>
          <p className="mt-2 font-bold">আমাদের লক্ষ্য : {meta.target} tk</p>
        </div>
        <h1 className="font-bold text-2xl text-center py-4 bg-gray-100 mb-4 mt-10">
          বিনিয়োগ
        </h1>
        <div>
          {invest?.map((item) => {
            return <InvestCard key={item.id} isWeb={true} investData={item} />;
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}
