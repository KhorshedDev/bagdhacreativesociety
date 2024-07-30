"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getMetaData } from "@/lib/userService";
export default function Deposite() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const d = await getMetaData();
    setMeta(d);
  };
  if (!meta) {
    return <p className="text-center font-bold text-lg">Loading...</p>;
  }
  return (
    <main className="bg-white min-h-svh">
      <div className="w-5/6 mx-auto">
        <nav className="py-4">
          <Link className="text-blue-400" href="/">
            হোম এ ফিরে যান
          </Link>
        </nav>
        <div className="flex flex-col justity-center items-center w-full pt-48 max-sm:pt-28">
          <h1 className="font-bold text-5xl max-sm:text-3xl">
            {meta.totalAll}
          </h1>
          <p className="mt-2 font-bold">আমাদের লক্ষ্য : {meta.target} tk</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
