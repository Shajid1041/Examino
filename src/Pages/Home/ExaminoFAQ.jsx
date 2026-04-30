import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { LuArrowUpRight } from "react-icons/lu";

const ExaminoFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqData = [
        {
            question: "How does the AI-Proctoring system work?",
            answer: "Examino uses advanced machine learning algorithms to monitor candidate behavior via webcam and screen-share. It detects suspicious activities, unauthorized tab switching, and multiple faces to ensure 100% exam integrity."
        },
        {
            question: "What happens if my internet disconnects during an exam?",
            answer: "Don't worry! Examino has an auto-save feature that stores your progress locally. Once your connection is restored, you can resume exactly where you left off without losing any data."
        },
        {
            question: "Are the exam results generated instantly?",
            answer: "Yes, for objective-type questions (MCQs), results and detailed analytics are generated immediately after submission. For subjective questions, educators can review and publish results manually."
        },
        {
            question: "Is my personal data and identity secure?",
            answer: "Security is our top priority. We use end-to-end encryption for all data transmissions and multi-factor authentication to ensure that only authorized candidates can access the exam hall."
        },
        {
            question: "Can Examino handle a large number of students at once?",
            answer: "Absolutely. Our cloud infrastructure is built to scale, supporting thousands of concurrent participants simultaneously without any lag or downtime."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id='faq' className="py-24 bg-[#0f172a] relative overflow-hidden px-4">
            {/* Background Accent */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-white italic">
                        Got <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Questions?</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium">
                        Everything you need to know about Examino's secure assessment environment and smart features.
                    </p>
                </div>

                {/* Accordion Container */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`rounded-3xl transition-all duration-500 border overflow-hidden ${activeIndex === index
                                ? 'bg-white/10 border-blue-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                                : 'bg-white/[0.03] border-white/10 hover:border-white/20 shadow-sm'
                                }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                            >
                                <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${activeIndex === index ? 'text-blue-400' : 'text-gray-300'
                                    }`}>
                                    {item.question}
                                </span>
                                <div className={`p-2 rounded-xl transition-all duration-300 ${activeIndex === index ? 'bg-blue-500 text-white rotate-180' : 'bg-white/5 text-gray-500'}`}>
                                    <FiChevronDown className="text-xl" />
                                </div>
                            </button>

                            {/* Answer Section */}
                            <div className={`transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <div className="px-8 pb-8 text-gray-400 leading-relaxed text-base md:text-lg font-medium border-t border-white/5 pt-6">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Button */}
                <div className="mt-16 flex justify-center">
                    <button className="group flex items-center gap-1">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black italic py-4 px-10 rounded-2xl group-hover:scale-105 transition-all shadow-xl shadow-blue-500/20">
                            Explore Full Documentation
                        </div>
                        <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all">
                            <LuArrowUpRight className="text-2xl" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ExaminoFAQ;