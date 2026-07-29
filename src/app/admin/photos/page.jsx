"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchImages, deleteImage } from "@/lib/userService";
import ImageUpload from "@/components/ImageUpload";
import ProtectedRoute from "@/components/ProtectedRoute";
import Gallery from "@/components/Gallary";

export default function AdminPhotos() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const imagesData = await fetchImages();
      setImages(imagesData || []);
      setLoading(false);
    };

    loadImages();
  }, []);

  const handleUpload = (newImage) => {
    setImages((prev) => [newImage, ...prev]);
  };

  const handleDelete = async (image) => {
    if (confirm("Are you sure you want to delete this gallery image?")) {
      await deleteImage(image);
      setImages((prev) => prev.filter((img) => img.id !== image.id));
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="mb-6">
            <Link
              className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
              href="/admin/home"
            >
              ← Back to Admin Dashboard
            </Link>
          </nav>

          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
              <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
                Upload & Manage Gallery
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Upload new photos to the society image gallery via Supabase Storage.
              </p>
            </div>

            <ImageUpload onUpload={handleUpload} />

            <div className="mt-8">
              <h2 className="font-bold text-base text-slate-900 dark:text-white mb-3">
                Gallery Photos ({images.length})
              </h2>
              {loading ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  Loading gallery images...
                </div>
              ) : (
                <Gallery images={images} onDelete={handleDelete} isWeb={false} />
              )}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
