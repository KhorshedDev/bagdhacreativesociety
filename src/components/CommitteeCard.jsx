"use client";
import { useEffect, useState } from "react";
import { getUserById, deleteCommittee } from "@/lib/userService";
import Image from "next/image";
export default function CommitteeCard({ details, isweb, func }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser();
  });

  const fetchUser = async () => {
    const u = await getUserById(details.user_Id);
    setUser(u);
  };
  const handleDelete = async () => {
    await deleteCommittee(details.id);
    alert("Delete succcess");
    await func();
  };
  return (
    <div className="shadow-md m-2 p-2 bg-gray-50 rounded flex justify-center items-center flex-col">
      {user ? (
        <>
          <Image
            src={user?.pictureUrl}
            alt="committee's photo"
            width={100}
            height={120}
          />
          <p className=" text-sm text-center mt-2">{user?.name}</p>
          <p className="py-1 font-medium text-center">{details?.position}</p>
          <p className="text-sm text-center">{user?.phone}</p>
          {!isweb && (
            <button
              onClick={handleDelete}
              className="px-2 rounded text-sm py-1 mt-2 bg-red-400"
            >
              Delete
            </button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
