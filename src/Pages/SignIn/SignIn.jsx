import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaArrowRight } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import axios from 'axios';

const SignIn = () => {
    const { signIn, googleAccess, setLoader } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();


    const handleSignIn = (event) => {
        event.preventDefault();
        setLoading(true);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setError('');

        signIn(email, password)
            .then(() => {
                toast.success('Welcome Back!');
                navigate(location?.state || '/');
            })
            .catch(() => {
                setError('Invalid email or password.');
                setLoader(false);
            })
            .finally(() => setLoading(false));
    };


    const handleGoogleSignIn = () => {
        setLoading(true);
        googleAccess()
            .then(result => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    role: 'student',
                    createdAt: new Date()
                };

                // ব্যাকএন্ডে পাঠানো
                axios.post('http://localhost:5000/users', userInfo)
                    .then(() => {
                        toast.success('Logged In with Google!');
                        navigate(location?.state || '/');
                    });
            })
            .catch(() => setLoader(false))
            .finally(() => setLoading(false));
    };
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-12 overflow-hidden">
            {/* Background Glows (ব্যানারের সাথে সামঞ্জস্যপূর্ণ) */}
            <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Main Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">

                    {/* Header */}
                    <div className="text-center space-y-3 mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-white/10 mb-2">
                            <FaLock className="text-blue-400 text-2xl" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">
                            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Back</span>
                        </h2>
                        <p className="text-gray-400 text-sm">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-5">
                        {/* Email Input */}
                        <div className="relative group">
                            <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-blue-400/50 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-blue-400/50 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 hover:text-blue-400 transition-colors"
                            >
                                {showPassword ? <IoEyeOff size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 py-2 px-4 rounded-xl">
                                <p className="text-red-400 text-xs text-center font-medium">{error}</p>
                            </div>
                        )}

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button type="button" className="text-xs text-gray-500 hover:text-blue-400 transition-colors">Forgot Password?</button>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={loading}
                            className="group relative w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? "Signing In..." : "Sign In"}
                                {!loading && <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">Or login with</span>
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all active:scale-95"
                    >
                        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
                        Google Account
                    </button>

                    {/* Footer Link */}
                    <p className="text-center text-gray-400 mt-10 text-sm">
                        Don't have an account?{" "}
                        <Link
                            state={location.state}
                            to="/sign-up" className="text-blue-400 font-bold hover:underline ml-1">
                            Create One
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;