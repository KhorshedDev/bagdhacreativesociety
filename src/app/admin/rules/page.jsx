"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getRules,
  createRule,
  deleteRule,
  updateRule,
  getNotices,
  getVisions,
  createNotice,
  createVision,
  updateNotice,
  updateVison,
  deleteNotice,
  deleteVison,
} from "@/lib/userService";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Rules() {
  const [todo, setTodo] = useState("");
  const [vision, setVison] = useState("");
  const [notice, setNotice] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [visionList, setVisionList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingNotice, setLoadingNotice] = useState(false);
  const [loadingVision, setLoadingVision] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editVision, setEditVistion] = useState(false);
  const [editNotice, setEditNotice] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    fetchRules();
    fetchNotices();
    fetchVisions();
  }, []);
  const addTodo = async () => {
    if (editMode) {
      await updateRule(id, { rule: todo });
      setTodo("");
      setEditMode(false);
      await fetchRules();
      return;
    }
    setLoading(true);
    await createRule({ rule: todo });
    setTodo("");
    await fetchRules();
    setLoading(false);
  };
  const addNotice = async () => {
    if (editNotice) {
      await updateNotice(id, { notice: notice });
      setNotice("");
      setEditNotice(false);
      await fetchNotices();
      return;
    }
    setLoadingNotice(true);
    await createNotice({ notice });
    setNotice("");
    await fetchNotices();
    setLoadingNotice(false);
  };
  const addVisions = async () => {
    if (editVision) {
      await updateVison(id, { vision });
      setVison("");
      setEditVistion(false);
      await fetchVisions();
      return;
    }
    setLoadingVision(true);
    await createVision({ vision });
    setVison("");
    await fetchVisions();
    setLoadingVision(false);
  };
  const fetchRules = async () => {
    const ruleList = await getRules();
    setTodolist(ruleList);
  };
  const fetchNotices = async () => {
    const noticeList = await getNotices();
    setNoticeList(noticeList);
    console.log(noticeList);
  };
  const fetchVisions = async () => {
    const visionList = await getVisions();
    setVisionList(visionList);
  };
  const handleDelete = async (id, rule) => {
    if (rule === "notice") {
      await deleteNotice(id);
      fetchNotices();
    } else if (rule === "vision") {
      await deleteVison(id);
      fetchVisions();
    } else {
      await deleteRule(id);
      fetchRules();
    }
  };
  const editTodo = async (i) => {
    setTodo(i.rule);
    setId(i.id);
    setEditMode(true);
  };
  const editV = async (i) => {
    setVison(i.vision);
    setId(i.id);
    setEditVistion(true);
  };
  const editN = async (i) => {
    setNotice(i.notice);
    setId(i.id);
    setEditNotice(true);
  };
  return (
    <ProtectedRoute>
      <main className="bg-white min-h-svh">
        <div className="w-5/6 mx-auto">
          <nav className="py-4">
            <Link className="text-blue-400" href="/admin/home">
              Go back
            </Link>
          </nav>
          <div className="mt-1">
            <h2 className="text-lg font-bold my-3">Rules</h2>
            <div className="my-3">
              <input
                className="w-5/6 py-1 px-2 outline-none border-none bg-blue-200"
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <button
                disabled={loading}
                onClick={addTodo}
                className="bg-blue-400 py-1 px-4 text-white"
              >
                {loading ? "adding.." : editMode ? "update" : "+ Add"}
              </button>
            </div>

            {todolist.length > 0 ? (
              <ul>
                {todolist.map((i) => {
                  return (
                    <li key={i.id} className="bg-gray-100 p-2 my-1">
                      {i.rule}
                      {!editMode && (
                        <div className="mt-2">
                          <button
                            onClick={() => editTodo(i)}
                            className="text-blue-400"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(i.id)}
                            className="ml-2 text-red-600"
                          >
                            delete
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>There is no rules rules to show.</p>
            )}
          </div>
          <div className="py-6">
            <h2 className="text-lg font-bold my-3">Notice</h2>
            <div className="my-3">
              <textarea
                className="w-5/6 py-1 px-2 outline-none border-none bg-blue-200"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
              ></textarea>
              <button
                disabled={loadingNotice}
                onClick={addNotice}
                className="bg-blue-400 py-1 px-4 text-white block"
              >
                {loadingNotice ? "adding.." : editNotice ? "update" : "+ Add"}
              </button>
            </div>

            {noticeList?.length > 0 ? (
              <ul>
                {noticeList.map((i) => {
                  return (
                    <li key={i.id} className="bg-gray-100 p-2 my-1">
                      {i.notice}
                      {!editNotice && (
                        <div className="mt-2">
                          <button
                            onClick={() => editN(i)}
                            className="text-blue-400"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(i.id, "notice")}
                            className="ml-2 text-red-600"
                          >
                            delete
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>There is no notice to show</p>
            )}
          </div>
          <div className="py-5 pb-10">
            <h2 className="text-lg font-bold my-3">Vision</h2>
            <div className="my-3">
              <textarea
                className="w-5/6 py-1 px-2 outline-none border-none bg-blue-200"
                value={vision}
                onChange={(e) => setVison(e.target.value)}
              ></textarea>
              <button
                disabled={loadingVision}
                onClick={addVisions}
                className="bg-blue-400 py-1 px-4 text-white block"
              >
                {loadingVision ? "adding.." : editVision ? "update" : "+ Add"}
              </button>
            </div>

            {visionList?.length > 0 ? (
              <ul>
                {visionList.map((i) => {
                  return (
                    <li key={i.id} className="bg-gray-100 p-2 my-1">
                      {i.vision}
                      {!editVision && (
                        <div className="mt-2">
                          <button
                            onClick={() => editV(i)}
                            className="text-blue-400"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(i.id, "vision")}
                            className="ml-2 text-red-600"
                          >
                            delete
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>There is no vision to show.</p>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
