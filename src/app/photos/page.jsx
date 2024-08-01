"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

import Gallery from "@/components/Gallary";
import { fetchImages } from "@/lib/userService";
import Loading from "@/components/Loading";
export default function Contact() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const imagesData = await fetchImages();
      setImages(imagesData);
    };

    loadImages();
  }, []);

  if (!images) {
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
          <h1 className="text-center font-bold pb-2 mb-4 border-b-2">ছবি ঘর</h1>

          <Gallery images={images} isWeb={true} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
