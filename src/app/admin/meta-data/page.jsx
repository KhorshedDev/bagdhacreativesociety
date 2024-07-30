"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMetaData, createMetaData } from "@/lib/userService";
import Image from "next/image";
import { storage } from "@/lib/firebase"; // Adjust the path to your firebase config file
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MetaData() {
  const [meta, setMeta] = useState(null);
  const [state, setState] = useState({
    phone: "",
    email: "",
    target: "",
    bkash: "",
    nagad: "",
    acName: "",
    ac: "",
    bank: "",
    add: "",
    routing: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getMeta();
  }, []);

  const getMeta = async () => {
    const data = await getMetaData();
    setMeta(data);
  };

  const updateValue = async (field, value) => {
    await createMetaData(meta.id, { [field]: value });
    await getMeta();
    setState((prevState) => ({ ...prevState, [field]: "" }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `coverPictures/${meta.id}`);
      const snapshot = await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(snapshot.ref);

      await createMetaData(meta.id, { pictureUrl: fileUrl });
      await getMeta();
      alert("Picture uploaded successfully!");
      setUploading(false);
    } catch (e) {
      console.error("Error uploading picture: ", e);
      alert("Something went wrong!");
      setUploading(false);
    }
  };

  if (!meta) {
    return <p className="text-center font-bold text-lg">Loading...</p>;
  }

  return (
    <ProtectedRoute>
      <main className="bg-white min-h-svh">
        <div className="w-5/6 mx-auto">
          <nav className="py-4">
            <Link className="text-blue-400" href="/admin/home">
              Go Back
            </Link>
          </nav>
          <div>
            <div>
              <h1 className="font-bold text-lg my-1">Bank Details</h1>
              <ul>
                <li className="p-3 bg-gray-100 my-1">
                  Bkash number : {meta.bkash}
                  <div>
                    <input
                      value={state.bkash}
                      className="border-none outline-none px-1 mt-1 bg-blue-100"
                      type="text"
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          bkash: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => updateValue("bkash", state.bkash)}
                      className="text-white p-1 text-sm bg-blue-400 ml-2"
                    >
                      Update
                    </button>
                  </div>
                </li>
                <li className="p-3 bg-gray-100 my-1">
                  nagad : {meta.nagad}
                  <div>
                    <input
                      value={state.nagad}
                      className="border-none outline-none px-1 mt-1 bg-blue-100"
                      type="text"
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          nagad: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => updateValue("nagad", state.nagad)}
                      className="text-white p-1 text-sm bg-blue-400 ml-2"
                    >
                      Update
                    </button>
                  </div>
                </li>
                <li className="p-3 bg-gray-100 my-1">
                  Acc name : {meta.acName}
                  <div>
                    <input
                      value={state.acName}
                      className="border-none outline-none px-1 mt-1 bg-blue-100"
                      type="text"
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          acName: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => updateValue("acName", state.acName)}
                      className="text-white p-1 text-sm bg-blue-400 ml-2"
                    >
                      Update
                    </button>
                  </div>
                </li>
                <li className="p-3 bg-gray-100 my-1">
                  ac : {meta.ac}
                  <div>
                    <input
                      value={state.ac}
                      className="border-none outline-none px-1 mt-1 bg-blue-100"
                      type="text"
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          ac: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => updateValue("ac", state.ac)}
                      className="text-white p-1 text-sm bg-blue-400 ml-2"
                    >
                      Update
                    </button>
                  </div>
                </li>
                <li className="p-3 bg-gray-100 my-1">
                  Bank : {meta.bank}
                  <div>
                    <input
                      value={state.bank}
                      className="border-none outline-none px-1 mt-1 bg-blue-100"
                      type="text"
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          bank: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => updateValue("bank", state.bank)}
                      className="text-white p-1 text-sm bg-blue-400 ml-2"
                    >
                      Update
                    </button>
                  </div>
                </li>
                <li className="p-3 bg-gray-100 my-1">
                  address : {meta.add}
                  <div>
                    <input
                      value={state.add}
                      className="border-none outline-none px-1 mt-1 bg-blue-100"
                      type="text"
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          add: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => updateValue("add", state.add)}
                      className="text-white p-1 text-sm bg-blue-400 ml-2"
                    >
                      Update
                    </button>
                  </div>
                </li>
                <li className="p-3 bg-gray-100 my-1">
                  Routing : {meta.routing}
                  <div>
                    <input
                      value={state.routing}
                      className="border-none outline-none px-1 mt-1 bg-blue-100"
                      type="text"
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          routing: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => updateValue("routing", state.routing)}
                      className="text-white p-1 text-sm bg-blue-400 ml-2"
                    >
                      Update
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <h1 className="font-bold text-lg my-1">Contact Details</h1>
            <ul>
              <li className="p-3 bg-gray-100 my-1">
                Phone number : {meta.phone}
                <div>
                  <input
                    value={state.phone}
                    className="border-none outline-none px-1 mt-1 bg-blue-100"
                    type="text"
                    onChange={(e) =>
                      setState((prevState) => ({
                        ...prevState,
                        phone: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={() => updateValue("phone", state.phone)}
                    className="text-white p-1 text-sm bg-blue-400 ml-2"
                  >
                    Update
                  </button>
                </div>
              </li>
              <li className="p-3 bg-gray-100 my-1">
                Email Address : {meta.email}
                <div>
                  <input
                    value={state.email}
                    className="border-none outline-none px-1 mt-1 bg-blue-100"
                    type="text"
                    onChange={(e) =>
                      setState((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={() => updateValue("email", state.email)}
                    className="text-white p-1 text-sm bg-blue-400 ml-2"
                  >
                    Update
                  </button>
                </div>
              </li>
            </ul>
            <h1 className="font-bold text-lg my-1">Target</h1>
            <p>
              Target amount: {meta.target}{" "}
              <span className="ml-2">
                <input
                  value={state.target}
                  className="border-none outline-none px-1 mt-1 bg-blue-100"
                  type="text"
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      target: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={() => updateValue("target", state.target)}
                  className="text-white p-1 text-sm bg-blue-400 ml-2"
                >
                  Update
                </button>
              </span>
            </p>
            <h1 className="font-bold text-lg my-3">Cover Picture</h1>
            {meta.pictureUrl && (
              <Image
                className="border-2 my-3"
                alt="group picture"
                width={400}
                src={meta.pictureUrl}
                height={250}
              />
            )}
            <input
              onChange={handleFileChange}
              className="py-2 block"
              type="file"
              disabled={uploading}
              name="coverPicture"
              id="coverPicture"
            />
            <button
              disabled={uploading}
              onClick={handleFileUpload}
              className="py-1 px-3 bg-blue-400 text-white mb-20"
            >
              {uploading ? "Uploading...." : "Upload New Picture"}
            </button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
