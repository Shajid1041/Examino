import React from 'react';
import { FaLaptopCode, FaClock, FaUsers, FaArrowRight } from 'react-icons/fa';

const AvailableExams = () => {
    // ডামি ডাটা (JSON এখন অনেক ক্লিন, কোনো স্টাইল ইনফো নেই)
    const exams = [
        {
            id: 1,
            title: "Frontend Development Quiz",
            category: "React & Tailwind",
            duration: "30 Min",
            participants: "1.2k",
            difficulty: "Medium"
        },
        {
            id: 2,
            title: "Node.js Backend Basics",
            category: "Server Side",
            duration: "45 Min",
            participants: "850",
            difficulty: "Hard"
        },
        {
            id: 3,
            title: "UI/UX Design Principles",
            category: "Design",
            duration: "20 Min",
            participants: "2.5k",
            difficulty: "Beginner"
        },
        {
            id: 4,
            title: "MongoDB & Database Design",
            category: "Database",
            duration: "40 Min",
            participants: "600",
            difficulty: "Medium"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <FaLaptopCode className="text-emerald-400" />
                        </div>
                        Available Quizzes
                    </h2>
                    <p className="text-gray-400 mt-1">Pick a challenge and test your skills</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">All Topics</span>
                    <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400 tracking-wide">Newest First</span>
                </div>
            </div>

            {/* Exams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map((exam, index) => {
                    // লজিক: ইনডেক্স বিজোড় হলে নীল, জোড় হলে সবুজ
                    const isOdd = (index + 1) % 2 !== 0;

                    return (
                        <div
                            key={exam.id}
                            className={`group backdrop-blur-md border rounded-3xl p-6 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-gradient-to-br
                            ${isOdd
                                    ? "from-blue-500/20 to-indigo-600/20 border-blue-500/30"
                                    : "from-emerald-500/20 to-teal-600/20 border-emerald-500/30"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full text-white/70">
                                    {exam.category}
                                </span>
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${exam.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                                        exam.difficulty === 'Medium' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    {exam.difficulty}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                                {exam.title}
                            </h3>

                            <div className="flex items-center gap-5 text-gray-400 text-sm mb-8">
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-gray-500" />
                                    <span>{exam.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUsers className="text-gray-500" />
                                    <span>{exam.participants} Joined</span>
                                </div>
                            </div>

                            <button className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group/btn
                                ${isOdd
                                    ? "bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white"
                                    : "bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white"
                                }`}
                            >
                                Enroll Now
                                <FaArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {exams.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
                    <p className="text-gray-500 italic">No exams available right now.</p>
                </div>
            )}
        </div>
    );
};

export default AvailableExams;