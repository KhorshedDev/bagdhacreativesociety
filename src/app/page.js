"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getMetaData } from "@/lib/userService";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

export default function Home() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getMeta();
  }, []);

  const getMeta = async () => {
    const data = await getMetaData();
    setMeta(data || {});
  };

  const listOfMenu = [
    { link: "/committee", name: "পরিচালক বৃন্দ", key: 0 },
    { link: "/members", name: "সদস্য", key: 1 },
    { link: "/deposite", name: "মোট সঞ্চয় ও বিনিয়োগ", key: 3 },
    { link: "/payment", name: "জমার মাধ্যম", key: 7 },
    { link: "/vision", name: "লক্ষ্য ও উদ্দেশ্য", key: 5 },
    { link: "/rules", name: "নীতিমালা", key: 4 },
    { link: "/notice", name: "নোটিশ", key: 2 },
    { link: "/photos", name: "ছবি ঘর", key: 8 },
    { link: "/contact", name: "যোগাযোগ", key: 6 },
  ];

  if (!meta) {
    return <Loading />;
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto px-4 py-6 w-full">
        <div className="flex flex-col items-center">
          <Link href="/" className="transition-transform hover:scale-105">
            <div className="relative p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
              <Image
                src="/logo.jpg"
                alt="Bagdha Creative Society Logo"
                width={280}
                height={280}
                priority
                className="rounded-xl object-contain"
              />
            </div>
          </Link>

          <div className="w-full my-6 bg-amber-50 dark:bg-slate-800 border-y border-amber-200 dark:border-slate-700 py-2.5 overflow-hidden shadow-inner">
            <div className="w-full whitespace-nowrap">
              <div className="inline-block animate-marquee text-emerald-800 dark:text-emerald-300 font-bold text-sm md:text-base">
                &quot; ইহা একটি সম্পূর্ণ অরাজনৈতিক এবং ব্যক্তি সঞ্চয় ও বিনিয়োগ নির্ভর ক্ষুদ্র সংগঠন &quot;
              </div>
            </div>
          </div>

          <nav className="w-full my-2">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              {listOfMenu.map((item) => (
                <li key={item.key} className="text-center">
                  <Link
                    href={item.link}
                    className="block py-2.5 px-2 text-xs md:text-sm font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-900 dark:hover:text-emerald-200 rounded-xl transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {meta?.pictureUrl && (
            <div className="w-full my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
              <Image
                className="w-full h-auto rounded-xl object-cover"
                alt="Bagdha Creative Society Group Photo"
                src={meta.pictureUrl}
                width={1200}
                height={600}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
