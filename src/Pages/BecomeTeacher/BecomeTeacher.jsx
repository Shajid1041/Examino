import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

import { FaGraduationCap, FaBriefcase, FaBook, FaArrowRight } from 'react-icons/fa';

const BecomeTeacher = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleApply = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ব্যাকএন্ডে রোল আপডেট করার রিকোয়েস্ট
            const res = await axios.patch(`http://localhost:5000/users/teacher/${user?.email}`);

            if (res.data.modifiedCount > 0) {
                toast.success('Congratulations! You are now a Teacher.');
                navigate('/dashboard'); // বা আপনার কাঙ্ক্ষিত পেজ
            } else {
                toast.error('You are already a teacher or something went wrong.');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-12 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-2xl relative z-10">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">

                    <div className="text-center space-y-4 mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 mb-2">
                            <FaGraduationCap className="text-emerald-400 text-4xl" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-white tracking-tight">
                            Become an <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Instructor</span>
                        </h2>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Share your knowledge with the world. Apply today to start creating exams and managing students.
                        </p>
                    </div>

                    <form onSubmit={handleApply} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm ml-1">Full Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    defaultValue={user?.displayName}
                                    readOnly
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-gray-400 cursor-not-allowed outline-none"
                                />
                            </div>
                        </div>

                        {/* Email (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm ml-1">Email Address</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                readOnly
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-gray-400 cursor-not-allowed outline-none"
                            />
                        </div>

                        {/* Experience */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-gray-300 text-sm ml-1 font-medium">Teaching Experience</label>
                            <div className="relative group">
                                <FaBriefcase className="absolute top-5 left-5 text-emerald-400/50" />
                                <select required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all appearance-none">
                                    <option className="bg-[#1e293b]" value="">Select Experience</option>
                                    <option className="bg-[#1e293b]" value="beginner">Beginner (0-1 years)</option>
                                    <option className="bg-[#1e293b]" value="intermediate">Intermediate (1-3 years)</option>
                                    <option className="bg-[#1e293b]" value="experienced">Experienced (3+ years)</option>
                                </select>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-gray-300 text-sm ml-1 font-medium">Subject Category</label>
                            <div className="relative group">
                                <FaBook className="absolute top-5 left-5 text-emerald-400/50" />
                                <input
                                    type="text"
                                    placeholder="e.g. Web Development, Mathematics, Science"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.01] active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? "Processing..." : "Submit Application"}
                                    {!loading && <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BecomeTeacher;