import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import TeacherDashboard from "./teacherDashboard/TeacherDashboard";
import StudentDashboard from "./StudentDashboard/StudentDashboard";
import axios from "axios"; // axios ইনস্টল করা থাকতে হবে

const Dashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        // যখন ইউজার থাকবে তখন ব্যাকএন্ড থেকে ডাটা আনবে
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

    // ১. অথেন্টিকেশন বা রোলের ডাটা লোড হওয়ার সময় স্পিনার
    if (authLoading || roleLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <span className="loading loading-infinity loading-lg text-indigo-600"></span>
            </div>
        );
    }

    // ২. রোল অনুযায়ী কন্ডিশনাল রেন্ডারিং
    if (role === "teacher") {
        return <TeacherDashboard />;
    }

    if (role === "admin") {
        return <div className="p-10 text-2xl font-bold">Welcome, Admin!</div>;
    }

    // ৩. ডিফল্টভাবে স্টুডেন্ট ড্যাশবোর্ড
    return <StudentDashboard />;
};

export default Dashboard;