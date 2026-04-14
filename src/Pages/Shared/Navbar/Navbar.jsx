import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <nav className="bg-[#1f2937] text-white py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
            {/* Logo Area */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[#1f2937] font-bold">✓</span>
                </div>
                <span className="text-xl font-bold tracking-tight">examino</span>
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

                <NavLink to="/sign-up" className="border border-gray-400 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white hover:text-black transition">Sign Up</NavLink>
                <button className="hidden md:block text-xs font-bold text-gray-300 hover:text-white">Teacher Sign In</button>
            </div>
        </nav>
    );
};

export default Navbar;