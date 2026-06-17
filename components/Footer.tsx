"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    Phone,
    Mail,
    Loader2
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
});



export default function Footer() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        const handleToggle = (e: Event) => {
            const customEvent = e as CustomEvent;
            setIsNavOpen(customEvent.detail);
        };
        window.addEventListener("navbar-menu-toggle", handleToggle);
        return () => window.removeEventListener("navbar-menu-toggle", handleToggle);
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                title: "Error!",
                text: "Please enter a valid email address.",
                icon: "error",
                background: "#121214",
                color: "#fff",
                confirmButtonColor: "#FF5C00"
            });
            return;
        }

        setLoading(true);

        try {
            // Environment keys for EmailJS. Simulates successfully in local development if undefined.
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_placeholder";
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_placeholder";
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "key_placeholder";

            if (serviceId === "service_placeholder" || publicKey === "key_placeholder") {
                // Simulate a successful network call
                await new Promise((resolve) => setTimeout(resolve, 800));
                console.warn("EmailJS: Using placeholder config.Set NEXT_PUBLIC_EMAILJS env variables for live mailing lists.");
            } else {
                await emailjs.send(serviceId, templateId, { email_to_subscribe: email }, publicKey);
            }

            Swal.fire({
                title: "Subscribed!",
                text: "Thank you for subscribing to our newsletter!",
                icon: "success",
                background: "#121214",
                color: "#fff",
                confirmButtonColor: "#FF5C00"
            });

            setEmail("");
        } catch (err) {
            console.error("EmailJS Error:", err);
            Swal.fire({
                title: "Oops...",
                text: "Something went wrong. Please try again later.",
                icon: "error",
                background: "#121214",
                color: "#fff",
                confirmButtonColor: "#FF5C00"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <footer className={`${plusJakarta.className} bg-[#0A0A0B] text-gray-400 border-t border-white/5 relative z-15`}>
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col gap-16">

                    {/* Top Segment: Flex Layout */}
                    <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start justify-between">

                        {/* Column 1: Brand & Tagline */}
                        <div className="flex flex-col gap-5 text-left max-w-sm w-full">
                            <Link href="/" className="flex items-center gap-2 group w-fit">
                                <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-[#FF5C00]/30 transition-all duration-300">
                                    {/* Aperture Camera Lens SVG (matching Navbar) */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-[#FF5C00] transition-colors duration-300">
                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.07 4 15.93 4.83 17.29 6.17L12.54 10.92C12.38 10.97 12.2 11 12 11C11.45 11 11 10.55 11 10C11 9.8 11.03 9.62 11.08 9.46L6.17 4.55C7.75 3.58 9.8 3 12 3V4ZM4.55 6.17L9.46 11.08C9.3 11.24 9.2 11.46 9.2 11.7C9.2 12.25 9.65 12.7 10.2 12.7C10.44 12.7 10.66 12.6 10.82 12.44L15.73 17.35C14.15 18.32 12.1 18.9 9.9 18.9C7.83 18.9 5.97 18.07 4.61 16.73L9.36 11.98C9.52 11.93 9.7 11.9 9.9 11.9C10.45 11.9 10.9 12.35 10.9 12.9C10.9 13.1 10.87 13.28 10.82 13.44L15.73 18.35C14.15 19.32 12.1 19.9 9.9 19.9C5.48 19.9 1.9 16.32 1.9 11.9C1.9 7.48 5.48 3.9 9.9 3.9V4.9L4.55 6.17ZM17.35 15.73L12.44 10.82C12.6 10.66 12.7 10.44 12.7 10.2C12.7 9.65 12.25 9.2 11.7 9.2C11.46 9.2 11.24 9.3 11.08 9.46L6.17 4.55C7.75 3.58 9.8 3 12 3C16.42 3 20 6.58 20 11C20 13.07 19.17 14.93 17.83 16.29L13.08 11.54C13.13 11.38 13.16 11.2 13.16 11C13.16 10.45 12.71 10 12.16 10C11.96 10 11.78 10.03 11.62 11.08L17.35 15.73Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold tracking-tight text-white group-hover:text-gray-200 transition-colors">JihadHasan</span>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Professional video editing services for brands, creators and agencies worldwide. Crafting stories that inspire action.
                            </p>
                            {/* Contact Info */}
                            <div className="flex flex-col gap-3.5 mt-4 text-sm">
                                <a
                                    href="tel:+8801874676866"
                                    className="flex items-center gap-3 text-gray-400 hover:text-[#FF5C00] transition-colors w-fit group"
                                >
                                    <Phone className="w-4 h-4 text-[#FF5C00] group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">+8801874-676866</span>
                                </a>
                                <a
                                    href="mailto:abdussalam01bd@gmail.com"
                                    className="flex items-center gap-3 text-gray-400 hover:text-[#FF5C00] transition-colors w-fit group"
                                >
                                    <Mail className="w-4 h-4 text-[#FF5C00] group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">abdussalam01bd@gmail.com</span>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Newsletter Sign-up */}
                        <div className="flex flex-col gap-4 text-left max-w-xs w-full">
                            <h3 className="text-white font-bold text-base tracking-wide mt-1">Stay Connected</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Follow our work, stay updated, or reach out anytime.
                            </p>
                            <form onSubmit={handleSubscribe} className="relative mt-3 w-full">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    className="w-full bg-transparent border-0 border-b border-solid border-white/20 hover:border-white/40 text-white placeholder-gray-600 pb-3.5 pt-2 pr-12 outline-none text-sm transition-all focus:border-[#FF5C00] disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FF5C00] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FF7324] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
                                    aria-label="Subscribe"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUpRight className="w-4.5 h-4.5" />}
                                </button>
                            </form>
                        </div>

                        {/* Column 3: Navigation Menu Links */}
                        <div className="flex flex-col items-start text-left gap-4">
                            <nav className="flex flex-col gap-3.5 text-sm">
                                <Link href="/" className="font-semibold text-white hover:text-[#FF5C00] transition-colors">Home</Link>
                                <Link href="/about-us" className="font-medium text-gray-400 hover:text-white transition-colors">About me</Link>
                                <Link href="/work" className="font-medium text-gray-400 hover:text-white transition-colors">Work</Link>
                                <Link href="/services" className="font-medium text-gray-400 hover:text-white transition-colors">Services</Link>
                                <Link href="/faq" className="font-medium text-gray-400 hover:text-white transition-colors">FAQ</Link>
                            </nav>
                        </div>

                    </div>

                    {/* Bottom Segment: Copyright bar */}
                    <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-center">
                        <span className="text-[11px] font-medium tracking-wide text-gray-500 text-center">
                            &copy; {new Date().getFullYear()} JihadHasan. All rights reserved.
                        </span>
                    </div>

                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <AnimatePresence>
                {!isNavOpen && (
                    <motion.a
                        href="https://wa.me/8801874676866"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] bg-[#25D366] text-white p-2.5 md:p-3.5 rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] flex items-center justify-center cursor-pointer"
                        aria-label="Contact on WhatsApp"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: 1
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                            scale: {
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                            },
                            opacity: {
                                duration: 0.3
                            }
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.417 9.86-9.86.002-2.638-1.022-5.116-2.884-6.98C16.586 1.892 14.113 1.07 11.7 1.071c-5.437 0-9.862 4.416-9.865 9.86-.001 1.73.457 3.424 1.328 4.93L2.16 21.8l6.19-1.624-.703-.422zM17.92 14.28c-.324-.162-1.92-.949-2.217-1.058-.297-.108-.513-.162-.73.162-.216.324-.837 1.058-1.026 1.274-.19.216-.378.243-.702.08-1.962-.98-3.003-1.636-4.228-3.737-.323-.557.323-.518.924-1.716.1-.2.05-.378-.025-.54-.075-.162-.73-1.758-1.002-2.414-.265-.636-.53-.55-.73-.56-.19-.01-.405-.012-.62-.012-.216 0-.569.08-.867.405-.297.324-1.135 1.107-1.135 2.7 0 1.593 1.157 3.129 1.319 3.345.162.216 2.28 3.481 5.52 4.882.772.333 1.374.53 1.843.68.775.247 1.48.212 2.037.129.621-.093 1.921-.785 2.19-1.543.271-.758.271-1.407.19-1.543-.082-.136-.297-.216-.621-.378z" />
                        </svg>
                    </motion.a>
                )}
            </AnimatePresence>
        </>
    );
}
