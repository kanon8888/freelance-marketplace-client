// src/components/AllJobs/AllJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend থেকে data load
  useEffect(() => {
    axios
      .get("http://localhost:3000/freelance") // তোমার backend endpoint
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Loading Jobs...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No jobs found!
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-6">
        All Freelance Jobs
      </h1>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={job.coverImage || "https://via.placeholder.com/400x250"}
              alt={job.title}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.category}</p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Posted By:</strong> {job.postedBy}
            </p>
            <p className="text-sm text-gray-500">
              {job.summary?.slice(0, 80)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
