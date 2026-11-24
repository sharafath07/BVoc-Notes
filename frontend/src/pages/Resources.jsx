import React, {
    useContext,
    useMemo,
    useState,
    useEffect,
} from "react";
import { motion, AnimatePresence } from "motion/react";

import { Context } from "../Context/Context";
import { getResourceAvailability, getResourceCards } from "../Context/Resource";
import { DepartmentHeading } from "../components/DepartmentPage";
import { logLoadTime } from "../utils/logLoadTime";

import ProgramBox from "../components/Resources/ProgramBox";
import SemesterBox from "../components/Resources/SemesterBox";
import SubjectBox from "../components/Resources/SubjectBox";
import ResourceTypeBox from "../components/Resources/ResourceTypeBox";
import ResourceCard from "../components/Resources/ResourceCard";

function Resource() {
    const { isDark, backendUrl } = useContext(Context);

    const [availabilityResult, setAvailabilityResult] = useState(null);
    const [availabilityAttempt, setAvailabilityAttempt] = useState(0);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [result, setResult] = useState(null);
    const [attempt, setAttempt] = useState(0);
    const subjectId = selectedSubject?.id;
    const optionsKey = JSON.stringify([backendUrl, availabilityAttempt]);
    const requestKey = JSON.stringify([backendUrl, subjectId, selectedType, attempt]);
    const activeAvailability = availabilityResult?.key === optionsKey ? availabilityResult : null;
    const availability = activeAvailability?.rows ?? null;
    const availabilityError = activeAvailability?.error;
    const activeResult = result?.key === requestKey ? result : null;

    useEffect(() => {
        const controller = new AbortController();
        const startedAt = performance.now();
        setAvailabilityResult({ key: optionsKey });
        getResourceAvailability(backendUrl, controller.signal)
            .then((rows) => {
                if (controller.signal.aborted) return;
                logLoadTime("Resource options", startedAt);
                setAvailabilityResult({ key: optionsKey, rows });
            })
            .catch(() => {
                if (!controller.signal.aborted) {
                    logLoadTime("Resource options", startedAt, true);
                    setAvailabilityResult({ key: optionsKey, error: "Resource options could not be loaded." });
                }
            });
        return () => controller.abort();
    }, [backendUrl, optionsKey]);

    useEffect(() => {
        if (!subjectId || !selectedType) return;
        const controller = new AbortController();
        const startedAt = performance.now();
        setResult({ key: requestKey });
        getResourceCards(backendUrl, subjectId, selectedType, controller.signal)
            .then((resources) => {
                if (controller.signal.aborted) return;
                logLoadTime("Resources", startedAt);
                setResult({ key: requestKey, resources });
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    logLoadTime("Resources", startedAt, true);
                    setResult({
                        key: requestKey,
                        error: error.response?.data?.message || "Resources could not be loaded.",
                    });
                }
            });
        return () => controller.abort();
    }, [backendUrl, subjectId, selectedType, requestKey]);


    const programs = useMemo(() => [...new Map((availability ?? []).map(({ programId, programName }) =>
        [programId, { id: programId, name: programName }]
    )).values()], [availability]);

    const programSemesters = useMemo(() => {
        const rows = (availability ?? []).filter(({ programId }) => programId === selectedProgram?.id);
        return [...new Map(rows.map(({ semesterId, semesterNumber }) =>
            [semesterId, { id: semesterId, number: semesterNumber }]
        )).values()];
    }, [availability, selectedProgram]);

    const semesterSubjects = useMemo(() => (availability ?? [])
        .filter(({ semesterId }) => semesterId === selectedSemester?.id)
        .map(({ subjectId, subjectName, types }) => ({ id: subjectId, name: subjectName, types })),
    [availability, selectedSemester]);

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
        setAttempt((current) => current + 1);
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
        <>
        <DepartmentHeading title="Academic resources" description="Browse study materials by programme, semester, subject and resource type." />
        <section
            className={`min-h-screen w-full px-4 py-20 font-roboto transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-10 ${isDark
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="mx-auto w-full max-w-7xl">

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

                {!selectedProgram && !availability && !availabilityError && (
                    <p role="status" className="load-elapsed py-8 text-center">Loading resource options…</p>
                )}

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
                                {availabilityError ? (
                                    <div role="alert" className="py-8 text-center">
                                        <p>{availabilityError}</p>
                                        <button type="button" className="mt-3 font-semibold underline" onClick={() => setAvailabilityAttempt((current) => current + 1)}>
                                            Try again
                                        </button>
                                    </div>
                                ) : availability && (programs.length ? (
                                    <ProgramBox programs={programs} isDark={isDark} onSelect={handleProgramSelect} />
                                ) : (
                                    <p className="py-8 text-center">No resources have been published yet.</p>
                                ))}
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
                                    resources={activeResult?.resources ?? []}
                                    type={selectedType}
                                    subject={selectedSubject}
                                    semester={selectedSemester}
                                    isDark={isDark}
                                    onBack={resetType}
                                    resourcesLoading={!activeResult?.resources && !activeResult?.error}
                                    resourcesError={activeResult?.error}
                                    onRetry={() => setAttempt((current) => current + 1)}
                                />
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

            </div>
        </section>
        </>
    );
}

export default Resource;
