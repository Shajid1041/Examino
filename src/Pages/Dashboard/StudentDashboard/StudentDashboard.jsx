// Pages/Dashboard/StudentDashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';


const StudentDashboard = () => {
    const { user } = useContext(AuthContext );

    const stats = [
        { label: "Enrolled Exams", value: "05", color: "bg-blue-500" },
        { label: "Completed", value: "03", color: "bg-green-500" },
        { label: "Pending Tasks", value: "02", color: "bg-yellow-500" },
        { label: "Avg. Score", value: "85%", color: "bg-purple-500" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.displayName || "Student"}! 👋</h1>
                    <p className="text-gray-500">Here’s what’s happening with your exams today.</p>
                </div>
                <img src={user?.photoURL} alt="Profile" className="w-16 h-16 rounded-full border-4 border-white shadow-lg" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                            {stat.value}
                        </div>
                        <p className="font-semibold text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6">Recent Exams</h3>
                    <div className="space-y-4 text-gray-400 text-center py-10 border-2 border-dashed rounded-2xl">
                        No recent exams found. Start your first quiz!
                    </div>
                </div>

                <div className="bg-[#1f2937] text-white p-8 rounded-3xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-[#f59e0b]">Study Tip of the Day</h3>
                    <p className="text-gray-300 italic">"Consistency is the key to mastering any subject. Spend at least 30 minutes daily on Examino."</p>
                    <button className="mt-6 w-full bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">
                        View Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;