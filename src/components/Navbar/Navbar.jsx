
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                        (isActive ? " font-bold underline" : "")
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allJobs"
                    className={({ isActive }) =>
                        "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                        (isActive ? " font-bold underline" : "")
                    }
                >
                    All Jobs
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/addaJob"
                            className={({ isActive }) =>
                                "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                                (isActive ? " font-bold underline" : "")
                            }
                        >
                            Add a Job
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/myAcceptedTasks"
                            className={({ isActive }) =>
                                "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                                (isActive ? " font-bold underline" : "")
                            }
                        >
                            My Accepted Tasks
                        </NavLink>

                    </li>
                    <li>
                        <NavLink
                            to="/updateJob"
                            className={({ isActive }) =>
                                "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                                (isActive ? " font-bold underline" : "")
                            }
                        >
                            Update
                        </NavLink>
                        
                    </li>
                </>
            )}
        </>
    );

    const handleLogout = () => {
        signOutUser()
            .then(() => navigate('/register'))
            .catch(err => console.error(err));
    };

    return (
        <nav className="navbar bg-base-100 dark:bg-gray-800 dark:text-white shadow-sm px-4">
            
            <div className="navbar-start">
                <NavLink to="/" className="btn btn-ghost text-xl">
                    Market<span className="text-blue-600">Place</span>
                </NavLink>
            </div>

            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

           
            <div className="navbar-end flex items-center gap-3 relative">
                
                <button
                    onClick={toggleDarkMode}
                    className="btn btn-sm bg-gray-200 dark:bg-gray-700 dark:text-white"
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                {user ? (
                    <>
                      
                        {user.photoURL && (
                            <div className="relative group">
                                <img
                                    src={user.photoURL}
                                    alt="User"
                                    className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                                />
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {user.displayName || 'User'}
                                </span>
                            </div>
                        )}

                        <button onClick={handleLogout} className="btn btn-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/register" className="btn">
                        Login / Register
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;