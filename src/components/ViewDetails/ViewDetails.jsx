

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/freelance/${id}`)
            .then(res => {
                setJob(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading Job Details...</div>;
    if (!job) return <div className="text-center mt-10 text-red-500">Job not found!</div>;

    return (
        <div className="p-5 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <img
                                    src={job.coverImage || "https://via.placeholder.com/400x250"}
                                    alt={job.title}
                                    className="w-full h-48 object-cover rounded mb-3"
                                />
           
            <p className="text-gray-600 mb-2"><strong>Category:</strong> {job.category}</p>
            <p className="text-gray-600 mb-2"><strong>Posted By:</strong> {job.postedBy}</p>
            <p className="text-gray-700">{job.summary}</p>
        </div>
    );
};

export default ViewDetails;




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ViewDetails = () => {
//     const { id } = useParams(); // URL থেকে job id নেওয়া
//     const [job, setJob] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios
//             .get(`http://localhost:3000/freelance/${id}`) // ব্যাকএন্ড থেকে ডেটা ফেচ
//             .then((res) => {
//                 setJob(res.data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error fetching job:", err);
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading)
//         return (
//             <div className="text-center mt-10 text-lg font-semibold">
//                 Loading Job Details...
//             </div>
//         );

//     if (!job)
//         return (
//             <div className="text-center mt-10 text-red-500 font-semibold">
//                 Job not found!
//             </div>
//         );

//     return (
//         <div className="p-5 max-w-3xl mx-auto">
//             <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
//             <img
//                 src={job.coverImage || "https://via.placeholder.com/600x400"}
//                 alt={job.title}
//                 className="w-full h-96 object-cover rounded mb-4"
//             />
//             <p className="text-gray-600 mb-2">
//                 <strong>Category:</strong> {job.category}
//             </p>
//             <p className="text-gray-600 mb-2">
//                 <strong>Posted By:</strong> {job.postedBy}
//             </p>
//             <p className="text-gray-700">{job.summary}</p>
//         </div>
//     );
// };

// export default ViewDetails;
