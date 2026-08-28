import React, { useContext, useState } from "react";
import { Link, Plus } from "lucide-react";
import { Context } from '../../Context/Context'

function AdminAddResource() {
    const { backendUrl } = useContext(Context);
    // const


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [type, setType] = useState('');
    const [fileUrl, setFileUrl] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        const resourceData = {
            title,
            description,
            subject,
            semester,
            type,
            fileUrl,
        };

        console.log(resourceData);
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
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6</option>
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
                                <option value="programming">Programming</option>
                                <option value="database">Database</option>
                                <option value="web-development">Web Development</option>
                                <option value="networking">Networking</option>
                                <option value="design">Design</option>
                                <option value="general">General</option>
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
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
                        >
                            <option value="">Select type</option>
                            <option value="programming">Syllabus</option>
                            <option value="database">Previous Year Question</option>
                            <option value="web-development">Notes</option>
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
                                placeholder="https://..."
                                className="w-full px-2 py-3"
                            />
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">

                        <button
                            type="button"
                            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>

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