import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { FaPlus, FaTrash, FaLock, FaIdBadge } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CreateQuiz = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');

    // নতুন যোগ করা স্টেট
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
            quizId, // ইউনিক আইডি
            quizPassword, // অ্যাক্সেস পাসওয়ার্ড
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
                    text: `ID: ${quizId} | Pass: ${quizPassword}`,
                    icon: 'success',
                    background: '#1e293b',
                    color: '#fff',
                    confirmButtonColor: '#2563eb'
                });
                // ফর্ম রিসেট
                setTitle(''); setDuration(''); setQuizId(''); setQuizPassword('');
                setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to publish quiz', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="mb-8 text-center md:text-left">
                <h2 className="text-3xl font-bold text-blue-400">Create New Contest</h2>
                <p className="text-gray-400 text-sm mt-1">Set ID and Password to restrict access.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Quiz Title</label>
                        <input
                            type="text" placeholder="e.g. Data Structure Midterm" required
                            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none text-white transition-all"
                            onChange={(e) => setTitle(e.target.value)} value={title}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Duration (Mins)</label>
                        <input
                            type="number" placeholder="e.g. 30" required
                            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none text-white transition-all"
                            onChange={(e) => setDuration(e.target.value)} value={duration}
                        />
                    </div>
                </div>

                {/* Credentials Section (ID & Pass) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/20">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-blue-400 uppercase flex items-center gap-2 ml-1">
                            <FaIdBadge /> Contest ID
                        </label>
                        <input
                            type="text" placeholder="Create a unique ID" required
                            className="w-full bg-white/10 border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none text-white transition-all"
                            onChange={(e) => setQuizId(e.target.value)} value={quizId}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2 ml-1">
                            <FaLock /> Access Password
                        </label>
                        <input
                            type="password" placeholder="Set password" required
                            className="w-full bg-white/10 border border-white/10 p-3 rounded-xl focus:border-emerald-500 outline-none text-white transition-all"
                            onChange={(e) => setQuizPassword(e.target.value)} value={quizPassword}
                        />
                    </div>
                </div>

                {/* Questions Section */}
                <div className="space-y-6 mt-8">
                    <h3 className="text-xl font-semibold text-gray-300 border-l-4 border-blue-500 pl-3">Questions</h3>
                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 relative group">
                            <div className="flex justify-between items-center">
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">Q{qIndex + 1}</span>
                                {questions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setQuestions(questions.filter((_, i) => i !== qIndex))}
                                        className="text-red-400 p-2 hover:bg-red-500/10 rounded-full transition-all"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                )}
                            </div>
                            <input
                                type="text" placeholder="What is the capital of France?" required
                                className="w-full bg-white/5 border-b border-white/20 p-2 outline-none text-white focus:border-blue-500 transition-all"
                                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                                value={q.questionText}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                {q.options.map((opt, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase">{String.fromCharCode(65 + optIndex)}</span>
                                        <input
                                            type="text" placeholder={`Option ${optIndex + 1}`} required
                                            className="flex-1 bg-white/5 border border-white/10 p-2 rounded-lg outline-none text-white text-sm focus:bg-white/10"
                                            onChange={(e) => handleQuestionChange(qIndex, optIndex, e.target.value)}
                                            value={opt}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-6">
                    <button
                        type="button" onClick={addQuestion}
                        className="flex-1 py-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl font-bold hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        <FaPlus /> Add Question
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-500 hover:to-blue-600 shadow-xl shadow-blue-900/20 transition-all transform hover:scale-[1.02]"
                    >
                        Publish Contest
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuiz;