import React, { useContext, useMemo, useState } from "react";
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
    }, [selectedSubject, selectedType, resources]);

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
            className={`min-h-screen px-6 py-24 font-roboto transition-colors duration-300 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-12">
                    <p
                        className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Learning Materials
                    </p>

                    <h1 className="text-4xl font-bold md:text-5xl">
                        Resources
                    </h1>

                    <p
                        className={`mt-4 max-w-2xl leading-7 ${isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Select your semester, subject, and resource type
                        to find the study materials you need.
                    </p>
                </div>

                {/* Breadcrumb */}
                <div className="mb-8 flex flex-wrap gap-2 text-sm">

                    <button onClick={resetAll}>
                        Semesters
                    </button>

                    {selectedSemester && (
                        <>
                            <span>/</span>

                            <button onClick={resetSubject}>
                                Semester {selectedSemester.number}
                            </button>
                        </>
                    )}

                    {selectedSubject && (
                        <>
                            <span>/</span>

                            <button onClick={resetType}>
                                {selectedSubject.name}
                            </button>
                        </>
                    )}

                    {selectedType && (
                        <>
                            <span>/</span>

                            <span>{selectedType}</span>
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
                {selectedSemester && !selectedSubject && (
                    <SubjectBox
                        subjects={semesterSubjects}
                        semester={selectedSemester}
                        isDark={isDark}
                        onSelect={handleSubjectSelect}
                        onBack={resetAll}
                    />
                )}

                {/* STEP 3 */}
                {selectedSubject && !selectedType && (
                    <ResourceTypeBox
                        isDark={isDark}
                        subject={selectedSubject}
                        semester={selectedSemester}
                        onSelect={handleTypeSelect}
                        onBack={resetSubject}
                    />
                )}

                {/* STEP 4 */}
                {selectedSubject && selectedType && (
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