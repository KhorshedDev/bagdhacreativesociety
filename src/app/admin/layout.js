"use client";

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
