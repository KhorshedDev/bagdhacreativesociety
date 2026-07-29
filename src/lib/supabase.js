import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

export const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "images";

/**
 * Uploads a file to Supabase Storage and returns its public URL.
 * @param {File} file - File object to upload
 * @param {string} folder - Folder name in the bucket (e.g. 'userPictures', 'gallery')
 * @returns {Promise<string>} Public URL of the uploaded image
 */
export const uploadToSupabase = async (file, folder = "general") => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase URL or Anon Key is missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables."
    );
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Supabase upload error:", error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

/**
 * Deletes a file from Supabase Storage by its public URL or path.
 * @param {string} urlOrPath - Full public URL or relative file path in storage
 */
export const deleteFromSupabase = async (urlOrPath) => {
  if (!urlOrPath) return;

  try {
    let filePath = urlOrPath;
    if (urlOrPath.includes(`/storage/v1/object/public/${BUCKET_NAME}/`)) {
      filePath = urlOrPath.split(`/storage/v1/object/public/${BUCKET_NAME}/`)[1];
    }

    const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);
    if (error) {
      console.warn("Could not delete file from Supabase Storage:", error);
    }
  } catch (err) {
    console.warn("Failed to delete file from Supabase:", err);
  }
};
