// pages/admin.js
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Admin = () => {
  const user = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErr(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {
      console.error("Error logging in:", error);
      setLoading(false);
      setErr(true);
      setPassword("");
    }
  };

  if (user) {
    router.push("/admin/home"); // Redirect to the admin home page if logged in
    return null;
  }

  return (
    <main className="bg-white min-h-svh flex justify-center items-center">
      <div className="bg-gray-200 p-8 flex flex-col justify-center items-center rounded">
        <h3 className="font-bold text-center my-4">Login to admin panel</h3>
        <input
          className="w-96 my-1 border-0 outline-none py-2 px-3 max-sm:w-52 text-sm"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(text) => setEmail(text.target.value)}
        />
        <input
          className="w-96 my-1 py-2 px-3 border-0 outline-none max-sm:w-52 text-sm"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(pass) => setPassword(pass.target.value)}
        />
        <button
          className="rounded-lg bg-blue-400 block py-2 px-8 my-5 text-sm text-white"
          type="submit"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "loading.." : "Submit"}
        </button>
        {err && <p className=" text-red-600">there is some error</p>}
        <button className="text-sm text-black">forget password?</button>
      </div>
    </main>
  );
};

export default Admin;
