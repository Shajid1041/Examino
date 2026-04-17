import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogOut = () => {
        signOutUser()
            .then(() => setDropdownOpen(false))
            .catch(error => console.log(error));
    };

    return (
        <nav className="bg-[#1f2937] text-white py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
            {/* Logo Area */}
            <div className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#1f2937] font-bold">✓</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">examino</span>
                </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
                <a href="#" className="hover:text-white flex items-center gap-1">How it works <span>▾</span></a>
                <a href="#" className="hover:text-white">Pricing</a>
                <a href="#" className="hover:text-white flex items-center gap-1">Customers <span>▾</span></a>
                <a href="#" className="hover:text-white flex items-center gap-1">Resources <span>▾</span></a>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                {/* Student Exam Key Input */}
                <div className="hidden sm:flex items-center bg-white rounded-full px-3 py-1 text-gray-800">
                    <input
                        type="text"
                        placeholder="Student Exam Key"
                        className="bg-transparent border-none outline-none text-xs w-24 md:w-32 py-1"
                    />
                    <button className="bg-[#1f2937] text-white rounded-full p-1 ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                {user ? (
                    /* Profile Dropdown after Login */
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 focus:outline-none"
                        >
                            <div className="w-9 h-9 rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-[#1f2937] overflow-hidden transition-transform active:scale-95">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                    alt="User"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[60] text-gray-800 animate-in fade-in zoom-in duration-200">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-bold truncate">{user?.displayName || "User"}</p>
                                    <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                                </div>

                                <Link
                                    to="/dashboard"
                                    onClick={() => setDropdownOpen(false)}
                                    className="block px-4 py-2.5 text-sm hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={handleLogOut}
                                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}

                        {/* Overlay to close dropdown when clicking outside */}
                        {dropdownOpen && (
                            <div
                                className="fixed inset-0 z-[-1]"
                                onClick={() => setDropdownOpen(false)}
                            ></div>
                        )}
                    </div>
                ) : (
                    /* Auth Buttons when Logged Out */
                    <div className="flex items-center gap-3">

                        <Link to="/sign-in" className="border border-gray-400 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white hover:text-black transition">Log In</Link>
                    </div>
                )}

                <Link to="/become-teacher" className="hidden md:block text-xs font-bold text-gray-300 hover:text-white">Teacher Center</Link>
            </div>
        </nav>
    );
};

export default Navbar;