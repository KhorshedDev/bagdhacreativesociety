// components/ImageUpload.js
import { useState } from "react";
import { uploadImage } from "@/lib/userService";

const ImageUpload = ({ onUpload, onDelete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const newImage = await uploadImage(file);
      onUpload(newImage);
      setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="my-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        disabled={uploading || !file}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUpload;
