import React from 'react';
// আপনি আপনার প্রয়োজন মতো আইকন ইমপোর্ট করে নেবেন (React Icons ব্যবহার করা হয়েছে এখানে)
import { FaShieldVirus, FaChartLine, FaUserCheck } from 'react-icons/fa';

const ExaminoFeatures = () => {
    const examFeatures = [
        {
            id: 1,
            title: "AI-Powered Proctoring",
            description: "Maintain peak integrity with our advanced AI-driven security. Our system tracks suspicious behavior and ensures a fair testing environment for every participant, anywhere in the world.",
            icon: <FaShieldVirus className="text-6xl text-blue-400" />,
            accentColor: "from-blue-500/20 to-indigo-500/20",
            borderColor: "border-blue-500/30"
        },
        {
            id: 2,
            title: "Deep-Dive Analytics",
            description: "Transform raw results into actionable insights. Get comprehensive reports on student performance, question difficulty levels, and time-management patterns through interactive charts.",
            icon: <FaChartLine className="text-6xl text-emerald-400" />,
            accentColor: "from-emerald-500/20 to-teal-500/20",
            borderColor: "border-emerald-500/30"
        },
        {
            id: 3,
            title: "Identity Verification",
            description: "Ensure the right candidate is taking the exam. Secure multi-factor authentication and real-time photo verification keep your certification process trustworthy and robust.",
            icon: <FaUserCheck className="text-6xl text-purple-400" />,
            accentColor: "from-purple-500/20 to-fuchsia-500/20",
            borderColor: "border-purple-500/30"
        }
    ];

    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#0f172a]">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Why Choose <span className="text-blue-500 italic">Examino?</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto italic">
                        The ultimate ecosystem for secure and intelligent digital assessments.
                    </p>
                </div>

                {/* Feature Cards Loop */}
                {examFeatures.map((feature) => (
                    <div
                        key={feature.id}
                        className={`group bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border ${feature.borderColor} flex flex-col md:flex-row items-center gap-10 md:gap-16 hover:bg-white/[0.08] transition-all duration-500 relative overflow-hidden`}
                    >
                        {/* Background Accent Glow */}
                        <div className={`absolute top-0 left-0 w-64 h-64 bg-gradient-to-br ${feature.accentColor} blur-[80px] -z-10 opacity-50`}></div>

                        {/* Icon/Visual - Left Side */}
                        <div className="flex-shrink-0 w-full md:w-1/4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl">
                                {feature.icon}
                            </div>
                        </div>

                        {/* Text Container - Right Side */}
                        <div className="md:border-l-2 border-dashed border-white/10 md:pl-16 flex-grow space-y-4 text-center md:text-left">
                            <h3 className="text-3xl font-black text-white tracking-tight italic">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 font-medium">
                                {feature.description}
                            </p>

                            {/* Decorative Elements */}
                            <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                                <span className="h-1 w-12 bg-blue-500 rounded-full"></span>
                                <span className="text-[10px] uppercase font-black text-gray-500 tracking-[0.3em]">Examino Core</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExaminoFeatures;