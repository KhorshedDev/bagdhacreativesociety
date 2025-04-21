"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getMetaData, getInvest } from "@/lib/userService";
import Loading from "@/components/Loading";
import InvestCard from "@/components/InvestCard";
import HiddenNotice from "@/components/HiddenNotice";
export default function Deposite() {
  const [meta, setMeta] = useState(null);
  const [invest, setInvest] = useState(null);
  const [rightPass, setRightPass] = useState(false);
  const [binoyog, setBiniyog] = useState(0)
  const [profit, setProfit] = useState(0)
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const d = await getMetaData();
    const i = await getInvest();
    setMeta(d);
    setInvest(i);
  };
  useEffect(() => {
    if (invest) {
      const totalAmount = invest.reduce((acc, item) => acc + Number(item.amount), 0);
      setBiniyog(totalAmount);
      const totalProfit = invest.reduce((acc, item) => acc + Number(item.profit), 0);
      setProfit(totalProfit)
    }
  }, [invest])
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
        {rightPass ? (
          <div>
            <h1 className="font-bold text-2xl text-center py-4 bg-gray-100 mb-10">
              মোট সঞ্চয় ও বিনিয়োগ
            </h1>
            <div className="flex flex-col justity-center items-center w-full">
              <h3 className="font-bold text-5xl max-sm:text-3xl mb-3">
                মোট সঞ্চয় =  {meta.totalAll}
              </h3>

              <h3 className="font-bold text-5xl max-sm:text-3xl mb-3">
                মোট বিনিয়োগ =  {binoyog}
              </h3>
              <h3 className="font-bold text-5xl max-sm:text-3xl mb-3">
                মোট ব্যালেন্স =  {meta.totalAll - binoyog}
              </h3>
              <h3 className="font-bold text-5xl max-sm:text-3xl mb-3">
                মোট লাভ=  {profit}
              </h3>
              <p>লাভসহ ব্যালেন্স = {meta.totalAll + profit - binoyog}</p>
            </div>
            <h1 className="font-bold text-2xl text-center py-4 bg-gray-100 mb-4 mt-10">
              বিনিয়োগ
            </h1>
            <div>
              {invest?.map((item) => {
                return (
                  <InvestCard key={item.id} isWeb={true} investData={item} />
                );
              })}
            </div>
          </div>
        ) : (
          <HiddenNotice func={setRightPass} />
        )}
      </div>

      <Footer />
    </main>
  );
}
