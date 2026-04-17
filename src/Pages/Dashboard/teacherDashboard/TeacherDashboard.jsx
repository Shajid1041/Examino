import React, { useState } from 'react';
import {
    FaPlus, FaBook, FaUsers, FaChartLine,
    FaQuestionCircle, FaCog, FaSignOutAlt, FaBell
} from 'react-icons/fa';
import CreateQuiz from './CreateQuiz'; // আপনার তৈরি করা কুইজ কম্পোনেন্ট
import MyQuizzes from './MyQuizzes';
import QuestionBank from './QuestionBank';

const TeacherDashboard = () => {
    // ১. স্টেট ডিক্লেয়ারেশন
    const [activeTab, setActiveTab] = useState('Overview');

    const menuItems = [
        { name: 'Overview', icon: <FaChartLine /> },
        { name: 'Create New Quiz', icon: <FaPlus /> },
        { name: 'My Quizzes', icon: <FaBook /> },
        { name: 'Student Results', icon: <FaUsers /> },
        { name: 'Question Bank', icon: <FaQuestionCircle /> },
        { name: 'Settings', icon: <FaCog /> },
    ];

    return (
        <div className="flex min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Sidebar */}
            <aside className="w-64 bg-white/5 border-r border-white/10 backdrop-blur-xl hidden md:block relative z-20">
                <div className="p-8">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        Examino
                    </h2>
                    <p className="text-xs text-gray-500 font-medium tracking-widest mt-1 uppercase">Teacher Panel</p>
                </div>

                <nav className="mt-4 px-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(item.name)} // ট্যাব চেঞ্জ করার লজিক
                            className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.name
                                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}

                    <button className="flex items-center px-4 py-3 mt-10 text-red-400 hover:bg-red-500/10 w-full rounded-xl transition-all border border-transparent hover:border-red-500/20">
                        <FaSignOutAlt className="mr-3" />
                        <span className="font-medium">Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 relative z-10 overflow-y-auto">
                {/* Header Section */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">
                            {activeTab} <span className="text-blue-400">Section</span>
                        </h1>
                        <p className="text-gray-400 mt-2">Manage your dashboard efficiently.</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="p-3 text-gray-400 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all relative">
                            <FaBell />
                            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-blue-500 rounded-full border-2 border-[#0f172a]"></span>
                        </button>
                        <img
                            src="https://i.ibb.co/profile-teacher.jpg"
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover p-0.5"
                        />
                    </div>
                </header>

                <hr className="border-white/5 mb-10" />

                {/* ২. কন্ডিশনাল কন্টেন্ট রেন্ডারিং */}

                {activeTab === 'Overview' && <OverviewStats />}

                {activeTab === 'Create New Quiz' && <CreateQuiz />}

                {activeTab === 'My Quizzes' && <MyQuizzes />}

                {activeTab === 'Question Bank' && <QuestionBank />}
            </main>
        </div>
    );
};

// Overview এর জন্য আলাদা একটি কম্পোনেন্ট (একই ফাইলের নিচে বা আলাদা ফাইলে রাখতে পারেন)
const OverviewStats = () => {
    const stats = [
        { label: 'Total Quizzes', value: '12', color: 'from-blue-400 to-blue-600' },
        { label: 'Active Students', value: '145', color: 'from-emerald-400 to-emerald-600' },
        { label: 'Avg. Score', value: '78%', color: 'from-purple-400 to-purple-600' },
    ];

    return (
        <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                        <p className={`text-5xl font-black mt-4 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-xl font-bold text-white">Active Quizzes</h3>
                </div>
                <div className="p-6 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-xs uppercase tracking-widest">
                                <th className="pb-6 px-4">Exam Title</th>
                                <th className="pb-6 px-4">Submissions</th>
                                <th className="pb-6 px-4">Status</th>
                                <th className="pb-6 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/5">
                            <tr className="group hover:bg-white/5 transition-colors">
                                <td className="py-5 px-4 font-semibold text-white">Data Structures Final</td>
                                <td className="py-5 px-4 text-gray-400">42 Students</td>
                                <td className="py-5 px-4">
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">LIVE</span>
                                </td>
                                <td className="py-5 px-4 text-right">
                                    <button className="text-blue-400 font-bold hover:underline transition-colors">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;