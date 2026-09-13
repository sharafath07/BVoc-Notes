import React, { useContext, useEffect, useState } from "react";
import { Link as LinkIcon, Plus } from "lucide-react";
import { motion } from "motion/react";
import { Context } from "../../Context/Context";
import api from "../../api/axios";
import { Link as LinkTo } from "react-router-dom";
import {
    cardVariants,
    containerVariants,
    buttonVariants,
} from "../../animations";

function AdminAddResource() {
    const {
        backendUrl,
        semesters,
        subjects,
        setResources,
    } = useContext(Context);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [semester, setSemester] = useState("");
    const [semesterId, setSemesterId] = useState("");
    const [subjectList, setSubjectList] = useState([]);
    const [subject, setSubject] = useState("");
    const [type, setType] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        const selectedSemester = semesters?.find(
            (item) => semester === item.id
        );

        setSemesterId(selectedSemester?.id || "");
    }, [semester, semesters]);

    useEffect(() => {
        const filteredSubjects =
            subjects?.filter(
                (item) => semesterId === item.semesterId
            ) || [];

        setSubjectList(filteredSubjects);

        // Reset subject when semester changes
        setSubject("");
    }, [semesterId, subjects]);

    function clearForm() {
        setTitle("");
        setDescription("");
        setFileUrl("");
        setSemester("");
        setSemesterId("");
        setSubject("");
        setSubjectList([]);
        setType("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const resourceData = {
            title,
            description,
            subjectId: subject,
            type,
            fileName: title,
            fileUrl,
        };

        try {
            const response = await api.post(
                `${backendUrl}/api/resources/`,
                resourceData
            );

            if (response.data.success) {
                setResources((prevResources) => [
                    ...prevResources,
                    response.data.resource || resourceData,
                ]);

                clearForm();
            }
        } catch (error) {
            console.error(
                "Creation of Resource failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Creation of Resource Failed"
            );
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
            }}
            className="min-h-screen w-full bg-gray-50 px-4 py-8 font-roboto sm:px-6 sm:py-10 md:px-8 lg:px-10 lg:py-12"
        >
            <div className="mx-auto w-full max-w-4xl">

                {/* Header */}
                <motion.div
                    className="mb-7 sm:mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        variants={cardVariants}
                        className="text-2xl font-bold text-gray-900 sm:text-3xl"
                    >
                        Add Resource
                    </motion.h1>

                    <motion.p
                        variants={cardVariants}
                        className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7"
                    >
                        Add study materials and useful resources
                        for students.
                    </motion.p>
                </motion.div>


                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.1,
                        ease: "easeOut",
                    }}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-8"
                >
                    {/* Title */}
                    <motion.div
                        className="mb-5 sm:mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                    >
                        <label
                            htmlFor="resource-title"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Resource Title
                        </label>

                        <motion.input
                            id="resource-title"
                            type="text"
                            name="title"
                            placeholder="e.g. Data Structures Notes"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                            whileFocus={{ scale: 1.005 }}
                            transition={{ duration: 0.15 }}
                            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-black sm:px-4 sm:text-base"
                        />
                    </motion.div>


                    {/* Description */}
                    <motion.div
                        className="mb-5 sm:mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 }}
                    >
                        <label
                            htmlFor="resource-description"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>

                        <motion.textarea
                            id="resource-description"
                            name="description"
                            rows="4"
                            placeholder="Describe this resource..."
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            whileFocus={{ scale: 1.005 }}
                            transition={{ duration: 0.15 }}
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-3 text-sm leading-6 outline-none transition focus:border-black sm:px-4 sm:text-base"
                        />
                    </motion.div>


                    {/* Semester + Subject */}
                    <motion.div
                        className="mb-5 grid grid-cols-1 gap-5 sm:mb-6 md:grid-cols-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.25 }}
                    >
                        {/* Semester */}
                        <div>
                            <label
                                htmlFor="resource-semester"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Semester
                            </label>

                            <motion.select
                                id="resource-semester"
                                name="semester"
                                value={semester}
                                onChange={(e) =>
                                    setSemester(e.target.value)
                                }
                                required
                                whileFocus={{ scale: 1.005 }}
                                transition={{ duration: 0.15 }}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-black sm:px-4 sm:text-base"
                            >
                                <option value="">
                                    Select semester
                                </option>

                                {semesters?.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        Semester {item.number}
                                    </option>
                                ))}
                            </motion.select>
                        </div>


                        {/* Subject */}
                        <div>
                            <label
                                htmlFor="resource-subject"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Subject
                            </label>

                            <motion.select
                                id="resource-subject"
                                name="subject"
                                required
                                value={subject}
                                onChange={(e) =>
                                    setSubject(e.target.value)
                                }
                                disabled={!semester}
                                whileFocus={
                                    semester
                                        ? { scale: 1.005 }
                                        : undefined
                                }
                                transition={{ duration: 0.15 }}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 sm:px-4 sm:text-base"
                            >
                                <option value="">
                                    {semester
                                        ? "Select subject"
                                        : "Select semester first"}
                                </option>

                                {subjectList?.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </motion.select>
                        </div>
                    </motion.div>


                    {/* Resource Type */}
                    <motion.div
                        className="mb-5 sm:mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.3 }}
                    >
                        <label
                            htmlFor="resource-type"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Resource Type
                        </label>

                        <motion.select
                            id="resource-type"
                            name="type"
                            required
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value)
                            }
                            whileFocus={{ scale: 1.005 }}
                            transition={{ duration: 0.15 }}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-black sm:px-4 sm:text-base"
                        >
                            <option value="">
                                Select type
                            </option>

                            <option value="SYLLABUS">
                                Syllabus
                            </option>

                            <option value="PYQ">
                                Previous Year Question
                            </option>

                            <option value="NOTES">
                                Notes
                            </option>
                        </motion.select>
                    </motion.div>


                    {/* URL */}
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.35 }}
                    >
                        <label
                            htmlFor="resource-url"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Resource URL
                        </label>

                        <motion.div
                            className="flex w-full items-center rounded-lg border border-gray-300 transition focus-within:border-black"
                            whileFocus={{ scale: 1.005 }}
                        >
                            <LinkIcon
                                size={19}
                                className="mx-3 shrink-0 text-gray-500"
                            />

                            <input
                                id="resource-url"
                                type="url"
                                name="url"
                                value={fileUrl}
                                onChange={(e) =>
                                    setFileUrl(e.target.value)
                                }
                                placeholder="https://drive.google.com/..."
                                required
                                className="min-w-0 w-full rounded-r-lg bg-transparent px-2 py-3 text-sm outline-none sm:text-base"
                            />
                        </motion.div>
                    </motion.div>


                    {/* Actions */}
                    <motion.div
                        className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end sm:pt-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.35,
                            delay: 0.4,
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto"
                        >
                            <LinkTo
                                to="/admin/dashboard/resources"
                                className="flex w-full items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50 sm:w-auto sm:text-base"
                            >
                                Cancel
                            </LinkTo>
                        </motion.div>

                        <motion.button
                            type="submit"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto sm:text-base"
                        >
                            <motion.span
                                whileHover={{ rotate: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Plus size={18} />
                            </motion.span>

                            Add Resource
                        </motion.button>
                    </motion.div>
                </motion.form>
            </div>
        </motion.div>
    );
}

export default AdminAddResource;