import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { FaUserEdit, FaEnvelope, FaIdBadge, FaAward, FaCalendarCheck, FaShieldAlt } from 'react-icons/fa';

const UserProfile = () => {
    const { user: authUser } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authUser?.email) {
            axios.get(`http://localhost:5000/user-profile-stats/${authUser.email}`)
                .then(res => {
                    setProfileData(res.data);
                    
                    setLoading(false);
                });
        }
    }, [authUser]);

    if (loading) return <div className="text-center text-blue-500 p-20">Loading Profile...</div>;

    const { user, stats } = profileData;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* --- Header Area --- */}
            <div className="relative group">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="relative">
                        <img
                            src={user?.image || "https://i.ibb.co/photo.jpg"}
                            alt="Profile"
                            className="w-32 h-32 rounded-2xl object-cover border-4 border-emerald-500/30"
                        />
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-black text-white tracking-tight">
                            {user?.name || user?.displayName}
                        </h1>
                        <p className="text-emerald-400 font-medium flex items-center justify-center md:justify-start gap-2 mt-2 uppercase tracking-tighter">
                            <FaShieldAlt /> Role: {user?.role || 'Student'}
                        </p>
                        <div className="flex gap-3 mt-5 justify-center md:justify-start">
                            <span className="px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-400 uppercase">
                                {user?.role === 'teacher' ? 'Certified Instructor' : 'Active Learner'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Info Cards Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Details */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <FaIdBadge className="text-blue-400" /> Personal Details
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                            <span className="text-gray-400 text-sm">Email</span>
                            <span className="text-white font-semibold">{user?.email}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                            <span className="text-gray-400 text-sm">Status</span>
                            <span className="text-emerald-400 font-bold uppercase text-xs">{user?.status || 'Verified'}</span>
                        </div>
                    </div>
                </div>

                {/* Achievements Card (Dynamic) */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <FaAward className="text-emerald-400" /> {user?.role === 'teacher' ? 'Teaching Stats' : 'Learning Stats'}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center">
                            <p className="text-emerald-400 text-[10px] font-bold uppercase">{stats.mainLabel}</p>
                            <p className="text-3xl font-black text-white mt-1">{stats.mainValue}</p>
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center">
                            <p className="text-blue-400 text-[10px] font-bold uppercase">{stats.subLabel}</p>
                            <p className="text-3xl font-black text-white mt-1">{stats.subValue}</p>
                        </div>
                        {user?.role !== 'teacher' && (
                            <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-center col-span-2">
                                <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Global Rank</p>
                                <p className="text-2xl font-black text-white">{stats.rank}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;