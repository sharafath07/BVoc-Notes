import React, { useContext, useMemo, useState } from "react";
import { Search, Trash2, Users } from "lucide-react";
import { Context } from "../../Context/Context";
import api from "../../api/axios";

function AdminStudents() {
    const {
        isDark,
        students,
        setStudents,
        semesters,
        backendUrl
    } = useContext(Context);

    const [search, setSearch] = useState("");
    const [semester, setSemester] = useState("");

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesName = student.name
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesSemester =
                !semester ||
                student.studentProfile?.semester === semester;

            return matchesName && matchesSemester;
        });
    }, [students, search, semester]);

    async function handleDelete(student) {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${student.name}?`
        );

        if (!confirmed) return;

        try {
            const response = await api.delete(
                `${backendUrl}/api/users/${student.id}`
            );

            if (response.data.success) {
                setStudents((prevStudents) =>
                    prevStudents.filter(
                        (item) => item.id !== student.id
                    )
                );
            }
        } catch (error) {
            console.error("Delete student error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete student"
            );
        }
    }

    return (
        <section
            className={`min-h-screen px-6 py-24 font-roboto transition-colors duration-300 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto max-w-7xl">

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
                                Students
                            </h1>

                            <p
                                className={`mt-1 text-sm ${isDark
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                    }`}
                            >
                                Manage registered students
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div
                    className={`mb-6 rounded-2xl border p-5 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <div className="grid gap-4 md:grid-cols-2">

                        {/* Search */}
                        <div className="relative">
                            <Search
                                size={19}
                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            />

                            <input
                                type="text"
                                placeholder="Search student by name..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className={`w-full rounded-xl border py-3 pl-10 pr-4 outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-white"
                                    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-black"
                                    }`}
                            />
                        </div>

                        {/* Semester */}
                        <select
                            value={semester}
                            onChange={(e) =>
                                setSemester(e.target.value)
                            }
                            className={`w-full rounded-xl border px-4 py-3 outline-none transition ${isDark
                                ? "border-gray-700 bg-gray-800 text-white focus:border-white"
                                : "border-gray-300 bg-white text-gray-900 focus:border-black"
                                }`}
                        >
                            <option value="">
                                All Semesters
                            </option>

                            {semesters.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    Semester {item.number}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                {/* Student count */}
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
                        {filteredStudents.length}
                    </span>{" "}
                    students
                </div>

                {/* Table */}
                <div
                    className={`overflow-hidden rounded-2xl border ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-md"
                        }`}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left">

                            <thead
                                className={
                                    isDark
                                        ? "bg-gray-800"
                                        : "bg-gray-100"
                                }
                            >
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Register No.
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Name
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold">
                                        Semester
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
                                {filteredStudents.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
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
                                                No students found
                                            </p>

                                            <p className="mt-1 text-sm">
                                                Try changing your search
                                                or semester filter.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student) => (
                                        <tr
                                            key={student.id}
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
                                                {student.studentProfile.registerNumber}
                                            </td>

                                            <td
                                                className={`px-6 py-4 text-sm ${isDark
                                                    ? "text-gray-200"
                                                    : "text-gray-700"
                                                    }`}
                                            >
                                                {student.name}
                                            </td>

                                            <td
                                                className={`px-6 py-4 text-sm ${isDark
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                                    }`}
                                            >
                                                Semester {student.studentProfile.semester}
                                            </td>

                                            <td
                                                className={`px-6 py-4 text-sm ${isDark
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                                    }`}
                                            >
                                                {student.email}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(student)
                                                        }
                                                        title="Delete student"
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

export default AdminStudents;