"use client";
import { useState } from "react";
import { uploadImage } from "@/lib/userService";

const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e) => {
    setErrorMsg("");
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setErrorMsg("");
    try {
      const newImage = await uploadImage(file);
      if (onUpload) {
        onUpload(newImage);
      }
      setFile(null);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || "Failed to upload image. Please check your Supabase configuration.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="my-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm max-w-md">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-950 dark:file:text-indigo-300"
      />
      {errorMsg && (
        <p className="text-red-500 text-xs mt-2 font-medium">{errorMsg}</p>
      )}
      <button
        onClick={handleUpload}
        className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-md transition-colors text-sm"
        disabled={uploading || !file}
      >
        {uploading ? "Uploading to Supabase..." : "Upload Image"}
      </button>
    </div>
  );
};

export default ImageUpload;

