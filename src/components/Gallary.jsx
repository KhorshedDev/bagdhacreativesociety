"use client";
import SafeImage from "@/components/SafeImage";

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
          <SafeImage
            src={img.url}
            alt={img.name || "Gallery image"}
            fill
            fallbackType="photo"
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

