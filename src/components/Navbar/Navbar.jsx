// components/Navbar/Navbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = React.useContext(AuthContext);
    const navigate = useNavigate();

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
                </>
            )}
        </>
    );

    const handleLogout = () => {
        signOutUser()
            .then(() => navigate('/register')) // logout হলে register page এ redirect
            .catch(err => console.error(err));
    };

    return (
        <nav className="navbar bg-base-100 shadow-sm px-4">
            {/* Left: Logo + Mobile Dropdown */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                        {!user && (
                            <li>
                                <NavLink
                                    to="/register"
                                    className="px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors"
                                >
                                    Login / Register
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                <NavLink to="/" className="btn btn-ghost text-xl">
                    Market<span className="text-blue-600">Place</span>
                </NavLink>
            </div>

            {/* Center: Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Right-end: Login / Logout */}
            <div className="navbar-end">
                {user ? (
                    <button onClick={handleLogout} className="btn">
                        Logout
                    </button>
                ) : (
                    <NavLink to="/register" className="btn">
                        Login 
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
