"use client";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { signOut } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/");
  };
  return (
    <ProtectedRoute>
      <main className="min-h-svh bg-white">
        <h2 className="text-center font-bold text-2xl py-5">Welcome admin</h2>
        <div className="flex flex-col justify-center items-center">
          <Link className="bg-blue-400 p-3 text-white my-3" href="/">
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="py-2 px-3 bg-gray-300 my-3 rounded text-white"
          >
            Log Out
          </button>
        </div>
        <div className="flex justify-center items-center flex-wrap">
          <Link href="add-deposite">
            <div className="rounded w-60 max-sm:w-32 h-60 max-sm:h-32 m-4 bg-gray-200 flex justify-center items-center text-blue-400">
              <p className="font-medium max-sm:font-normal max-sm:text-sm">
                + Add Deposite
              </p>
            </div>
          </Link>
          {user?.email !== "m.kibria17@gmail.com" && (
            <>
              <Link href="members">
                <div className="rounded w-60 max-sm:w-32 h-60 max-sm:h-32 m-4 bg-gray-200 flex justify-center items-center text-blue-400">
                  <p className="font-medium max-sm:font-normal max-sm:text-sm">
                    Members
                  </p>
                </div>
              </Link>
              <Link href="rules">
                <div className="rounded w-60 max-sm:w-32 h-60 max-sm:h-32 m-4 bg-gray-200 flex justify-center items-center text-blue-400">
                  <p className="font-medium max-sm:font-normal max-sm:text-sm">
                    Rules, Notice and Vision
                  </p>
                </div>
              </Link>
              <Link href="meta-data">
                <div className="rounded w-60 max-sm:w-32 h-60 max-sm:h-32 m-4 bg-gray-200 flex justify-center items-center text-blue-400">
                  <p className="font-medium max-sm:font-normal max-sm:text-sm">
                    Meta Data
                  </p>
                </div>
              </Link>
              <Link href="photos">
                <div className="rounded w-60 max-sm:w-32 h-60 max-sm:h-32 m-4 bg-gray-200 flex justify-center items-center text-blue-400">
                  <p className="font-medium max-sm:font-normal max-sm:text-sm">
                    Photos
                  </p>
                </div>
              </Link>
              <Link href="invest">
                <div className="rounded w-60 max-sm:w-32 h-60 max-sm:h-32 m-4 bg-gray-200 flex justify-center items-center text-blue-400">
                  <p className="font-medium max-sm:font-normal max-sm:text-sm">
                    Invests
                  </p>
                </div>
              </Link>
              <Link href="committee">
                <div className="rounded w-60 max-sm:w-32 h-60 max-sm:h-32 m-4 bg-gray-200 flex justify-center items-center text-blue-400">
                  <p className="font-medium max-sm:font-normal max-sm:text-sm">
                    Committee
                  </p>
                </div>
              </Link>
            </>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
