import React, { useState, useEffect } from 'react';
import { LuQuote, LuChevronLeft, LuChevronRight } from "react-icons/lu";

const ExaminoReviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const reviews = [
        {
            id: 1,
            name: "Zayan Ahmed",
            role: "Academic Coordinator",
            text: "Examino has completely transformed how we conduct monthly mocks. The AI proctoring is incredibly accurate, and the automated grading saves our teachers hours of manual work.",
            initials: "ZA",
            color: "from-blue-500 to-indigo-600"
        },
        {
            id: 2,
            name: "Sarah Kabir",
            role: "University Student",
            text: "I love the clean interface. Even with a slow internet connection, I could finish my finals without any lag. The instant result analysis helped me identify my weak spots immediately.",
            initials: "SK",
            color: "from-emerald-400 to-teal-600"
        },
        {
            id: 3,
            name: "Tanvir Rahman",
            role: "Corporate Trainer",
            text: "For professional certifications, security is everything. Examino's multi-factor verification gives us the confidence that the results are authentic and untampered.",
            initials: "TR",
            color: "from-purple-500 to-fuchsia-600"
        }
    ];

    // অটো স্লাইড হওয়ার জন্য (Optional)
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    return (
        <section className="py-24 bg-[#0f172a] relative overflow-hidden px-6">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full"></div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
                        User <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Testimonials</span>
                    </h2>
                    <p className="text-gray-500 font-medium">Real stories from real users of Examino.</p>
                </div>

                {/* Main Review Card Container */}
                <div className="relative min-h-[400px] flex items-center justify-center">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${index === currentIndex
                                    ? "opacity-100 translate-x-0 scale-100 z-20"
                                    : index < currentIndex
                                        ? "opacity-0 -translate-x-full scale-90 z-10"
                                        : "opacity-0 translate-x-full scale-90 z-10"
                                }`}
                        >
                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col items-center text-center group">
                                <div className="mb-8 p-4 bg-blue-500/10 rounded-2xl">
                                    <LuQuote className="text-4xl text-blue-400 opacity-50" />
                                </div>

                                <p className="text-gray-300 text-xl md:text-2xl leading-relaxed italic mb-10 font-medium">
                                    "{review.text}"
                                </p>

                                <div className="flex flex-col items-center gap-4">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${review.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                                        {review.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{review.name}</h4>
                                        <p className="text-blue-400 text-xs font-black uppercase tracking-widest mt-1">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Controls */}
                <div className="flex items-center justify-center gap-6 mt-12">
                    <button
                        onClick={prevSlide}
                        className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
                    >
                        <LuChevronLeft size={24} />
                    </button>

                    {/* Indicators */}
                    <div className="flex gap-3">
                        {reviews.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${i === currentIndex ? "w-10 bg-blue-500" : "w-2 bg-white/20"}`}
                            ></div>
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
                    >
                        <LuChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ExaminoReviews;