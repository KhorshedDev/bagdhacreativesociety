"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getRules,
  createRule,
  deleteRule,
  updateRule,
} from "@/lib/userService";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Rules() {
  const [todo, setTodo] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    fetchRules();
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
  const fetchRules = async () => {
    const ruleList = await getRules();
    setTodolist(ruleList);
  };
  const handleDelete = async (id) => {
    await deleteRule(id);
    fetchRules();
  };
  const editTodo = async (i) => {
    setTodo(i.rule);
    setId(i.id);
    setEditMode(true);
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
            <h2 className="text-lg font-bold my-3">Rules</h2>

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
              <li>There is no rules set yet</li>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
