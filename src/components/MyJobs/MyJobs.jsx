import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch MyJobs for logged-in user
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://freelance-marketplace-server-gilt.vercel.app/myJobs?userEmail=${user.email}`)
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        toast.error("Failed to load jobs");
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-10 font-semibold text-lg">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="p-6">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold text-center mb-6">My Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition"
            >
              <img
                src={job.coverImage || "https://via.placeholder.com/400x250"}
                alt={job.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.category}</p>
              <p className="text-sm text-gray-500 mb-2">Posted by: {job.postedBy}</p>
              <p className="text-sm text-gray-500">{job.summary?.slice(0, 80)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
