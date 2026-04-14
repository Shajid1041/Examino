import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';

const SignIn = () => {
    const { signIn, googleAccess, setLoader } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSignIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setError('');

        signIn(email, password)
            .then(() => {
                toast.success('Welcome Back!');
                navigate(from, { replace: true });
            })
            .catch(() => {
                setError('Invalid email or password.');
                setLoader(false);
            });
    };

    const handleGoogleSignIn = () => {
        googleAccess()
            .then(() => {
                toast.success('Logged In with Google!');
                navigate(from, { replace: true });
            })
            .catch(() => setLoader(false));
    };

    return (
        <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-6 text-gray-800">
            <div className="max-w-[1000px] w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

                {/* Branding Side */}
                <div className="md:w-1/2 bg-[#1f2937] p-10 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#f59e0b] opacity-20 rounded-br-full -ml-10 -mt-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                        <p className="text-gray-300">Sign in to manage your exams and track student progress.</p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="md:w-1/2 p-10 md:p-12">
                    <h3 className="text-2xl font-bold mb-6">Sign In</h3>
                    <form onSubmit={handleSignIn} className="space-y-5">
                        <input type="email" name="email" required placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1f2937] outline-none transition-all" />
                        <input type="password" name="password" required placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1f2937] outline-none transition-all" />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button className="w-full bg-[#111827] text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg">Sign In</button>

                        <div className="relative text-center my-4">
                            <span className="bg-white px-2 text-xs text-gray-400">OR</span>
                        </div>

                        <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="" />
                            Sign in with Google
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            New here? <Link to="/sign-up" className="text-[#1f2937] font-bold hover:underline">Create Account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;