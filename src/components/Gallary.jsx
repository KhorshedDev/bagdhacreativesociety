// components/Gallery.js
import Image from "next/image";

const Gallery = ({ images, isWeb, onDelete }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 group"
        >
          <Image
            src={img.url}
            alt={img.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          {!isWeb && (
            <button
              onClick={() => onDelete(img)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100"
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
