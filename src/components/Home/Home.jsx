import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const slides = [
        {
            title: "Hire Top Freelancers Easily",
            subtitle: "Find experts for your project anytime",
            bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
        },
        {
            title: "Get Your Work Done Fast",
            subtitle: "Connect with skilled professionals instantly",
            bg: "bg-gradient-to-r from-purple-500 to-pink-500",
        },
        {
            title: "Trusted Freelance Marketplace",
            subtitle: "Safe, reliable, fast — everything you need",
            bg: "bg-gradient-to-r from-green-500 to-teal-500",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

   
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

   
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);

    useEffect(() => {
        axios
            .get("https://freelance-marketplace-server-gilt.vercel.app/freelance")
            .then((res) => {
                setJobs(res.data);
                setLoadingJobs(false);
            })
            .catch(() => setLoadingJobs(false));
    }, []);

    return (
        <div>
           
            <div className="relative w-full h-[450px] overflow-hidden mb-12">
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            } ${slide.bg} text-white`}
                    >
                        <div className="text-center px-4">
                            <h1 className="text-4xl md:text-6xl font-bold mb-3">{slide.title}</h1>
                            <p className="text-xl mb-6">{slide.subtitle}</p>
                            
                        </div>
                    </div>
                ))}

                
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {slides.map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${idx === currentSlide ? "bg-white scale-125" : "bg-gray-300"
                                }`}
                            onClick={() => setCurrentSlide(idx)}
                        ></span>
                    ))}
                </div>
            </div>

           
            <div className="px-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Featured Jobs</h2>

                {loadingJobs ? (
                    <p className="text-center">Loading jobs...</p>
                ) : jobs.length === 0 ? (
                    <p className="text-center text-gray-500">No jobs available!</p>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {jobs.map((job) => (
                            <div key={job._id} className="border p-4 rounded shadow">
                                <img
                                    src={job.coverImage || "https://via.placeholder.com/400x250"}
                                    alt={job.title}
                                    className="w-full h-48 object-cover rounded mb-3"
                                />
                                <h3 className="text-xl font-semibold">{job.title}</h3>
                                <p className="text-gray-600">{job.category}</p>
                                <p className="text-sm text-gray-500">Posted By: {job.postedBy}</p>

                                <button
                                    onClick={() => navigate(`/viewDetails/${job._id}`)}
                                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;






