import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { FaDatabase, FaPlus, FaTrash, FaFilter } from 'react-icons/fa';
import Swal from 'sweetalert2';

const QuestionBank = () => {
    const { user } = useAuth();
    const [savedQuestions, setSavedQuestions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        subject: '',
        difficulty: 'Medium'
    });

    useEffect(() => {
        fetchBank();
    }, [user?.email]);

    const fetchBank = async () => {
        const res = await axios.get(`http://localhost:5000/question-bank/${user?.email}`);
        setSavedQuestions(res.data);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const newQuestion = { ...formData, teacherEmail: user?.email, createdAt: new Date() };

        try {
            const res = await axios.post('http://localhost:5000/question-bank', newQuestion);
            if (res.data.insertedId) {
                Swal.fire({ title: 'Saved to Bank!', icon: 'success', background: '#0f172a', color: '#fff' });
                setShowForm(false);
                fetchBank();
                setFormData({ questionText: '', options: ['', '', '', ''], correctAnswer: 0, subject: '', difficulty: 'Medium' });
            }
        } catch (error) { console.error(error); }
    };

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:5000/question-bank/${id}`);
        if (res.data.deletedCount > 0) {
            setSavedQuestions(savedQuestions.filter(q => q._id !== id));
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header & Toggle Button */}
            <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                <div>
                    <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                        <FaDatabase /> Question Bank
                    </h2>
                    <p className="text-gray-400 text-sm">Stored {savedQuestions.length} reusable questions.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                    <FaPlus /> {showForm ? "Close Form" : "Add New Question"}
                </button>
            </div>

            {/* Quick Add Form */}
            {showForm && (
                <form onSubmit={handleAdd} className="bg-white/5 p-8 rounded-2xl border border-emerald-500/20 backdrop-blur-md space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text" placeholder="Subject (e.g. JavaScript)" required
                            className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-emerald-500 text-white"
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })} value={formData.subject}
                        />
                        <select
                            className="bg-[#1e293b] border border-white/10 p-3 rounded-xl outline-none text-white"
                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <textarea
                        placeholder="Type your question here..." required
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-emerald-500 text-white h-24"
                        onChange={(e) => setFormData({ ...formData, questionText: e.target.value })} value={formData.questionText}
                    ></textarea>
                    <div className="grid grid-cols-2 gap-4">
                        {formData.options.map((opt, i) => (
                            <input
                                key={i} type="text" placeholder={`Option ${i + 1}`} required
                                className="bg-white/5 border border-white/10 p-2 rounded-lg outline-none text-white"
                                onChange={(e) => {
                                    const newOpts = [...formData.options];
                                    newOpts[i] = e.target.value;
                                    setFormData({ ...formData, options: newOpts });
                                }}
                                value={opt}
                            />
                        ))}
                    </div>
                    <button type="submit" className="w-full py-3 bg-emerald-600 rounded-xl font-bold hover:bg-emerald-500 transition-all">
                        Save to Bank
                    </button>
                </form>
            )}

            {/* Question List Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedQuestions.map((q) => (
                    <div key={q._id} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all group relative">
                        <div className="flex justify-between items-start mb-4">
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20 uppercase">
                                {q.subject || 'General'}
                            </span>
                            <button onClick={() => handleDelete(q._id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                <FaTrash size={14} />
                            </button>
                        </div>
                        <h4 className="text-white font-medium mb-4">{q.questionText}</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                            {q.options.map((opt, i) => (
                                <div key={i} className={`p-2 rounded ${i === parseInt(q.correctAnswer) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-white/5'}`}>
                                    {opt}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionBank;