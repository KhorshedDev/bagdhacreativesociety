"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCommittees } from "@/lib/userService";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import CommitteeCard from "@/components/CommitteeCard";
export default function Contact() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const d = await getCommittees();
    setMeta(d);
  };
  if (!meta) {
    return <Loading />;
  }
  return (
    <main className="bg-white min-h-svh">
      <div className="w-5/6 mx-auto">
        <nav className="py-4">
          <Link className="text-blue-400" href="/">
            হোম এ ফিরে যান
          </Link>
        </nav>
        <div>
          <h1 className="text-center font-bold pb-2 mb-4">পরিচালক পর্ষদ</h1>
          <div className="my-4 flex flex-wrap">
            {meta?.map((committee) => (
              <CommitteeCard
                key={committee.id}
                isweb={true}
                details={committee}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
