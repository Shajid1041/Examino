import React from 'react';

import useAuth from '../../../hooks/useAuth';
import { FaUserEdit, FaEnvelope, FaIdBadge, FaAward, FaCalendarCheck, FaShieldAlt } from 'react-icons/fa';

const UserProfile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* --- Header / Cover Area --- */}
            <div className="relative group">
                <div className="h-40 w-full bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-emerald-600/30 rounded-3xl blur-xl absolute -z-10 opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    {/* Profile Image */}
                    <div className="relative">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/photo.jpg"}
                            alt="Profile"
                            className="w-32 h-32 rounded-2xl object-cover border-4 border-emerald-500/30 shadow-2xl shadow-emerald-500/10"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-lg text-white shadow-lg">
                            <FaUserEdit className="text-sm cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                    </div>

                    {/* Name & Title */}
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-black text-white tracking-tight italic">
                            {user?.displayName || "Scholar Name"}
                        </h1>
                        <p className="text-emerald-400 font-medium flex items-center justify-center md:justify-start gap-2 mt-2">
                            <FaIdBadge /> Student ID: #EXP-2026-001
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
                            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-300 uppercase tracking-widest">Level 12</span>
                            <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-400 uppercase tracking-widest">Top 5%</span>
                        </div>
                    </div>

                    <button className="px-6 py-3 bg-white text-[#0f172a] font-bold rounded-2xl hover:bg-emerald-400 hover:text-white transition-all shadow-xl active:scale-95">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* --- Info Cards Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Details */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <FaShieldAlt className="text-blue-400" /> Account Information
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                            <span className="text-gray-400 text-sm">Full Name</span>
                            <span className="text-white font-semibold">{user?.displayName}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                            <span className="text-gray-400 text-sm flex items-center gap-2">
                                <FaEnvelope className="text-xs" /> Email Address
                            </span>
                            <span className="text-white font-semibold">{user?.email}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                            <span className="text-gray-400 text-sm flex items-center gap-2">
                                <FaCalendarCheck className="text-xs" /> Joined Date
                            </span>
                            <span className="text-white font-semibold">April 2026</span>
                        </div>
                    </div>
                </div>

                {/* Achievements Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 bg-emerald-500/10 blur-[60px] rounded-full"></div>
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <FaAward className="text-emerald-400" /> Academic Achievements
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center">
                            <p className="text-emerald-400 text-xs font-bold uppercase">Rank</p>
                            <p className="text-3xl font-black text-white mt-1">#12</p>
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center">
                            <p className="text-blue-400 text-xs font-bold uppercase">Total Points</p>
                            <p className="text-3xl font-black text-white mt-1">2,450</p>
                        </div>
                        <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-center col-span-2">
                            <p className="text-purple-400 text-xs font-bold uppercase">Badges Earned</p>
                            <div className="flex justify-center gap-2 mt-2">
                                <span title="Fast Learner">🚀</span>
                                <span title="Top Scorer">🏆</span>
                                <span title="Consistent">🔥</span>
                                <span title="Problem Solver">🧠</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;