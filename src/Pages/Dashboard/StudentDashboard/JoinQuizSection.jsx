import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaSignInAlt } from 'react-icons/fa';

export const JoinQuizSection = () => {
    const [quizIdInput, setQuizIdInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleJoinQuiz = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ব্যাকএন্ডে আইডি এবং পাসওয়ার্ড পাঠানো হচ্ছে চেক করার জন্য
            const res = await axios.post('http://localhost:5000/validate-quiz', {
                quizId: quizIdInput,
                quizPassword: passwordInput
            });
            
            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Access Granted!',
                    text: 'Entry to Exam Hall allowed.',
                    background: '#0f172a',
                    color: '#fff',
                    showConfirmButton: false,
                    timer: 1500
                });

                // ডাটাবেস থেকে আসা কুইজের মেইন _id ব্যবহার করে নেভিগেট করা
                console.log(res.data.id);
                navigate(`/dashboard/exam-hall/${res.data.id}`);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Access',
                text: error.response?.data?.message || 'Wrong ID or Password!',
                background: '#0f172a',
                color: '#fff'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border border-emerald-500/30">
                    <FaSignInAlt />
                </div>
                <h2 className="text-2xl font-bold">Enter Contest</h2>
                <p className="text-gray-400 text-sm mt-1">Access your private quiz with credentials</p>
            </div>

            <form onSubmit={handleJoinQuiz} className="space-y-4">
                <input
                    type="text"
                    placeholder="Contest ID"
                    required
                    value={quizIdInput}
                    onChange={(e) => setQuizIdInput(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500 text-white transition-all"
                />
                <input
                    type="password"
                    placeholder="Access Password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500 text-white transition-all"
                />
                <button
                    disabled={loading}
                    className={`w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-[1.02] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Validating...' : 'Start Quiz Now'}
                </button>
            </form>
        </div>
    );
};