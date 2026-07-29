/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: [
      "firebasestorage.googleapis.com",
      "supabase.co",
      "*.supabase.co",
      "ijzzxjeukrediybojaxi.supabase.co",
    ],
  },
};

module.exports = nextConfig;


