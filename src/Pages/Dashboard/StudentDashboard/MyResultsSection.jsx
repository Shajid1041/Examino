import React from 'react';
import { FaTrophy, FaLayerGroup } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MyResultsSection = () => {
    // ডাটাগুলো চাইলে ভবিষ্যতে প্রপস হিসেবেও নিতে পারেন
    const stats = [
        {
            title: "Total Points",
            value: "2,450",
            icon: <FaTrophy />,
            colorClass: "from-blue-600/20",
            textColor: "text-blue-400"
        },
        {
            title: "Exams Taken",
            value: "18",
            icon: <FaLayerGroup />,
            colorClass: "from-emerald-600/20",
            textColor: "text-emerald-400"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${stat.colorClass} to-transparent p-8 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-all`}
                >
                    {/* Background Decorative Icon */}
                    <div className={`absolute -right-4 -bottom-4 text-8xl opacity-5 transition-transform group-hover:scale-110 duration-500 ${stat.textColor}`}>
                        {stat.icon}
                    </div>

                    <div className="flex flex-col justify-between h-full relative z-10">
                        <div className="flex items-center gap-3">
                            <span className={`text-xl ${stat.textColor}`}>
                                {stat.icon}
                            </span>
                            <h4 className={`${stat.textColor} font-bold tracking-wide uppercase text-sm`}>
                                {stat.title}
                            </h4>
                        </div>

                        <div className="mt-6">
                            <p className="text-6xl font-black text-white tracking-tighter">
                                {stat.value}
                            </p>
                            <div className={`h-1 w-12 mt-4 rounded-full bg-gradient-to-r ${stat.textColor === 'text-blue-400' ? 'from-blue-500' : 'from-emerald-500'} to-transparent`} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default MyResultsSection;