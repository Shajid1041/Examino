import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router"; 
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import TeacherDashboard from "./teacherDashboard/TeacherDashboard";
import StudentDashboard from "./StudentDashboard/StudentDashboard";
import StudentSidebar from "./StudentDashboard/StudentSidebar";
import TeacherSidebar from "./teacherDashboard/TeacherSidebar";

const Dashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);
    const location = useLocation(); 

    useEffect(() => {
        
        if (user?.email) {
            axios.get(`http://localhost:5000/users/${user.email}`)
                .then(res => {
                    setRole(res.data?.role);
                    setRoleLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching role:", err);
                    setRoleLoading(false);
                });
        }
    }, [user?.email]);

    
    if (authLoading || roleLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-[#0f172a]'>
                <span className="loading loading-infinity loading-lg text-indigo-600"></span>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#0f172a] text-white">
            
            <aside className="w-64 bg-white/5 border-r border-white/10 hidden md:block">
                <Link to="/" className="flex items-center gap-2 p-4 m-2">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-[#1f2937] font-bold">✓</span>
                                    </div>
                                    <span className="text-xl font-bold tracking-tight">examino</span>
                                </Link>
                {role === "teacher" ? <TeacherSidebar /> : <StudentSidebar />}
            </aside>

            {/* ২. ডানপাশে মেইন কন্টেন্ট এরিয়া */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-6">
                    
                    {location.pathname === "/dashboard" || location.pathname === "/dashboard/" ? (
                        <>
                            {role === "teacher" && <TeacherDashboard />}
                            {role === "student" && <StudentDashboard />}
                        </>
                    ) : (
                        <Outlet />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;