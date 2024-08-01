"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchImages, deleteImage } from "@/lib/userService";
import ImageUpload from "@/components/ImageUpload";
import ProtectedRoute from "@/components/ProtectedRoute";
import Gallery from "@/components/Gallary";
export default function Members() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const imagesData = await fetchImages();
      setImages(imagesData);
    };

    loadImages();
  }, []);

  const handleUpload = (newImage) => {
    setImages([...images, newImage]);
  };

  const handleDelete = async (image) => {
    await deleteImage(image);
    setImages(images.filter((img) => img.id !== image.id));
  };

  if (!images) {
    return <p className="text-center py-6">Loading....</p>;
  }

  return (
    <ProtectedRoute>
      <main className="min-h-svh bg-white">
        <div className="w-5/6 mx-auto">
          <nav className="py-4">
            <Link className="text-blue-400" href="/admin/home">
              Back to Home
            </Link>
          </nav>
          <h1 className="text-center text-3xl font-bold my-8">
            Upload and Manage Gallery
          </h1>
          <ImageUpload onUpload={handleUpload} />
          <Gallery images={images} onDelete={handleDelete} isWeb={false} />
        </div>
      </main>
    </ProtectedRoute>
  );
}
