"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { getVisions } from "@/lib/userService";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Contact() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const d = await getVisions();
    setMeta(d);
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
        <div>
          <h1 className="text-center font-bold pb-2 mb-4 border-b-2">
            উদ্দেশ্য ও লক্ষ্য-ঃ
          </h1>
          <div>
            {meta.map((i) => (
              <p className="my-4 p-3 bg-gray-200 rounded" key={i.id}>
                {i.vision}
              </p>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
