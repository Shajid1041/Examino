import React from 'react';
import { FaUserPlus, FaKey, FaPenNib, FaTrophy } from 'react-icons/fa';

const HowItWorks = () => {
    // Examino এর সাথে প্রাসঙ্গিক ৪টি ধাপ
    const steps = [
        {
            id: 1,
            title: "Quick Registration",
            description: "Join the elite community of learners by creating your secure Examino profile in seconds.",
            icon: <FaUserPlus className="text-3xl text-blue-400" />,
            glowColor: "group-hover:shadow-blue-500/20"
        },
        {
            id: 2,
            title: "Join with Credentials",
            description: "Enter your unique Contest ID and Password provided by your educator to enter the secure hall.",
            icon: <FaKey className="text-3xl text-emerald-400" />,
            glowColor: "group-hover:shadow-emerald-500/20"
        },
        {
            id: 3,
            title: "Smart Examination",
            description: "Experience a seamless, AI-monitored testing environment designed for maximum focus.",
            icon: <FaPenNib className="text-3xl text-purple-400" />,
            glowColor: "group-hover:shadow-purple-500/20"
        },
        {
            id: 4,
            title: "Instant Analytics",
            description: "Get detailed performance breakdown and rank insights immediately after submission.",
            icon: <FaTrophy className="text-3xl text-orange-400" />,
            glowColor: "group-hover:shadow-orange-500/20"
        }
    ];

    return (
        <section id='hiw' className="py-24 bg-[#0f172a] relative overflow-hidden">
            {/* Background Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full -z-0"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 ">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white italic">
                        How <span className="text-blue-500">Examino</span> Works
                    </h2>
                    
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="group relative bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-3"
                        >
                            {/* Step Number Badge */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#1e293b] border border-white/10 rounded-2xl flex items-center justify-center text-white font-black italic group-hover:bg-blue-600 transition-colors shadow-xl">
                                0{index + 1}
                            </div>

                            {/* Icon Container */}
                            <div className={`w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl ${step.glowColor} group-hover:shadow-2xl`}>
                                {step.icon}
                            </div>

                            <h4 className="font-black text-xl text-white mb-4 tracking-tight">
                                {step.title}
                            </h4>

                            <p className="text-gray-400 text-sm leading-relaxed font-medium">
                                {step.description}
                            </p>

                            {/* Hover Bottom Border Decoration */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-full transition-all duration-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;