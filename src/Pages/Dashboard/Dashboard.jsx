import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router"; // useLocation যোগ করা হয়েছে
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
    const location = useLocation(); // বর্তমান পাথ চেক করার জন্য

    useEffect(() => {
        // এই অংশটিই হলো সেই "বাকি কোড" যা ইউজারের রোল নিয়ে আসে
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

    // লোডিং স্পিনার (যতক্ষণ ডাটা না আসে)
    if (authLoading || roleLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-[#0f172a]'>
                <span className="loading loading-infinity loading-lg text-indigo-600"></span>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#0f172a] text-white">
            {/* ১. বামপাশে ফিক্সড সাইডবার (রোল অনুযায়ী) */}
            <aside className="w-64 bg-white/5 border-r border-white/10 hidden md:block">
                <div className="p-6 text-2xl font-bold text-indigo-500 border-b border-white/10">
                    Examino
                </div>
                {role === "teacher" ? <TeacherSidebar /> : <StudentSidebar />}
            </aside>

            {/* ২. ডানপাশে মেইন কন্টেন্ট এরিয়া */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-6">
                    {/* কন্ডিশনাল লজিক: 
                        যদি ইউআরএল শুধু "/dashboard" হয়, তবে মেইন ড্যাশবোর্ড দেখাবে।
                        আর যদি অন্য কোনো লিংকে (যেমন Exam Hall) থাকে, তবে Outlet ডাটা দেখাবে।
                    */}
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