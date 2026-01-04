import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { MdPerson } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";

const DashboardLayout = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    // Wait for auth
    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
        }
    }, [user]);

    const linkClass =
        "flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors";

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`bg-white dark:bg-gray-800 w-64 p-4 transition-all ${sidebarOpen ? "block" : "hidden"
                    } lg:block`}
            >
                <li>
                    <Link to="/" className="text-white">🏠 Home</Link>
                </li>

                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/dashboard/my-profile"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-800 dark:text-gray-100"
                            }`
                        }
                    >
                        <MdPerson className="text-lg" />
                        <span>My Profile</span>
                    </NavLink>
                    <li>
                        <NavLink
                            to="/dashboard/update"
                            className={({ isActive }) =>
                                "px-3 py-1 rounded hover:bg-blue-500 hover:text-white text-white transition-colors" +
                                (isActive ? " font-bold underline" : "")
                            }
                        >
                            Update
                        </NavLink>

                    </li>

                    <NavLink
                        to="/dashboard/my-jobs"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-800 dark:text-gray-100"
                            }`
                        }
                    >
                        <FaBookOpen className="text-lg" />
                        <span>My Jobs</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="flex justify-between items-center p-4 bg-primary dark:bg-gray-800 shadow">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="btn btn-sm lg:hidden"
                    >
                        ☰
                    </button>

                    <div className="ml-auto flex items-center gap-4">
                        <p className="text-white dark:text-gray-100 font-medium">
                            {user?.displayName || "User"}
                        </p>
                        <button onClick={signOutUser} className="btn btn-sm btn-error">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 flex-1 overflow-auto">
                    <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h1 className="text-3xl font-bold text-center text-primary">
                            Welcome to Dashboard
                        </h1>


                        <p className="text-2xl text-gray-500 text-center dark:text-gray-400 mt-2">
                            📅 {new Date().toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
