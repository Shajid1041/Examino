import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { FaDatabase, FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const QuestionBank = () => {
    const { user } = useAuth();
    const [savedQuestions, setSavedQuestions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0, // ডিফল্ট প্রথম অপশন
        subject: '',
        difficulty: 'Medium'
    });

    useEffect(() => {
        if (user?.email) fetchBank();
    }, [user?.email]);

    const fetchBank = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/question-bank/${user?.email}`);
            setSavedQuestions(res.data);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const newQuestion = {
            ...formData,
            teacherEmail: user?.email,
            createdAt: new Date()
        };

        try {
            const res = await axios.post('http://localhost:5000/question-bank', newQuestion);
            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Saved to Bank!',
                    icon: 'success',
                    background: '#0f172a',
                    color: '#fff',
                    confirmButtonColor: '#10b981'
                });
                setShowForm(false);
                fetchBank();
                // ফর্ম রিসেট
                setFormData({ questionText: '', options: ['', '', '', ''], correctAnswer: 0, subject: '', difficulty: 'Medium' });
            }
        } catch (error) {
            console.error("Add Error:", error);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This question will be removed from your bank!",
            icon: 'warning',
            showCancelButton: true,
            background: '#0f172a',
            color: '#fff',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#334155',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`http://localhost:5000/question-bank/${id}`);
                if (res.data.deletedCount > 0) {
                    setSavedQuestions(savedQuestions.filter(q => q._id !== id));
                    Swal.fire({ title: 'Deleted!', icon: 'success', background: '#0f172a', color: '#fff' });
                }
            }
        });
    };

    return (
        <div className="space-y-8 animate-fadeIn pb-10 text-white">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                        <FaDatabase /> Question Bank
                    </h2>
                    <p className="text-gray-400 text-sm">Stored {savedQuestions.length} reusable questions for exams.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg ${showForm ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
                >
                    <FaPlus className={showForm ? 'rotate-45 transition-transform' : ''} />
                    {showForm ? "Cancel Adding" : "Add New Question"}
                </button>
            </div>

            {/* Form Section */}
            {showForm && (
                <form onSubmit={handleAdd} className="bg-white/5 p-8 rounded-3xl border border-emerald-500/20 backdrop-blur-xl space-y-6 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500 ml-1">Subject Name</label>
                            <input
                                type="text" placeholder="e.g. Data Structures" required
                                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-emerald-500 transition-all"
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })} value={formData.subject}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500 ml-1">Difficulty Level</label>
                            <select
                                className="w-full bg-[#1e293b] border border-white/10 p-3 rounded-xl outline-none focus:border-emerald-500 transition-all"
                                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                value={formData.difficulty}
                            >
                                <option value="Easy">🟢 Easy</option>
                                <option value="Medium">🟡 Medium</option>
                                <option value="Hard">🔴 Hard</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 ml-1">The Question</label>
                        <textarea
                            placeholder="Type your question content here..." required
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500 h-28 resize-none transition-all"
                            onChange={(e) => setFormData({ ...formData, questionText: e.target.value })} value={formData.questionText}
                        ></textarea>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase text-gray-500 ml-1 block mb-2">Options (Mark the correct one)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.options.map((opt, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
                                    <input
                                        type="radio"
                                        name="correctIdx"
                                        checked={formData.correctAnswer === i}
                                        onChange={() => setFormData({ ...formData, correctAnswer: i })}
                                        className="w-5 h-5 accent-emerald-500 cursor-pointer"
                                    />
                                    <input
                                        type="text" placeholder={`Option ${i + 1}`} required
                                        className="bg-transparent border-none outline-none w-full text-sm py-1"
                                        onChange={(e) => {
                                            const newOpts = [...formData.options];
                                            newOpts[i] = e.target.value;
                                            setFormData({ ...formData, options: newOpts });
                                        }}
                                        value={opt}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full py-4 bg-emerald-600 rounded-xl font-black text-lg hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20">
                        SAVE TO QUESTION BANK
                    </button>
                </form>
            )}

            {/* Display Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {savedQuestions.length > 0 ? (
                    savedQuestions.map((q) => (
                        <div key={q._id} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-500/20 uppercase tracking-widest">
                                        {q.subject || 'General'}
                                    </span>
                                    <span className={`px-3 py-1 text-[10px] font-black rounded-lg border uppercase tracking-widest ${q.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                            q.difficulty === 'Easy' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                        {q.difficulty}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDelete(q._id)}
                                    className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                >
                                    <FaTrash size={16} />
                                </button>
                            </div>

                            <h4 className="text-white text-lg font-semibold mb-6 leading-snug">{q.questionText}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {q.options.map((opt, i) => (
                                    <div key={i} className={`p-3 rounded-xl flex items-center justify-between text-sm ${i === parseInt(q.correctAnswer)
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold'
                                            : 'bg-white/5 text-gray-400 border border-white/5'
                                        }`}>
                                        <span className="truncate">{opt}</span>
                                        {i === parseInt(q.correctAnswer) && <FaCheckCircle className="shrink-0" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <p className="text-gray-500 italic">No questions found in your bank yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionBank;