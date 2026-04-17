import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { FaTrash, FaEye, FaCopy, FaIdBadge, FaLock, FaTags } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyQuizzes = () => {
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQuizzes = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/my-quizzes/${user?.email}`);
            setQuizzes(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchQuizzes();
    }, [user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            background: '#1e293b',
            color: '#fff',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`http://localhost:5000/quizzes/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({ title: 'Deleted!', icon: 'success', background: '#1e293b', color: '#fff' });
                    setQuizzes(quizzes.filter(q => q._id !== id));
                }
            }
        });
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `${type} copied!`,
            showConfirmButton: false,
            timer: 1500,
            background: '#1e293b',
            color: '#fff'
        });
    };

    if (loading) return <div className="text-center py-20 text-blue-400 font-bold animate-pulse">Loading your contests...</div>;

    return (
        <div className="bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden animate-in fade-in duration-700">
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div>
                    <h3 className="text-2xl font-black text-white italic tracking-tight">Your Published Contests</h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Manage and monitor your quizzes</p>
                </div>
                <span className="bg-blue-600/20 text-blue-400 px-5 py-2 rounded-2xl text-xs font-black border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                    TOTAL: {quizzes.length}
                </span>
            </div>

            <div className="p-6 overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                            <th className="pb-4 px-6">Contest Details</th>
                            <th className="pb-4 px-4 text-center">Category</th> {/* ক্যাটাগরি কলাম */}
                            <th className="pb-4 px-4">Credentials</th>
                            <th className="pb-4 px-4">Stats</th>
                            <th className="pb-4 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {quizzes.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-20 text-center text-gray-500 font-medium italic">
                                    No quizzes created yet. Start by creating one!
                                </td>
                            </tr>
                        ) : (
                            quizzes.map((quiz) => (
                                <tr key={quiz._id} className="group bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                                    {/* Title & Date */}
                                    <td className="py-5 px-6 rounded-l-2xl border-y border-l border-white/5">
                                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{quiz.title}</p>
                                        <p className="text-[9px] text-gray-500 mt-1 font-mono">
                                            ID: {quiz._id.slice(-8).toUpperCase()}
                                        </p>
                                    </td>

                                    {/* Category Section */}
                                    <td className="py-5 px-4 text-center border-y border-white/5">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                            <FaTags className="text-[8px]" />
                                            {quiz.category || "General"}
                                        </span>
                                    </td>

                                    {/* Credentials */}
                                    <td className="py-5 px-4 border-y border-white/5">
                                        <div className="flex flex-col gap-1.5">
                                            <div
                                                onClick={() => copyToClipboard(quiz.quizId, 'Quiz ID')}
                                                className="flex items-center gap-2 text-[10px] bg-black/20 p-1.5 px-2 rounded-lg border border-white/5 cursor-pointer hover:border-blue-500/50 transition-all"
                                            >
                                                <FaIdBadge className="text-blue-400" />
                                                <span className="font-mono text-gray-400">{quiz.quizId}</span>
                                            </div>
                                            <div
                                                onClick={() => copyToClipboard(quiz.quizPassword, 'Password')}
                                                className="flex items-center gap-2 text-[10px] bg-black/20 p-1.5 px-2 rounded-lg border border-white/5 cursor-pointer hover:border-emerald-500/50 transition-all"
                                            >
                                                <FaLock className="text-emerald-400" />
                                                <span className="font-mono text-gray-400">••••••</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Questions & Duration */}
                                    <td className="py-5 px-4 border-y border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-white">{quiz.questions?.length} Qs</span>
                                            <span className="text-[10px] text-gray-500 font-bold italic">{quiz.duration} Mins</span>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-5 px-6 text-right rounded-r-2xl border-y border-r border-white/5">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                                                <FaEye size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(quiz._id)}
                                                className="p-3 bg-white/5 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-95"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyQuizzes;