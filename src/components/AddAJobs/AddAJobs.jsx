
import React, { useState, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const AddAJobs = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to post a job!");
      return;
    }

    const newJob = {
      ...formData,
      postedBy: user.displayName || "Anonymous",
      userEmail: user.email,
      postedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post("https://freelance-marketplace-server-gilt.vercel.app/freelance", newJob);
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success("Job added successfully!");
        setFormData({ title: "", category: "", summary: "", coverImage: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add job!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-base-200 shadow-lg rounded-lg">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold text-center mb-6">Add a New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        
        <div>
          <label className="block mb-1 font-semibold">Posted By</label>
          <input
            type="text"
            value={user?.displayName || ""}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        
        <div>
          <label className="block mb-1 font-semibold">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

       
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphics Design">Graphics Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Data Entry">Data Entry</option>
          </select>
        </div>

        
        <div>
          <label className="block mb-1 font-semibold">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Write short job summary..."
          ></textarea>
        </div>

        
        <div>
          <label className="block mb-1 font-semibold">Cover Image (URL)</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        
        <button type="submit" className="btn btn-primary w-full">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddAJobs;
