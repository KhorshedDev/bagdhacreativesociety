"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getMetaData } from "@/lib/userService";
import Footer from "@/components/Footer";

export default function Contact() {
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
        <div>
          <h1 className="text-center font-bold pb-2 mb-4">
            আমাদের সাথে যোগাযোগ এর উপায়
          </h1>
          <div className="flex flex-col justify-center items-center p-9 bg-gray-200 rounded">
            <p className="font-bold my-2">{meta.phone}</p>
            <p className="font-bold">{meta.email}</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
