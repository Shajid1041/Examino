import React from 'react';
// Grouping imports from the same sub-library is cleaner
import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#0B0B0B] text-white py-16 px-4 rounded-2xl mb-8">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

                {/* Logo and Tagline */}
                <div className="mb-6 text-2xl font-bold">
                    Examino
                </div>
                <p className="text-gray-400 max-w-md mb-10 text-sm md:text-base leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                {/* Divider Line */}
                <div className="w-full border-t border-dashed border-gray-800 mb-8"></div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium mb-8">
                    <a href="#" className="hover:text-[#B7E761] transition-colors">Services</a>
                    <a href="#" className="hover:text-[#B7E761] transition-colors">Coverage</a>
                    <a href="#" className="hover:text-[#B7E761] transition-colors">About Us</a>
                    <a href="#" className="hover:text-[#B7E761] transition-colors">Pricing</a>
                    <a href="#" className="hover:text-[#B7E761] transition-colors">Blog</a>
                    <a href="#" className="hover:text-[#B7E761] transition-colors">Contact</a>
                </nav>

                {/* Divider Line */}
                <div className="w-full border-t border-dashed border-gray-800 mb-10"></div>

                {/* Social Media Icons */}
                <div className="flex gap-5">
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077B5] text-white hover:scale-110 transition-transform">
                        <FaLinkedinIn />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-black border border-gray-700 text-white hover:scale-110 transition-transform">
                        <FaXTwitter />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF0000] text-white hover:scale-110 transition-transform">
                        <FaYoutube />
                    </a>
                </div>

                {/* Copyright */}
                <p className="mt-10 text-xs text-gray-600">
                    Copyright © {new Date().getFullYear()} Examino - All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;