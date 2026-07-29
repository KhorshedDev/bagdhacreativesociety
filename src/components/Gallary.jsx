"use client";
import Image from "next/image";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' /%3E%3C/svg%3E";

const Gallery = ({ images = [], isWeb, onDelete }) => {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No images found in gallery.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 shadow-sm"
        >
          <Image
            src={img.url || PLACEHOLDER_IMAGE}
            alt={img.name || "Gallery image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!isWeb && onDelete && (
            <button
              onClick={() => onDelete(img)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;

