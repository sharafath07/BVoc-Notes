import React, {
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown } from "lucide-react";

import { Context } from "../../Context/Context";
import api from "../../api/axios";

function AdminAddSubject() {
    const {
        backendUrl,
        isDark,
        program = [],
        semesters = [],
        subjects = [],
        setSubjects,
    } = useContext(Context);

    const navigate = useNavigate();

    const [selectedProgram, setSelectedProgram] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [loading, setLoading] = useState(false);

    /*
     * Get semesters for selected program
     */
    const filteredSemesters = useMemo(() => {
        if (!selectedProgram) return [];

        return semesters.filter(
            (semester) =>
                semester.programId === selectedProgram
        );
    }, [selectedProgram, semesters]);

    /*
     * Reset semester when program changes
     */
    useEffect(() => {
        setSelectedSemester("");
    }, [selectedProgram]);

    /*
     * Submit
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = subjectName.trim();

        if (!selectedProgram) {
            alert("Please select a program.");
            return;
        }

        if (!selectedSemester) {
            alert("Please select a semester.");
            return;
        }

        if (!name) {
            alert("Please enter a subject name.");
            return;
        }

        /*
         * Prevent duplicate subject in the same semester
         */
        const alreadyExists = subjects.some(
            (subject) =>
                subject.semesterId === selectedSemester &&
                subject.name.trim().toLowerCase() ===
                name.toLowerCase()
        );

        if (alreadyExists) {
            alert(
                "This subject already exists in the selected semester."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                `${backendUrl}/api/subjects`,
                {
                    name,
                    semesterId: selectedSemester,
                }
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message ||
                    "Failed to add subject"
                );
            }

            /*
             * Add newly created subject to Context
             */
            setSubjects((currentSubjects) => [
                ...currentSubjects,
                response.data.subject,
            ]);

            alert("Subject added successfully.");

            navigate("/admin/dashboard/subjects");
        } catch (error) {
            console.error("Add subject error:", error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to add subject"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-3xl">
                {/* Back */}
                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/dashboard/subjects")
                    }
                    className={`mb-6 flex items-center gap-2 text-sm transition hover:underline ${isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-900"
                        }`}
                >
                    <ArrowLeft size={17} />
                    Back to Subjects
                </button>

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
                        <BookOpen size={24} />
                    </div>

                    <p
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Administration
                    </p>

                    <h1 className="text-3xl font-bold sm:text-4xl">
                        Add Subject
                    </h1>

                    <p
                        className={`mt-3 text-sm leading-6 sm:text-base ${isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Add a new subject to a program and
                        semester.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className={`rounded-2xl border p-5 sm:p-7 ${isDark
                        ? "border-gray-800 bg-gray-900"
                        : "border-gray-200 bg-white shadow-sm"
                        }`}
                >
                    <div className="space-y-6">
                        {/* Program */}
                        <div>
                            <label
                                htmlFor="program"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Program
                            </label>

                            <div className="relative">
                                <select
                                    id="program"
                                    value={selectedProgram}
                                    onChange={(event) =>
                                        setSelectedProgram(
                                            event.target.value
                                        )
                                    }
                                    className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white focus:border-gray-500"
                                        : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                        }`}
                                >
                                    <option value="">
                                        Select Program
                                    </option>

                                    {program.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50"
                                />
                            </div>
                        </div>

                        {/* Semester */}
                        <div>
                            <label
                                htmlFor="semester"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Semester
                            </label>

                            <div className="relative">
                                <select
                                    id="semester"
                                    value={selectedSemester}
                                    onChange={(event) =>
                                        setSelectedSemester(
                                            event.target.value
                                        )
                                    }
                                    disabled={!selectedProgram}
                                    className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50 ${isDark
                                        ? "border-gray-700 bg-gray-950 text-white focus:border-gray-500"
                                        : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400"
                                        }`}
                                >
                                    <option value="">
                                        {selectedProgram
                                            ? "Select Semester"
                                            : "Select Program First"}
                                    </option>

                                    {filteredSemesters.map(
                                        (semester) => (
                                            <option
                                                key={semester.id}
                                                value={semester.id}
                                            >
                                                Semester{" "}
                                                {
                                                    semester.number
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50"
                                />
                            </div>
                        </div>

                        {/* Subject name */}
                        <div>
                            <label
                                htmlFor="subjectName"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Subject Name
                            </label>

                            <input
                                id="subjectName"
                                type="text"
                                value={subjectName}
                                onChange={(event) =>
                                    setSubjectName(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter subject name"
                                maxLength={150}
                                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${isDark
                                    ? "border-gray-700 bg-gray-950 text-white placeholder:text-gray-600 focus:border-gray-500"
                                    : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-gray-400"
                                    }`}
                            />

                            <p
                                className={`mt-2 text-xs ${isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                    }`}
                            >
                                {subjectName.length}/150
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/dashboard/subjects"
                                )
                            }
                            disabled={loading}
                            className={`rounded-xl px-5 py-3 text-sm font-semibold transition disabled:opacity-50 ${isDark
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${isDark
                                ? "bg-white text-black hover:bg-gray-200"
                                : "bg-black text-white hover:bg-gray-800"
                                }`}
                        >
                            {loading
                                ? "Adding..."
                                : "Add Subject"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AdminAddSubject;