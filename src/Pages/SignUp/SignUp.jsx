import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { FaEye, FaEnvelope, FaUser, FaImage, FaLock, FaGoogle } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
    const { createUser, setProfileData, googleAccess, setLoader } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const uploadImage = async () => {
        if (!imageFile) return "";
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=686741d76f7db92b44080a983f0fb0b3`,
                formData
            );
            return res.data.data.display_url;
        } catch (error) {
            toast.error("Image upload failed!");
            return "";
        }
    };





    // ----------------------------
    const handleSignUp = async (data) => {
        setLoading(true);
        try {
            const photoURL = await uploadImage();

            // ১. ফায়ারবেসে ইউজার তৈরি
            const result = await createUser(data.email, data.password);

            // ২. ফায়ারবেস প্রোফাইল আপডেট
            await setProfileData(data.name, photoURL);
            console.log(photoURL);
            // ৩. ব্যাকএন্ডে ইউজার ডাটা পাঠানো (নতুন অংশ)
            const userInfo = {
                name: data.name,
                email: data.email,
                image: photoURL,
                role: 'student', // ডিফল্ট রোল
                createdAt: new Date()
            };

            const res = await axios.post('http://localhost:5000/users', userInfo);

            if (res.data.insertedId || res.data.message === 'User already exists') {
                toast.success('Account Created & Saved Successfully!');
                navigate(location?.state || '/');
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
            setLoader(false);
        }
    };
    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            // ১. গুগল দিয়ে সাইন ইন (Firebase)
            const result = await googleAccess();
            const user = result.user;

            // ২. ডাটাবেজের জন্য ইউজার অবজেক্ট তৈরি
            const userInfo = {
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
                role: 'student', // ডিফল্ট রোল
                createdAt: new Date()
            };

            // ৩. ব্যাকএন্ডে ইউজার ডাটা পাঠানো
            const res = await axios.post('http://localhost:5000/users', userInfo);

            if (res.data.insertedId || res.data.message === 'User already exists') {
                toast.success('Signed Up with Google!');
                navigate(location?.state || '/');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setLoader(false);
        }
    };
    // ----------------------------



    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-12 overflow-hidden">
            {/* Background Glows (Banner এর সাথে মিল রেখে) */}
            <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <div className="text-center space-y-2 mb-8">
                        <h2 className="text-3xl font-bold text-white">Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Account</span></h2>
                        <p className="text-gray-400 text-sm">Join the future of digital education</p>
                    </div>

                    {/* Profile Image Preview & Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative group">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center text-gray-500 group-hover:border-blue-500/50 transition-colors">
                                    <FaImage size={30} />
                                </div>
                            )}
                            <label className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-all shadow-lg">
                                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                                <FaUser className="text-white text-xs" />
                            </label>
                        </div>
                        <p className="text-gray-500 text-[11px] mt-3 uppercase tracking-wider font-semibold">Upload Avatar</p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                        {/* Name */}
                        <div className="relative">
                            <FaUser className="absolute top-4 left-4 text-blue-400/60" />
                            <input
                                {...register('name', { required: "Name is required" })}
                                placeholder="Full Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1 ml-2">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <FaEnvelope className="absolute top-4 left-4 text-blue-400/60" />
                            <input
                                type="email"
                                {...register('email', { required: "Email is required" })}
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1 ml-2">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <FaLock className="absolute top-4 left-4 text-blue-400/60" />
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters required" }
                                })}
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-blue-400 transition-colors"
                            >
                                {showPassword ? <IoEyeOff size={18} /> : <FaEye size={18} />}
                            </button>
                            {errors.password && <p className="text-red-400 text-xs mt-1 ml-2">{errors.password.message}</p>}
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:scale-100"
                        >
                            <span className="relative z-10">{loading ? "Creating Account..." : "Sign Up"}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-6">
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">Or continue with</span>
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all"
                    >
                        <FaGoogle className="text-blue-400" /> Google
                    </button>

                    <p className="text-center text-gray-400 mt-8 text-sm">
                        Already have an account?{" "}
                        <Link
                            state={location.state}
                            to="/sign-in" className="text-blue-400 font-bold hover:underline ml-1">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;