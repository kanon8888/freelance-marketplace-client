
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  
  useEffect(() => {
    axios
      .get("https://freelance-marketplace-server-gilt.vercel.app/freelance")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  
  const handleAcceptTask = async (job) => {
    if (!user?.email) {
      toast.error("Please login to accept tasks");
      return;
    }

    try {
      await axios.post("https://freelance-marketplace-server-gilt.vercel.app/acceptedTasks", {
        ...job,
        userEmail: user.email, 
      });
      toast.success("Task added to My Accepted Tasks!");
      navigate("/myAcceptedTasks");
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept task");
    }
  };

  if (loading)
    return <div className="text-center mt-10 font-semibold">Loading Jobs...</div>;

  if (jobs.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">No jobs found!</div>
    );

  return (
    <div className="p-5">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold text-center mb-6">
        All Freelance Jobs
      </h1>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-xl shadow-md p-4 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <img
                src={job.coverImage || "https://via.placeholder.com/400x250"}
                alt={job.title}
                className="w-full h-48 object-cover rounded mb-3"
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

            <div className="flex flex-col mt-3 gap-2">
             
              <button
                onClick={() => navigate(`/viewDetails/${job._id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </button>

              
              <button
                onClick={() => handleAcceptTask(job)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Accept / My Accepted Tasks
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;








