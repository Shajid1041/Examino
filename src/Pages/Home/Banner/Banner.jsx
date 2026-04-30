import React from 'react';

const Banner = () => {
    return (
        <section className="relative min-h-screen py-4 flex items-center justify-center bg-[#0f172a] overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px]"></div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Side: Content */}
                <div className="space-y-8 text-center lg:text-left">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium">
                        ✨ Trusted by 10,000+ Educators
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                        Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Exam Experience</span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Create, secure, and evaluate exams with unparalleled ease. A seamless platform designed for the future of digital education.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                        <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            Start Free Trial
                        </button>
                        <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* Right Side: Regularity Comparison Chart */}
                <div className="relative">
                    <div className="relative z-20 bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-white font-bold text-xl tracking-tight">Consistency Analysis</h3>
                                <p className="text-gray-500 text-sm">Monthly participation metrics</p>
                            </div>
                            <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2 py-1 rounded-md border border-emerald-500/20 uppercase tracking-widest">
                                High Accuracy
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-10">
                            {/* Regular Students (55%) */}
                            <div className="group">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">Regular</span>
                                </div>
                                <div className="grid grid-cols-8 gap-1.5">
                                    {[...Array(64)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`aspect-square rounded-[2px] transition-all duration-700 ${i < 35 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-white/5'}`}
                                            style={{ transitionDelay: `${i * 5}ms` }}
                                        ></div>
                                    ))}
                                </div>
                                <div className="mt-5">
                                    <div className="text-4xl font-black text-white italic">55<span className="text-blue-500">%</span></div>
                                    <p className="text-gray-500 text-[10px] font-medium mt-1 uppercase">Consistent Learners</p>
                                </div>
                            </div>

                            {/* Occasional Students (35%) */}
                            <div className="group">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">Occasional</span>
                                </div>
                                <div className="grid grid-cols-8 gap-1.5">
                                    {[...Array(64)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`aspect-square rounded-[2px] transition-all duration-700 ${i < 22 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-white/5'}`}
                                            style={{ transitionDelay: `${i * 5}ms` }}
                                        ></div>
                                    ))}
                                </div>
                                <div className="mt-5">
                                    <div className="text-4xl font-black text-white italic">35<span className="text-emerald-500">%</span></div>
                                    <p className="text-gray-500 text-[10px] font-medium mt-1 uppercase">Irregular Participation</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Overlay Info */}
                        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#0f172a] bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-500 to-indigo-600' : 'from-emerald-400 to-teal-600'}`}></div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-white/10 flex items-center justify-center text-[10px] text-white font-bold">+2k</div>
                            </div>
                            <p className="text-gray-400 text-xs italic">Updated 2 mins ago</p>
                        </div>
                    </div>

                    {/* Background Decorative Circles */}
                    <div className="absolute -top-12 -left-12 w-24 h-24 border border-white/10 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </section>
    );
};

export default Banner;