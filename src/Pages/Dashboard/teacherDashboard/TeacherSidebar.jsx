
    import React from 'react';
    import { NavLink } from 'react-router'; // নিশ্চিত করুন react-router-dom ইম্পোর্ট করেছেন
    import {
         FaUserCircle, FaSignOutAlt,
        FaChartBar,
        FaPlusSquare,
        FaListUl
    } from 'react-icons/fa';
    
    const StudentSidebar = () => {
        // আপনার আগের ডিজাইন অনুযায়ী মেনু আইটেমগুলো

        const links = [
            { name: 'Dashboard', path: '/dashboard', icon: <FaChartBar /> },
            { name: 'Create Quiz', path: '/dashboard/create-quiz', icon: <FaPlusSquare /> },
            { name: 'My Quizzes', path: '/dashboard/my-quizzes', icon: <FaListUl /> },
            { name: 'Profile', path: '/dashboard/profile', icon: <FaUserCircle /> },
        ];

    
        return (
            <nav className="mt-4 px-4 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        end={link.path === '/dashboard'} // শুধু মেইন ড্যাশবোর্ডের জন্য 'end' প্রপ
                        className={({ isActive }) =>
                            `flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                : 'text-gray-400 hover:bg-white/10 hover:text-white'
                            }`
                        }
                    >
                        <span className="mr-3 text-lg">{link.icon}</span>
                        <span className="font-medium">{link.name}</span>
                    </NavLink>
                ))}
    
                {/* Logout Button */}
                <button className="flex items-center px-4 py-3 mt-10 text-red-400 hover:bg-red-500/10 w-full rounded-xl transition-all border border-transparent hover:border-red-500/20">
                    <FaSignOutAlt className="mr-3" />
                    <span className="font-medium">Logout</span>
                </button>
            </nav>
        );
    };
    
    export default StudentSidebar;