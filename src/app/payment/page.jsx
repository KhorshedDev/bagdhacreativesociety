"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { getMetaData } from "@/lib/userService";
import { useEffect, useState } from "react";

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
            সবাই নিন্মোক্ত মাধ্যমে আমাদের সোসাইটির সঞ্চয় নির্দিষ্ট সময়ের মধ্যে
            জমা প্রদান করার জন্য আহবান জানাচ্ছি.....
          </h1>
          <p className="text-lg font-bold">বিকাশ পার্সোনাল</p>
          <p>{meta.bkash}</p>
          <p className="text-log font-bold">নগদ পার্সোনাল </p>
          <p>{meta.nagad}</p>
          <p>
            বিকাশ বা নগদ মাধ্যমে টাকা পাঠালে অবশ্যই ক্যাশ আউট খরচসহ পাঠাতে হবে।
          </p>
          <p className="text-lg font-bold">আর ব্যাংকে পাঠালে</p>
          <p>A/C Name- {meta.acName}</p>
          <p>A/C # {meta.ac}</p>
          <p>{meta.bank}</p>
          <p>{meta.add}</p>
          <p>Routing# {meta.routing}</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
