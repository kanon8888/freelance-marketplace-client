

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/freelance")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading Jobs...</div>;
  if (jobs.length === 0)
    return <div className="text-center mt-10 text-gray-500">No jobs found!</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-6">All Freelance Jobs</h1>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

            {/* View Details Button */}
            <button
              onClick={() => navigate(`/viewDetails/${job._id}`)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </button>

            {/* Go to My Accepted Tasks */}
            <button
              onClick={() => navigate("/myAcceptedTasks")}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              My Accepted Tasks
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router";

// const AllJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("http://localhost:3000/freelance")
//       .then(res => {
//         setJobs(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading Jobs...</div>;
//   if (jobs.length === 0) return <div className="text-center mt-10 text-gray-500">No jobs found!</div>;

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold text-center mb-6">All Freelance Jobs</h1>
//       <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//         {jobs.map(job => (
//           <div key={job._id} className="border rounded-xl shadow-md p-4 hover:shadow-lg flex flex-col justify-between">
//             <div>
//               <img
//                 src={job.coverImage || "https://via.placeholder.com/400x250"}
//                 alt={job.title}
//                 className="w-full h-48 object-cover rounded mb-3"
//               />


//               <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
//               <p className="text-gray-600 mb-2">{job.category}</p>
//               <p className="text-sm text-gray-500 mb-2"><strong>Posted By:</strong> {job.postedBy}</p>
//               <p className="text-sm text-gray-500">{job.summary?.slice(0, 80)}...</p>
//             </div>
//             <button
//               onClick={() => navigate(`/viewDetails/${job._id}`)}
//               className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             >
//               View Details
//             </button>
//             <button
//               onClick={() => navigate("/myAcceptedTasks")}
//               className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//             >
//               My Accepted Tasks
//             </button>
//         ))}
//           </div>
//     </div>
//       );
// };

//       export default AllJobs;




