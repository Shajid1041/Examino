import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { FaTrash, FaEye, FaCopy, FaIdBadge, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyQuizzes = () => {
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    // ডাটা ফেচ করার ফাংশন
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

    // ডিলিট হ্যান্ডলার
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            background: '#1e293b',
            color: '#fff',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
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

    // আইডি বা পাসওয়ার্ড কপি করার জন্য
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

    if (loading) return <div className="text-center py-20 text-blue-400">Loading your contests...</div>;

    return (
        <div className="bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-bold text-white">Your Published Contests</h3>
                <span className="bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-sm font-medium border border-blue-500/20">
                    Total: {quizzes.length}
                </span>
            </div>

            <div className="p-6 overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-white/5">
                            <th className="pb-4 px-4 font-semibold">Contest Details</th>
                            <th className="pb-4 px-4 font-semibold">Credentials</th>
                            <th className="pb-4 px-4 font-semibold">Questions</th>
                            <th className="pb-4 px-4 font-semibold">Duration</th>
                            <th className="pb-4 px-4 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300 divide-y divide-white/5">
                        {quizzes.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-10 text-center text-gray-500 italic">No quizzes created yet.</td>
                            </tr>
                        ) : (
                            quizzes.map((quiz) => (
                                <tr key={quiz._id} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-5 px-4">
                                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{quiz.title}</p>
                                        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">
                                            Created: {new Date(quiz.createdAt).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="py-5 px-4 space-y-2">
                                        <div
                                            onClick={() => copyToClipboard(quiz.quizId, 'ID')}
                                            className="flex items-center gap-2 text-xs bg-white/5 p-1 px-2 rounded border border-white/5 cursor-pointer hover:border-blue-500/50"
                                        >
                                            <FaIdBadge className="text-blue-400" /> <span className="font-mono">{quiz.quizId}</span>
                                            <FaCopy className="ml-auto opacity-0 group-hover:opacity-100 text-[10px]" />
                                        </div>
                                        <div
                                            onClick={() => copyToClipboard(quiz.quizPassword, 'Password')}
                                            className="flex items-center gap-2 text-xs bg-white/5 p-1 px-2 rounded border border-white/5 cursor-pointer hover:border-emerald-500/50"
                                        >
                                            <FaLock className="text-emerald-400" /> <span className="font-mono">••••••</span>
                                            <FaCopy className="ml-auto opacity-0 group-hover:opacity-100 text-[10px]" />
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <span className="text-sm font-semibold">{quiz.questions?.length} Qs</span>
                                        <p className="text-[10px] text-gray-500">{quiz.totalMarks} Marks</p>
                                    </td>
                                    <td className="py-5 px-4">
                                        <span className="px-2 py-1 bg-white/5 rounded-lg text-xs">{quiz.duration} Mins</span>
                                    </td>
                                    <td className="py-5 px-4 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(quiz._id)}
                                                className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                <FaTrash />
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