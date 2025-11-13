import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    
    const slides = [
        {
            title: "Hire Top Freelancers Effortlessly",
            subtitle: "Find reliable experts for your projects anytime, anywhere",
            cta1: "Create a Job",
            cta2: "Learn More",
            bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
        },
        {
            title: "Get Work Done Quickly",
            subtitle: "Connect with professionals and accelerate your business",
            cta1: "Post a Job",
            cta2: "See How",
            bg: "bg-gradient-to-r from-purple-500 to-pink-500",
        },
        {
            title: "Trusted Freelance Marketplace",
            subtitle: "Reliable, fast, and easy to use platform for everyone",
            cta1: "Start Hiring",
            cta2: "Explore Jobs",
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
            .get("http://localhost:3000/freelance") 
            .then((res) => {
                setJobs(res.data);
                setLoadingJobs(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingJobs(false);
            });
    }, []);

    return (
        <div>
            
            <div className="relative w-full h-[500px] overflow-hidden mb-10">
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            } ${slide.bg} text-white`}
                    >
                        <div className="text-center px-4">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
                                {slide.title}
                            </h1>
                            <p className="text-lg md:text-2xl mb-6 animate-fadeIn delay-200">
                                {slide.subtitle}
                            </p>
                            <div className="flex justify-center gap-4 animate-fadeIn delay-400 flex-wrap">
                                <button className="bg-white text-black font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition">
                                    {slide.cta1}
                                </button>
                                <button className="bg-transparent border border-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-black transition">
                                    {slide.cta2}
                                </button>
                            </div>
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

            
            <div className="px-5">
                <h2 className="text-3xl font-bold text-center mb-6">Featured Jobs</h2>
                {loadingJobs ? (
                    <p className="text-center font-semibold">Loading jobs...</p>
                ) : jobs.length === 0 ? (
                    <p className="text-center text-gray-500">No jobs available!</p>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="border p-4 rounded shadow hover:shadow-lg flex flex-col"
                            >
                                <img
                                    src={job.coverImage || "https://via.placeholder.com/400x250"}
                                    alt={job.title}
                                    className="w-full h-48 object-cover rounded mb-3"
                                />
                                <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                                <p className="text-gray-600 mb-1">{job.category}</p>
                                <p className="text-sm text-gray-500 mb-2">
                                    Posted By: {job.postedBy}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {job.summary?.slice(0, 80)}...
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            
            <div className="my-16 px-5">
                <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 border rounded shadow hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Reliable Experts</h3>
                        <p className="text-gray-600">
                            Only verified professionals for your projects.
                        </p>
                    </div>
                    <div className="p-6 border rounded shadow hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
                        <p className="text-gray-600">
                            Post a job and get responses instantly.
                        </p>
                    </div>
                    <div className="p-6 border rounded shadow hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                        <p className="text-gray-600">
                            Your data and payments are safe with us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
