"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Gallery from "@/components/Gallary";
import { fetchImages } from "@/lib/userService";
import Loading from "@/components/Loading";

export default function PublicPhotos() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      const imagesData = await fetchImages();
      setImages(imagesData || []);
    };

    loadImages();
  }, []);

  if (!images) {
    return <Loading />;
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 flex flex-col justify-between pt-4 pb-0">
      <div className="max-w-5xl mx-auto px-4 w-full">
        <nav className="mb-6">
          <Link
            className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
            href="/"
          >
            ← প্রধান পাতায় ফিরে যান
          </Link>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
            ছবি ঘর
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            বাগধা ক্রিয়েটিভ সোসাইটির বিভিন্ন কার্যক্রম ও স্মৃতির অ্যালবাম
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <Gallery images={images} isWeb={true} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
