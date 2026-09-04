import React, { useContext, useMemo, useState } from "react";
import { Search, Pencil, Trash2, Users } from "lucide-react";
import { Context } from "../../Context/Context";

function AdminFaculties() {
    const {
        isDark,
        faculty = [],
    } = useContext(Context);

    const [search, setSearch] = useState("");

    const filteredFaculty = useMemo(() => {
        return faculty.filter((member) =>
            member.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [faculty, search]);

    const handleEdit = (member) => {
        console.log("Edit faculty:", member);
    };

    const handleDelete = (member) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${member.name}?`
        );

        if (!confirmed) return;

        console.log("Delete faculty:", member);
    };

    return (
        <section
            className={`min-h-screen px-6 py-24 font-roboto transition-colors duration-300 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark
                                ? "bg-white text-black"
                                : "bg-black text-white"
                                }`}
                        >
                            <Users size={24} />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">
                                Faculty
                            </h1>

                            <p
                                className={`mt-1 text-sm ${isDark
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                    }`}
                            >
                                Manage faculty members
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div
                    className={`mb-6 rounded-2xl border p-5 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <div className="relative max-w-md">
                        <Search
                            size={19}
                            className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                                }`}
                        />

                        <input
                            type="text"
                            placeholder="Search faculty by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`w-full rounded-xl border py-3 pl-10 pr-4 outline-none transition ${isDark
                                ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                }`}
                        />
                    </div>
                </div>

                {/* Count */}
                <div
                    className={`mb-4 text-sm ${isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                        }`}
                >
                    Showing{" "}
                    <span
                        className={`font-semibold ${isDark
                            ? "text-white"
                            : "text-gray-900"
                            }`}
                    >
                        {filteredFaculty.length}
                    </span>{" "}
                    faculty members
                </div>

                {/* Table */}
                <div
                    className={`overflow-hidden rounded-2xl border ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[650px] text-left">

                            <thead
                                className={
                                    isDark
                                        ? "bg-gray-800"
                                        : "bg-gray-100"
                                }
                            >
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Name
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody
                                className={`divide-y ${isDark
                                    ? "divide-gray-800"
                                    : "divide-gray-200"
                                    }`}
                            >
                                {filteredFaculty.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className={`px-6 py-12 text-center ${isDark
                                                ? "text-gray-500"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            <Users
                                                size={40}
                                                className="mx-auto mb-3 opacity-50"
                                            />

                                            <p className="font-medium">
                                                No faculty members found
                                            </p>

                                            <p className="mt-1 text-sm">
                                                Try changing your search.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredFaculty.map((member) => (
                                        <tr
                                            key={member.id}
                                            className={`transition-colors ${isDark
                                                ? "hover:bg-gray-800/50"
                                                : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <td
                                                className={`px-6 py-4 text-sm font-medium ${isDark
                                                    ? "text-white"
                                                    : "text-gray-900"
                                                    }`}
                                            >
                                                {member.name}
                                            </td>

                                            <td
                                                className={`px-6 py-4 text-sm ${isDark
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                                    }`}
                                            >
                                                {member.email}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">

                                                    {/* Edit */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(member)
                                                        }
                                                        title="Edit faculty"
                                                        className={`rounded-lg border p-2 transition-all duration-200 hover:scale-105 active:scale-95 ${isDark
                                                            ? "border-gray-700 text-gray-300 hover:bg-white hover:text-black"
                                                            : "border-gray-300 text-gray-600 hover:bg-black hover:text-white"
                                                            }`}
                                                    >
                                                        <Pencil size={17} />
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(member)
                                                        }
                                                        title="Delete faculty"
                                                        className="rounded-lg border border-red-200 p-2 text-red-500 transition-all duration-200 hover:scale-105 hover:bg-red-500 hover:text-white active:scale-95"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default AdminFaculties;