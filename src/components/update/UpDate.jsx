import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UpDate = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        category: "",
        postedBy: "",
        summary: "",
        coverImage: "",
    });
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        axios
            .get(`https://freelance-marketplace-server-gilt.vercel.app/freelance/${id}`)
            .then((res) => {
                setJob(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching job:", err);
                toast.error("Failed to load job data");
                setLoading(false);
            });
    }, [id]);

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    
    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`https://freelance-marketplace-server-gilt.vercel.app/freelance/${id}`, job)
            .then(() => {
                toast.success(" Job updated successfully!");
                setTimeout(() => navigate("/allJobs"), 1000);
            })
            .catch((err) => {
                console.error("Update failed:", err);
                toast.error("Failed to update job");
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-lg font-semibold">
                Loading job info...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
            <Toaster position="top-center" />
            <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
                 Update Job
            </h1>

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                        className="input input-bordered w-full mt-1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={job.category}
                        onChange={handleChange}
                        className="input input-bordered w-full mt-1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Posted By</label>
                    <input
                        type="text"
                        name="postedBy"
                        value={job.postedBy}
                        onChange={handleChange}
                        className="input input-bordered w-full mt-1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Summary</label>
                    <textarea
                        name="summary"
                        value={job.summary}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full mt-1"
                        rows="4"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Cover Image URL</label>
                    <input
                        type="text"
                        name="coverImage"
                        value={job.coverImage}
                        onChange={handleChange}
                        className="input input-bordered w-full mt-1"
                    />
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                        💾 Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpDate;
