import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router'; // react-router-dom নিশ্চিত করুন
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaClock } from 'react-icons/fa';

const ExamHall = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    console.log('examhall');
    useEffect(() => {
        // ডাইনামিক কুইজ ডাটা ফেচিং
        axios.get(`http://localhost:5000/quiz-questions/${id}`)
            .then(res => {

                console.log(res.data);
                if (res.data) {
                    setQuiz(res.data);
                    // কুইজের ডিউরেশন মিনিট থেকে সেকেন্ডে কনভার্ট
                    setTimeLeft(parseInt(res.data.duration) * 60);
                }
            })
            .catch(err => {
                console.error("Error fetching quiz:", err);
                Swal.fire('Error', 'Could not load quiz data', 'error');
            });
    }, [id]);

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

    const submitExam = async () => {
        let score = 0;
        quiz.questions.forEach((q, index) => {
            // সঠিক উত্তর চেক করা (correctAnswer index হিসেবে সেভ থাকলে)
            if (answers[index] === parseInt(q.correctAnswer)) {
                score += 5;
            }
        });

        const resultData = {
            studentEmail: user?.email,
            studentName: user?.displayName,
            quizId: id,
            quizTitle: quiz.title,
            score: score,
            totalMarks: quiz.questions.length * 5,
            submittedAt: new Date()
        };

        try {
            const res = await axios.post('http://localhost:5000/submit-quiz', resultData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: `Exam finished. Score: ${score}`,
                    icon: 'success',
                    background: '#0f172a',
                    color: '#fff'
                });
                navigate('/dashboard/student-results');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAutoSubmit = () => {
        submitExam();
    };

    if (!quiz) return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
            <div className="text-blue-400 animate-pulse text-xl font-bold">Initializing Exam Hall...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6">
            <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 sticky top-0 bg-[#0f172a]/90 p-4 rounded-2xl border border-white/10 z-50 backdrop-blur-md">
                <h2 className="text-xl font-bold text-emerald-400">{quiz.title}</h2>
                <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${timeLeft < 60 ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-emerald-500 text-emerald-500 bg-emerald-500/10'}`}>
                    <FaClock /> <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {quiz.questions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <p className="text-lg mb-4 font-medium"><span className="text-emerald-500 mr-2">Q{qIndex + 1}.</span>{q.questionText}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((opt, optIndex) => (
                                <button
                                    key={optIndex}
                                    onClick={() => handleOptionSelect(qIndex, optIndex)}
                                    className={`p-3 rounded-xl text-left border transition-all ${answers[qIndex] === optIndex ? 'bg-emerald-600 border-emerald-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => {
                        Swal.fire({
                            title: 'Finish Exam?',
                            text: 'Submit your answers now?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#10b981',
                            background: '#0f172a', color: '#fff'
                        }).then((result) => result.isConfirmed && submitExam());
                    }}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold text-lg transition-all mb-10"
                >
                    Submit Final Answers
                </button>
            </div>
        </div>
    );
};

export default ExamHall;