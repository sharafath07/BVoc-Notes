import React, { useContext, useEffect, useState } from "react";
import { Link, Plus } from "lucide-react";
import { Context } from '../../Context/Context'
import api from "../../api/axios";
import { Link as LinkTo } from 'react-router-dom'

function AdminAddResource() {
    const { backendUrl, semesters, subjects, setResources, resources } = useContext(Context);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [semester, setSemester] = useState('');
    const [semesterId, setSemesterId] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const [subject, setSubject] = useState('');
    const [type, setType] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        for (let index = 0; index < semesters.length; index++) {
            const element = semesters[index];
            if (semester === element.id) {
                setSemesterId(element.id)
            }
        }
    }, [semester])

    useEffect(() => {
        const filteredSubjects = subjects?.filter(
            (object) => semesterId === object.semesterId
        );
        setSubjectList(filteredSubjects)
    }, [semesterId, subjects])

    function clearFrom() {
        setTitle("")
        setDescription("")
        setFileUrl("")
        setSemester("")
        setSubject("")
        setType("")
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const resourceData = {
            title,
            description,
            subjectId: subject,
            type,
            fileName: title,
            fileUrl
        };
        try {
            const response = await api.post(
                `${backendUrl}/api/resources/`,
                resourceData
            )

            if (response.data.success) {
                setResources(...resources, resourceData);
                clearFrom();
            }
        } catch (error) {
            console.error("Creation of Resource failed:", error)

            alert(
                error.response?.data?.message || "Creation of Resource Failed"
            )
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10 font-roboto mt-15">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Add Resource
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Add study materials and useful resources for students.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >

                    {/* Title */}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Resource Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Data Structures Notes"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Describe this resource..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Category + Semester */}
                    <div className="mb-6 grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Semester
                            </label>

                            <select
                                name="semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
                            >
                                <option value="">Select semester</option>
                                {semesters?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        Semester {item.number}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Subject
                            </label>

                            <select
                                name="subject"
                                required
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
                            >
                                <option value="">Select subject</option>

                                {subjectList?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Resource Type
                        </label>

                        <select
                            name="type"
                            required
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
                        >
                            <option value="">Select type</option>
                            <option value="SYLLABUS">Syllabus</option>
                            <option value="PYQ">Previous Year Question</option>
                            <option value="NOTES">Notes</option>
                        </select>
                    </div>


                    {/* URL */}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Resource URL
                        </label>
                        <div className="flex flex-row justify-center items-center w-full rounded-lg border border-gray-300 outline-none ">
                            <Link className="mx-3" />
                            <input
                                type="url"
                                name="url"
                                value={fileUrl}
                                onChange={(e) => setFileUrl(e.target.value)}
                                placeholder="https://drive.google.com/..."
                                className="w-full px-2 py-3"
                            />
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">

                        <LinkTo
                            type="button"
                            to={'/admin/dashboard/resources'}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </LinkTo>

                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 font-medium text-white transition hover:bg-gray-800 active:scale-95"
                        >
                            <Plus size={18} />
                            Add Resource
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdminAddResource;