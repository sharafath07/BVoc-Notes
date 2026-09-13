import React, {
    useContext,
    useMemo,
    useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";

import { Context } from "../Context/Context";

import ProgramBox from "../components/Resources/ProgramBox";
import SemesterBox from "../components/Resources/SemesterBox";
import SubjectBox from "../components/Resources/SubjectBox";
import ResourceTypeBox from "../components/Resources/ResourceTypeBox";
import ResourceCard from "../components/Resources/ResourceCard";

import {
    cardVariants,
    containerVariants,
} from "../animations";

function Resource() {
    const {
        isDark,
        resources = [],
        semesters = [],
        subjects = [],
        program = [],
    } = useContext(Context);

    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const programSemesters = useMemo(() => {
        if (!selectedProgram) return [];

        return semesters.filter(
            (semester) =>
                semester.programId === selectedProgram.id
        );
    }, [selectedProgram, semesters]);

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

    const handleProgramSelect = (program) => {
        setSelectedProgram(program);
        setSelectedSemester(null);
        setSelectedSubject(null);
        setSelectedType(null);
    };

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
        setSelectedProgram(null);
    };

    const resetSemester = () => {
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
                <motion.div
                    className="mb-8 sm:mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        variants={cardVariants}
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] sm:mb-3 sm:text-sm sm:tracking-[0.2em] ${isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                            }`}
                    >
                        Learning Materials
                    </motion.p>

                    <motion.h1
                        variants={cardVariants}
                        className="text-3xl font-bold sm:text-4xl md:text-5xl"
                    >
                        Resources
                    </motion.h1>

                    <motion.p
                        variants={cardVariants}
                        className={`mt-3 max-w-2xl text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7 ${isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Select your semester, subject, and resource
                        type to find the study materials you need.
                    </motion.p>
                </motion.div>


                {/* Breadcrumb */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${selectedProgram?.id || "program"}-${selectedSemester?.id || "semester"}-${selectedSubject?.id || "subject"}-${selectedType || "type"}`}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                        }}
                        className={`mb-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:mb-8 sm:text-sm ${isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        <motion.button
                            type="button"
                            onClick={resetAll}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className="transition hover:underline"
                        >
                            Programs
                        </motion.button>

                        {selectedProgram && (
                            <>
                                <span>/</span>

                                <motion.button
                                    type="button"
                                    onClick={resetSemester}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="transition hover:underline"
                                >
                                    {selectedProgram.name}
                                </motion.button>
                            </>
                        )}

                        {selectedSemester && (
                            <>
                                <span>/</span>

                                <motion.button
                                    type="button"
                                    onClick={resetSubject}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="max-w-[150px] truncate transition hover:underline sm:max-w-none"
                                >
                                    Semester {selectedSemester.number}
                                </motion.button>
                            </>
                        )}

                        {selectedSubject && (
                            <>
                                <span>/</span>

                                <motion.button
                                    type="button"
                                    onClick={resetType}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="max-w-[150px] truncate transition hover:underline sm:max-w-none"
                                >
                                    {selectedSubject.name}
                                </motion.button>
                            </>
                        )}

                        {selectedType && (
                            <>
                                <span>/</span>

                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="max-w-[150px] truncate sm:max-w-none"
                                >
                                    {selectedType}
                                </motion.span>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>


                {/* Resource Navigation Steps */}
                <div className="relative">

                    <AnimatePresence mode="wait" initial={false}>

                        {/* Programs */}
                        {!selectedProgram && (
                            <motion.div
                                key="programs"
                                initial={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: 20,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >
                                <ProgramBox
                                    programs={program}
                                    isDark={isDark}
                                    onSelect={handleProgramSelect}
                                />
                            </motion.div>
                        )}


                        {/* Semesters */}
                        {selectedProgram && !selectedSemester && (
                            <motion.div
                                key="semesters"
                                initial={{
                                    opacity: 0,
                                    x: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >
                                <SemesterBox
                                    semesters={programSemesters}
                                    isDark={isDark}
                                    onSelect={handleSemesterSelect}
                                    onBack={resetAll}
                                />
                            </motion.div>
                        )}


                        {/* Subjects */}
                        {selectedSemester && !selectedSubject && (
                            <motion.div
                                key="subjects"
                                initial={{
                                    opacity: 0,
                                    x: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >
                                <SubjectBox
                                    subjects={semesterSubjects}
                                    semester={selectedSemester}
                                    isDark={isDark}
                                    onSelect={handleSubjectSelect}
                                    onBack={resetSemester}
                                />
                            </motion.div>
                        )}


                        {/* Resource Types */}
                        {selectedSubject && !selectedType && (
                            <motion.div
                                key="resource-types"
                                initial={{
                                    opacity: 0,
                                    x: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >
                                <ResourceTypeBox
                                    isDark={isDark}
                                    subject={selectedSubject}
                                    semester={selectedSemester}
                                    onSelect={handleTypeSelect}
                                    onBack={resetSubject}
                                />
                            </motion.div>
                        )}


                        {/* Resources */}
                        {selectedSubject && selectedType && (
                            <motion.div
                                key="resources"
                                initial={{
                                    opacity: 0,
                                    x: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >
                                <ResourceCard
                                    resources={subjectResources}
                                    type={selectedType}
                                    subject={selectedSubject}
                                    semester={selectedSemester}
                                    isDark={isDark}
                                    onBack={resetType}
                                />
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}

export default Resource;