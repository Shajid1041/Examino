import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { FaPlus, FaTrash, FaLock, FaIdBadge, FaTags } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CreateQuiz = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState(''); // নতুন ক্যাটাগরি স্টেট
    const [quizId, setQuizId] = useState('');
    const [quizPassword, setQuizPassword] = useState('');

    const [questions, setQuestions] = useState([
        { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        if (field === 'questionText') {
            updatedQuestions[index].questionText = value;
        } else {
            updatedQuestions[index].options[field] = value;
        }
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const quizData = {
            teacherEmail: user?.email,
            teacherName: user?.displayName,
            title,
            category, // ডাটাবেসে পাঠানোর জন্য ক্যাটাগরি
            quizId,
            quizPassword,
            duration,
            totalMarks: questions.length * 5,
            questions,
            createdAt: new Date()
        };

        try {
            const res = await axios.post('http://localhost:5000/quizzes', quizData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Quiz Published!',
                    text: `Category: ${category} | ID: ${quizId}`,
                    icon: 'success',
                    background: '#1e293b',
                    color: '#fff',
                    confirmButtonColor: '#2563eb'
                });
                // ফর্ম রিসেট
                setTitle(''); setDuration(''); setCategory(''); setQuizId(''); setQuizPassword('');
                setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to publish quiz', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl mb-10">
            <div className="mb-8 text-center md:text-left">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 italic">Create New Contest</h2>
                <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-medium">Configure your exam settings below</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info & Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 md:col-span-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 flex items-center gap-2">
                            <FaTags className="text-blue-400" /> Category
                        </label>
                        <select
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none text-white transition-all appearance-none"
                        >
                            <option value="" className="bg-slate-900">Select Category</option>
                            <option value="Programming" className="bg-slate-900">Programming</option>
                            <option value="Mathematics" className="bg-slate-900">Mathematics</option>
                            <option value="General Knowledge" className="bg-slate-900">General Knowledge</option>
                            <option value="Science" className="bg-slate-900">Science</option>
                            <option value="English" className="bg-slate-900">English</option>
                        </select>
                    </div>

                    <div className="space-y-2 md:col-span-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Quiz Title</label>
                        <input
                            type="text" placeholder="e.g. Midterm Exam" required
                            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none text-white transition-all"
                            onChange={(e) => setTitle(e.target.value)} value={title}
                        />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Duration (Mins)</label>
                        <input
                            type="number" placeholder="e.g. 30" required
                            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none text-white transition-all"
                            onChange={(e) => setDuration(e.target.value)} value={duration}
                        />
                    </div>
                </div>

                {/* Credentials Section (ID & Pass) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-blue-400 uppercase flex items-center gap-2 ml-1 tracking-widest">
                            <FaIdBadge /> Contest ID
                        </label>
                        <input
                            type="text" placeholder="e.g. CSE101-FALL" required
                            className="w-full bg-white/10 border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none text-white transition-all font-mono"
                            onChange={(e) => setQuizId(e.target.value)} value={quizId}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-2 ml-1 tracking-widest">
                            <FaLock /> Access Password
                        </label>
                        <input
                            type="password" placeholder="Set exam password" required
                            className="w-full bg-white/10 border border-white/10 p-3 rounded-xl focus:border-emerald-500 outline-none text-white transition-all"
                            onChange={(e) => setQuizPassword(e.target.value)} value={quizPassword}
                        />
                    </div>
                </div>

                {/* Questions Section */}
                <div className="space-y-6 mt-10">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h3 className="text-xl font-bold text-white italic">Questions Pool</h3>
                        <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full text-gray-400 font-bold uppercase">Marks per Q: 5</span>
                    </div>

                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 space-y-4 hover:border-white/10 transition-all">
                            <div className="flex justify-between items-center">
                                <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-tighter border border-blue-500/20">
                                    Question {qIndex + 1}
                                </span>
                                {questions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setQuestions(questions.filter((_, i) => i !== qIndex))}
                                        className="text-red-400/50 p-2 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                )}
                            </div>
                            <input
                                type="text" placeholder="Write your question here..." required
                                className="w-full bg-transparent border-b border-white/10 p-3 outline-none text-white text-lg font-medium focus:border-blue-500 transition-all placeholder:text-gray-700"
                                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                                value={q.questionText}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                {q.options.map((opt, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-[10px] font-black text-gray-500 group-focus-within:bg-blue-500/20 group-focus-within:text-blue-400 transition-all">
                                            {String.fromCharCode(65 + optIndex)}
                                        </div>
                                        <input
                                            type="text" placeholder={`Option ${optIndex + 1}`} required
                                            className="flex-1 bg-white/5 border border-white/5 p-3 rounded-xl outline-none text-white text-sm focus:bg-white/10 focus:border-white/20 transition-all"
                                            onChange={(e) => handleQuestionChange(qIndex, optIndex, e.target.value)}
                                            value={opt}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col md:flex-row gap-4 pt-8">
                    <button
                        type="button" onClick={addQuestion}
                        className="flex-1 py-4 bg-white/5 text-gray-300 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <FaPlus /> Add Another Question
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all transform active:scale-95 shadow-xl"
                    >
                        Publish Contest Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuiz;