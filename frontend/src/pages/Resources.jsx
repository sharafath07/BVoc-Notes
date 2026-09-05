// Resource.jsx

import React, {
    useContext,
    useMemo,
    useState,
} from "react";

import { Context } from "../Context/Context";

import SemesterBox from "../components/Resources/SemesterBox";
import SubjectBox from "../components/Resources/SubjectBox";
import ResourceTypeBox from "../components/Resources/ResourceTypeBox";
import ResourceCard from "../components/Resources/ResourceCard";

function Resource() {
    const {
        isDark,
        resources = [],
        semesters = [],
        subjects = [],
    } = useContext(Context);

    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const semesterSubjects = useMemo(() => {
        if (!selectedSemester) return [];

        return subjects.filter(
            (subject) =>
                subject.semesterId === selectedSemester.id
        );
    }, [selectedSemester, subjects]);

    const subjectResources = useMemo(() => {
        if (!selectedSubject || !selectedType) return [];

        return resources.filter(
            (resource) =>
                resource.subjectId === selectedSubject.id &&
                resource.type === selectedType
        );
    }, [
        selectedSubject,
        selectedType,
        resources,
    ]);

    const handleSemesterSelect = (semester) => {
        setSelectedSemester(semester);
        setSelectedSubject(null);
        setSelectedType(null);
    };

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setSelectedType(null);
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    const resetAll = () => {
        setSelectedSemester(null);
        setSelectedSubject(null);
        setSelectedType(null);
    };

    const resetSubject = () => {
        setSelectedSubject(null);
        setSelectedType(null);
    };

    const resetType = () => {
        setSelectedType(null);
    };

    return (
        <section
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-7xl">

                {/* Header */}
                <div className="mb-8 sm:mb-12">
                    <p
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] sm:mb-3 sm:text-sm sm:tracking-[0.2em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Learning Materials
                    </p>

                    <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                        Resources
                    </h1>

                    <p
                        className={`mt-3 max-w-2xl text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7 ${isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Select your semester, subject, and resource
                        type to find the study materials you need.
                    </p>
                </div>

                {/* Breadcrumb */}
                <div
                    className={`mb-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:mb-8 sm:text-sm ${isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                        }`}
                >
                    <button
                        type="button"
                        onClick={resetAll}
                        className="transition hover:underline"
                    >
                        Semesters
                    </button>

                    {selectedSemester && (
                        <>
                            <span>/</span>

                            <button
                                type="button"
                                onClick={resetSubject}
                                className="max-w-[150px] truncate transition hover:underline sm:max-w-none"
                            >
                                Semester {selectedSemester.number}
                            </button>
                        </>
                    )}

                    {selectedSubject && (
                        <>
                            <span>/</span>

                            <button
                                type="button"
                                onClick={resetType}
                                className="max-w-[150px] truncate transition hover:underline sm:max-w-none"
                            >
                                {selectedSubject.name}
                            </button>
                        </>
                    )}

                    {selectedType && (
                        <>
                            <span>/</span>

                            <span className="max-w-[150px] truncate sm:max-w-none">
                                {selectedType}
                            </span>
                        </>
                    )}
                </div>

                {/* STEP 1 */}
                {!selectedSemester && (
                    <SemesterBox
                        semesters={semesters}
                        isDark={isDark}
                        onSelect={handleSemesterSelect}
                    />
                )}

                {/* STEP 2 */}
                {selectedSemester &&
                    !selectedSubject && (
                        <SubjectBox
                            subjects={semesterSubjects}
                            semester={selectedSemester}
                            isDark={isDark}
                            onSelect={handleSubjectSelect}
                            onBack={resetAll}
                        />
                    )}

                {/* STEP 3 */}
                {selectedSubject &&
                    !selectedType && (
                        <ResourceTypeBox
                            isDark={isDark}
                            subject={selectedSubject}
                            semester={selectedSemester}
                            onSelect={handleTypeSelect}
                            onBack={resetSubject}
                        />
                    )}

                {/* STEP 4 */}
                {selectedSubject &&
                    selectedType && (
                        <ResourceCard
                            resources={subjectResources}
                            type={selectedType}
                            subject={selectedSubject}
                            semester={selectedSemester}
                            isDark={isDark}
                            onBack={resetType}
                        />
                    )}
            </div>
        </section>
    );
}

export default Resource;