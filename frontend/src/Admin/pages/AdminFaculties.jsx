import React, {
    useContext,
    useMemo,
    useState,
} from "react";

import {
    Search,
    Pencil,
    Trash2,
    Users,
} from "lucide-react";

import { Context } from "../../Context/Context";

function AdminFaculties() {
    const {
        isDark,
        faculty = [],
    } = useContext(Context);

    const [search, setSearch] = useState("");

    const filteredFaculty = useMemo(() => {
        return faculty.filter((member) =>
            member.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
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
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 lg:py-28 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-6xl">

                {/* Header */}
                <div className="mb-7 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${isDark
                                ? "bg-white text-black"
                                : "bg-black text-white"
                                }`}
                        >
                            <Users
                                size={21}
                                className="sm:h-6 sm:w-6"
                            />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                Faculty
                            </h1>

                            <p
                                className={`mt-1 text-xs sm:text-sm ${isDark
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
                    className={`mb-5 rounded-2xl border p-4 sm:mb-6 sm:p-5 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <div className="relative w-full max-w-md">
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
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition sm:text-base ${isDark
                                ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                }`}
                        />
                    </div>
                </div>

                {/* Count */}
                <div
                    className={`mb-4 text-xs sm:text-sm ${isDark
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
                        <table className="w-full min-w-[600px] text-left">
                            <thead
                                className={
                                    isDark
                                        ? "bg-gray-800"
                                        : "bg-gray-100"
                                }
                            >
                                <tr>
                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Name
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                                        Email
                                    </th>

                                    <th className="px-4 py-3 text-center text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
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
                                            className={`px-4 py-10 text-center sm:px-6 sm:py-12 ${isDark
                                                ? "text-gray-500"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            <Users
                                                size={36}
                                                className="mx-auto mb-3 opacity-50 sm:h-10 sm:w-10"
                                            />

                                            <p className="text-sm font-medium sm:text-base">
                                                No faculty members found
                                            </p>

                                            <p className="mt-1 text-xs sm:text-sm">
                                                Try changing your search.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredFaculty.map(
                                        (member) => (
                                            <tr
                                                key={member.id}
                                                className={`transition-colors ${isDark
                                                    ? "hover:bg-gray-800/50"
                                                    : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                {/* Name */}
                                                <td
                                                    className={`px-4 py-4 text-sm font-medium sm:px-6 ${isDark
                                                        ? "text-white"
                                                        : "text-gray-900"
                                                        }`}
                                                >
                                                    <span className="block max-w-[180px] truncate sm:max-w-none">
                                                        {member.name}
                                                    </span>
                                                </td>

                                                {/* Email */}
                                                <td
                                                    className={`px-4 py-4 text-sm sm:px-6 ${isDark
                                                        ? "text-gray-400"
                                                        : "text-gray-600"
                                                        }`}
                                                >
                                                    <span className="block max-w-[220px] truncate sm:max-w-none">
                                                        {member.email}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-4 py-4 sm:px-6">
                                                    <div className="flex justify-center gap-2">

                                                        {/* Edit */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    member
                                                                )
                                                            }
                                                            title="Edit faculty"
                                                            aria-label={`Edit ${member.name}`}
                                                            className={`rounded-lg border p-2 transition-all duration-200 hover:scale-105 active:scale-95 ${isDark
                                                                ? "border-gray-700 text-gray-300 hover:bg-white hover:text-black"
                                                                : "border-gray-300 text-gray-600 hover:bg-black hover:text-white"
                                                                }`}
                                                        >
                                                            <Pencil
                                                                size={16}
                                                            />
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    member
                                                                )
                                                            }
                                                            title="Delete faculty"
                                                            aria-label={`Delete ${member.name}`}
                                                            className="rounded-lg border border-red-200 p-2 text-red-500 transition-all duration-200 hover:scale-105 hover:bg-red-500 hover:text-white active:scale-95"
                                                        >
                                                            <Trash2
                                                                size={16}
                                                            />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile table hint */}
                {filteredFaculty.length > 0 && (
                    <p
                        className={`mt-3 text-center text-xs sm:hidden ${isDark
                            ? "text-gray-600"
                            : "text-gray-400"
                            }`}
                    >
                        Swipe horizontally to view all columns
                    </p>
                )}

            </div>
        </section>
    );
}

export default AdminFaculties;