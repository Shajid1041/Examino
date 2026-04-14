import React from 'react';

const Banner = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden">
            {/* Background Glows (সফ্ট কালার ব্লার) */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">

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
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                        <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                            Watch Demo
                        </button>
                    </div>

                    
                </div>

                {/* Right Side: Visual Mockup */}
                <div className="relative group">
                    {/* Main Card (Floating Effect) */}
                    <div className="relative z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="bg-gradient-to-br from-white/10 to-white/5 p-2 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl">
                            <div className="bg-[#1e293b] rounded-xl overflow-hidden aspect-video border border-white/10">
                                {/* এখানে আপনার আসল স্ক্রিনশটটি দিন */}
                                <div className="w-full h-full flex items-center justify-center text-gray-500 italic">
                                    [ Interactive Dashboard Preview ]
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Abstract Elements (ডেকোরেশন) */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>

                    {/* Small Floating Stats Card */}
                    <div className="absolute -bottom-4 -right-4 md:right-0 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl z-30 shadow-xl hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                                ✓
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">Security Active</p>
                                <p className="text-gray-400 text-xs">AI Proctoring Enabled</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Banner;