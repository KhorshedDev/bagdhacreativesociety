'use client'

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { getUsers, getMetaData } from "@/lib/userService";
import { useAuth } from "@/context/AuthContext";
import { updateUserPayrollByIndex, deleteUserPayroll } from "@/lib/userService";
import NotFound from "@/app/not-found";

const TableOfPay = ({ data, index, userId, onUpdate, canEdit }) => {
    const [edit, setEdit] = useState(false);
    const [newVal, setNewVal] = useState(data.amount);

    const handleUpdate = async () => {
        try {
            const updateData = { amount: newVal };
            await updateUserPayrollByIndex(userId, index, updateData);
            setEdit(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUserPayroll(userId, index);
            setEdit(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4 w-full">
            {!edit ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {canEdit && (
                        <div className="flex items-start gap-2 sm:flex-col">
                            <button
                                onClick={() => setEdit(true)}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    <div className="text-sm sm:text-base">
                        <p className="font-semibold">{data.date}</p>
                        <p className="text-gray-500">
                            {data.payDate ? data.payDate.toDate().toDateString() : "-"}
                        </p>
                    </div>

                    <p className="text-sm sm:text-base text-center">{data.payMathod}</p>
                    <p className="text-sm sm:text-base text-center">{data.rashid || "-"}</p>
                    <p className="font-bold text-center text-green-600">{data.amount}tk</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">Edit Amount</p>
                    <input
                        type="number"
                        value={newVal}
                        onChange={(e) => setNewVal(Number(e.target.value))}
                        className="border p-2 rounded w-full"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => setEdit(false)}
                            className="bg-gray-400 text-white px-4 py-1 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="bg-green-600 text-white px-4 py-1 rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function PayrollPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [member, setMember] = useState(null);
    const [meta, setMeta] = useState(null);
    const { user, loading } = useAuth();

    const fetchUsers = useCallback(async () => {
        const userList = await getUsers();
        const found = userList.find((m) => m.id === id);
        setMember(found || null);
    }, [id]);

    useEffect(() => {
        getMetaData().then((d) => setMeta(d || {}));
    }, []);

    useEffect(() => {
        if (id) {
            fetchUsers();
        }
    }, [id, fetchUsers]);

    if (meta?.isMembersLocked || meta?.membersLocked) {
        return <NotFound />;
    }

    if (loading) {
        return null;
    }

    if (!member) {
        return (
            <div className="p-8 max-w-4xl mx-auto text-center text-gray-500">
                Loading member details...
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 max-w-4xl h-full mx-auto">
            <nav className="mb-6">
                <Link
                    className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors"
                    href={user ? "/admin/members" : "/members"}
                >
                    ← {user ? "Back to Members" : "ফিরে যান"}
                </Link>
            </nav>

            <h1 className="text-2xl font-bold mb-2">Payroll Summary for &quot;{member.name}&quot;</h1>
            <p className="text-lg font-semibold text-gray-700 mb-6">
                Total: <span className="text-green-600">{member.total || 0} Tk</span>
            </p>

            <div className={`hidden sm:grid ${user ? "grid-cols-5" : "grid-cols-4"} bg-gray-200 p-2 rounded font-semibold text-center text-sm sm:text-base mb-4`}>
                {user && <p>Action</p>}
                <p>Pay Month</p>
                <p>Pay Method</p>
                <p>Rashid No</p>
                <p>Amount</p>
            </div>

            <div className="flex flex-col">
                {member.payroll?.length > 0 ? (
                    member.payroll
                        .map((item, index) => ({ item, index })) // keep original index
                        .reverse()
                        .map(({ item, index }) => (
                            <TableOfPay
                                key={item.month || index}
                                userId={id}
                                data={item}
                                index={index} // original index
                                onUpdate={fetchUsers}
                                canEdit={Boolean(user)}
                            />
                        ))
                ) : (
                    <p className="text-center mt-4 text-gray-500">No deposits found.</p>
                )}
            </div>
        </div>
    );
}
