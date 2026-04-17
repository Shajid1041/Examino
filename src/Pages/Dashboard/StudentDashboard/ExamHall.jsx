import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaClock, FaCheckCircle } from 'react-icons/fa';

const ExamHall = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        // কুইজ ডাটা লোড করা
        axios.get(`http://localhost:5000/quiz-questions/${id}`)
            .then(res => {
                setQuiz(res.data);
                setTimeLeft(res.data.duration * 60); // মিনিটকে সেকেন্ডে রূপান্তর
            });
    }, [id]);

    // টাইমার লজিক
    useEffect(() => {
        if (timeLeft <= 0 && quiz) {
            handleAutoSubmit();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, quiz]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionSelect = (qIndex, optIndex) => {
        setAnswers({ ...answers, [qIndex]: optIndex });
    };

    const handleAutoSubmit = () => {
        Swal.fire({
            title: 'Time Out!',
            text: 'Your exam is being submitted automatically.',
            icon: 'warning',
            background: '#0f172a',
            color: '#fff',
            timer: 3000,
            showConfirmButton: false
        });
        submitExam();
    };

    const submitExam = async () => {
        let score = 0;
        quiz.questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                score += 5; // প্রতি প্রশ্নে ৫ নম্বর (টিচার প্যানেল অনুযায়ী)
            }
        });

        const resultData = {
            studentEmail: user?.email,
            studentName: user?.displayName,
            quizId: id,
            quizTitle: quiz.title,
            score: score,
            totalMarks: quiz.totalMarks,
            submittedAt: new Date()
        };

        try {
            const res = await axios.post('http://localhost:5000/submit-quiz', resultData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Exam Submitted!',
                    text: `You scored ${score} out of ${quiz.totalMarks}`,
                    icon: 'success',
                    background: '#0f172a',
                    color: '#fff'
                });
                navigate('/dashboard/student-results'); // রেজাল্ট পেজে নিয়ে যাবে
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (!quiz) return <div className="text-center py-20 text-blue-400">Loading Exam Hall...</div>;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
            {/* Exam Header */}
            <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 sticky top-0 bg-[#0f172a]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 z-50">
                <div>
                    <h2 className="text-2xl font-bold text-blue-400">{quiz.title}</h2>
                    <p className="text-gray-400 text-sm">Total Questions: {quiz.questions.length}</p>
                </div>
                <div className={`flex items-center gap-3 px-6 py-3 rounded-xl border ${timeLeft < 60 ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-blue-500/20 border-blue-500 text-blue-400'}`}>
                    <FaClock className="animate-pulse" />
                    <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
                </div>
            </div>

            {/* Questions List */}
            <div className="max-w-4xl mx-auto space-y-6 pb-20">
                {quiz.questions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl">
                        <h3 className="text-lg font-medium mb-6 flex gap-3">
                            <span className="text-blue-500">Q{qIndex + 1}.</span> {q.questionText}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {q.options.map((opt, optIndex) => (
                                <button
                                    key={optIndex}
                                    onClick={() => handleOptionSelect(qIndex, optIndex)}
                                    className={`p-4 rounded-2xl text-left transition-all border ${answers[qIndex] === optIndex
                                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20'
                                            : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                                        }`}
                                >
                                    <span className="mr-3 font-bold opacity-50">{String.fromCharCode(65 + optIndex)}.</span> {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => Swal.fire({
                        title: 'Finish Exam?',
                        text: "Do you want to submit your answers?",
                        icon: 'question',
                        showCancelButton: true,
                        background: '#1e293b', color: '#fff'
                    }).then(res => res.isConfirmed && submitExam())}
                    className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl font-black text-xl shadow-xl hover:scale-[1.01] transition-all"
                >
                    FINISH & SUBMIT EXAM
                </button>
            </div>
        </div>
    );
};

export default ExamHall;