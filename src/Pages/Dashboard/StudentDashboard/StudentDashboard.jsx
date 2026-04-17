import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import {
    FaThLarge, FaSignInAlt, FaClipboardList, FaLaptopCode,
    FaUserCircle, FaSignOutAlt, FaBell, FaTrophy, FaCalendarAlt
} from 'react-icons/fa';
import { JoinQuizSection } from './JoinQuizSection';

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('Overview');

    const menuItems = [
        { name: 'Overview', icon: <FaThLarge /> },
        { name: 'Join Quiz', icon: <FaSignInAlt /> },
        { name: 'My Results', icon: <FaClipboardList /> },
        { name: 'Available Exams', icon: <FaLaptopCode /> },
        { name: 'Profile', icon: <FaUserCircle /> },
    ];

    return (
        <div className="flex min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Sidebar */}
            {/* <aside className="w-64 bg-white/5 border-r border-white/10 backdrop-blur-xl hidden md:block relative z-20">
                <div className="p-8">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                        Examino
                    </h2>
                    <p className="text-[10px] text-emerald-500/60 font-bold tracking-[0.2em] mt-1 uppercase">Student Portal</p>
                </div>

                <nav className="mt-4 px-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(item.name)}
                            className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.name
                                    ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
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
            </aside> */}

            {/* Main Content */}
            <main className="flex-1 p-8 relative z-10 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            Hey, <span className="text-emerald-400">{user?.displayName || "Scholar"}!</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Ready to test your knowledge today?</p>
                    </div>

                    <div className="flex items-center gap-5">
                        <button className="p-3 text-gray-400 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all relative">
                            <FaBell />
                            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-[#0f172a]"></span>
                        </button>
                        <div className="flex items-center gap-3 bg-white/5 p-1 pr-4 rounded-full border border-white/10">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/photo.jpg"}
                                alt="Profile"
                                className="w-9 h-9 rounded-full border border-emerald-500/50"
                            />
                            <span className="text-sm font-bold text-gray-300 hidden lg:block">Rank: #12</span>
                        </div>
                    </div>
                </header>

                {/* Conditional Content */}
                {activeTab === 'Overview' && <StudentOverview />}
                {activeTab === 'Join Quiz' && <JoinQuizSection></JoinQuizSection>}
                {/* {activeTab === 'My Results' && <MyResultsSection />} */}
                {activeTab === 'Available Exams' && (
                    <div className="p-10 text-center border-2 border-dashed border-white/10 rounded-3xl">
                        <p className="text-gray-500 italic">No public exams available right now.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

/* --- Sub-Components (Internal for simplicity) --- */

const StudentOverview = () => {
    const stats = [
        { label: "Enrolled", value: "05", icon: <FaLaptopCode />, color: "from-blue-500 to-indigo-600" },
        { label: "Completed", value: "03", icon: <FaTrophy />, color: "from-emerald-400 to-teal-600" },
        { label: "Avg. Score", value: "85%", icon: <FaClipboardList />, color: "from-purple-500 to-pink-600" },
    ];

    return (
        <div className="animate-fadeIn space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                                <p className="text-4xl font-black mt-2">{stat.value}</p>
                            </div>
                            <div className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-xl font-bold">Recent Performances</h3>
                </div>
                <div className="p-6">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-xs uppercase tracking-widest">
                                <th className="pb-4">Exam Name</th>
                                <th className="pb-4">Score</th>
                                <th className="pb-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-white/5">
                                <td className="py-4 font-semibold text-gray-300">JavaScript Basic Quiz</td>
                                <td className="py-4 text-emerald-400 font-bold">90/100</td>
                                <td className="py-4"><span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full border border-emerald-500/20">PASSED</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


// const MyResultsSection = () => {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gradient-to-br from-blue-600/20 to-transparent p-6 rounded-3xl border border-white/10">
//                 <h4 className="text-blue-400 font-bold mb-2">Total Points</h4>
//                 <p className="text-5xl font-black">2,450</p>
//             </div>
//             <div className="bg-gradient-to-br from-emerald-600/20 to-transparent p-6 rounded-3xl border border-white/10">
//                 <h4 className="text-emerald-400 font-bold mb-2">Exams Taken</h4>
//                 <p className="text-5xl font-black">18</p>
//             </div>
//         </div>
//     );
// };

export default StudentDashboard;