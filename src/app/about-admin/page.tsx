"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { ShieldCheck, Award, MessageCircle, Heart, Star, Gift, Sparkles, Loader2 } from "lucide-react";
import { useGetAboutInfoQuery } from "@/store/api/frontendApi";
import { AdminPersonalPictures } from "@/components/AdminPersonalPictures";

// Enhanced Festive Shapes for Congratulations
const FloatingShape = ({ type, color, size = 1 }: { type: number; color: string; size?: number }) => {
    const s = typeof size === 'number' ? size : 1;

    switch (type) {
        case 0: // Realistic Balloon with Congratulations vibe
            return (
                <div className="relative" style={{ width: 40 * s, height: 100 * s }}>
                    {/* Balloon Body with shine effect */}
                    <svg width={40 * s} height={50 * s} viewBox="0 0 40 50">
                        <defs>
                            <radialGradient id={`grad-${color}`} cx="30%" cy="30%" r="50%" fx="30%" fy="30%">
                                <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.4 }} />
                                <stop offset="100%" style={{ stopColor: color, stopOpacity: 1 }} />
                            </radialGradient>
                        </defs>
                        <ellipse cx="20" cy="25" rx="18" ry="22" fill={`url(#grad-${color})`} />
                        <path d="M18 45 L22 45 L20 48 Z" fill={color} />
                    </svg>
                    {/* Balloon String with ribbon effect */}
                    <div className="absolute left-1/2 bottom-0 w-[1px] bg-gradient-to-b from-pink-300 to-transparent h-[50px] animate-wobble-string" />
                    {/* Congratulations tag */}
                    {Math.random() > 0.7 && (
                        <div className="absolute -top-6 -right-4 bg-white text-[8px] font-black px-2 py-1 rounded-full shadow-lg transform rotate-12 animate-pulse">
                            ❤
                        </div>
                    )}
                </div>
            );
        case 1: // Confetti Hearts
            return (
                <div className="relative animate-twinkle">
                    <Heart
                        style={{
                            width: 12 * s,
                            height: 12 * s,
                            color: color,
                            fill: color,
                            transform: `rotate(${Math.random() * 360}deg)`,
                            opacity: 0.9
                        }}
                    />
                </div>
            );
        case 2: // Celebration Smoke/Glow
            return (
                <div className="relative">
                    <div
                        style={{
                            width: 180 * s,
                            height: 180 * s,
                            backgroundColor: color,
                            filter: 'blur(70px)',
                            borderRadius: '50%',
                            opacity: 0.15,
                            mixBlendMode: 'overlay'
                        }}
                    />
                    <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-30" size={40 * s} />
                </div>
            );
        case 3: // Stars
            return (
                <div className="relative animate-sparkle">
                    <Star
                        style={{
                            width: 10 * s,
                            height: 10 * s,
                            color: color,
                            fill: color,
                            transform: `rotate(${Math.random() * 360}deg)`,
                            opacity: 0.8
                        }}
                    />
                </div>
            );
        case 4: // Gift Boxes
            return (
                <div className="relative" style={{ width: 25 * s, height: 25 * s }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg transform rotate-12 shadow-lg">
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/50 transform -translate-y-1/2" />
                        <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white/50 transform -translate-x-1/2" />
                        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-yellow-300 rounded-full transform -translate-x-1/2 animate-pulse" />
                    </div>
                </div>
            );
        default: // Love Confetti
            return (
                <div
                    style={{
                        width: 8 * s,
                        height: 8 * s,
                        backgroundColor: color,
                        borderRadius: '50%',
                        opacity: 0.8
                    }}
                />
            );
    }
};

// Floating Congratulations Animation Component
const FloatingElements = () => {
    const [elements, setElements] = useState<{ id: number; left: number; delay: number; duration: number; type: number; color: string; size: number }[]>([]);

    useEffect(() => {
        // Congratulations themed colors
        const balloonColors = ["#ff4d6d", "#ff85a1", "#ffb3c6", "#fb6f92", "#ff8c42", "#ffd966", "#b5838d", "#e5989b"];
        const heartColors = ["#ff4d6d", "#ff85a1", "#fb6f92", "#ffb3c6", "#ff8c42", "#ffd966"];
        const smokeColors = ["#ffcc99", "#ffb3c6", "#ffd966", "#ff85a1"];
        const starColors = ["#ffd700", "#ffed4e", "#ffe484", "#ffb347"];

        const newElements = Array.from({ length: 100 }).map((_, i) => {
            // More variety for celebration
            let type;
            if (i < 8) type = 2; // Smoke/Glow
            else if (i < 25) type = 0; // Balloons
            else if (i < 45) type = 1; // Hearts
            else if (i < 65) type = 3; // Stars
            else if (i < 80) type = 4; // Gift boxes
            else type = 5; // Confetti

            return {
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 15,
                duration: type === 2 ? 25 + Math.random() * 20 :
                    type === 0 ? 15 + Math.random() * 12 :
                        type === 4 ? 14 + Math.random() * 10 : 10 + Math.random() * 12,
                type: type,
                color: type === 0 ? balloonColors[Math.floor(Math.random() * balloonColors.length)] :
                    type === 1 ? heartColors[Math.floor(Math.random() * heartColors.length)] :
                        type === 2 ? smokeColors[Math.floor(Math.random() * smokeColors.length)] :
                            type === 3 ? starColors[Math.floor(Math.random() * starColors.length)] :
                                type === 4 ? "#ff4d6d" : balloonColors[Math.floor(Math.random() * balloonColors.length)],
                size: type === 2 ? 0.8 + Math.random() * 1.5 :
                    type === 0 ? 0.7 + Math.random() * 0.8 :
                        type === 4 ? 0.6 + Math.random() * 0.7 : 0.5 + Math.random() * 1,
            };
        });
        setElements(newElements);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="absolute bottom-[-200px] animate-float"
                    style={{
                        left: `${el.left}%`,
                        animationDelay: `${el.delay}s`,
                        animationDuration: `${el.duration}s`,
                        zIndex: el.type === 2 ? -1 : 10,
                    }}
                >
                    <FloatingShape type={el.type} color={el.color} size={el.size} />
                </div>
            ))}
            <style jsx global>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) rotate(0deg) translateX(0) scale(1);
                        opacity: 0;
                    }
                    5% {
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(-50vh) rotate(180deg) translateX(50px);
                    }
                    90% {
                        opacity: 0.9;
                    }
                    100% {
                        transform: translateY(-120vh) rotate(360deg) translateX(-50px);
                        opacity: 0;
                    }
                }
                @keyframes wobble-string {
                    0%, 100% { transform: rotate(-8deg); }
                    50% { transform: rotate(8deg); }
                }
                .animate-float {
                    animation-name: float;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                .animate-wobble-string {
                    animation: wobble-string 2s ease-in-out infinite;
                }
                .admin-swiper .swiper-pagination-bullet {
                    background: white;
                    opacity: 0.5;
                }
                .admin-swiper .swiper-pagination-bullet-active {
                    background: #ef4444;
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};



// Horizontal Top-Flying Balloons Component
const HorizontalBalloons = () => {
    const [balloons, setBalloons] = useState<{ id: number; top: number; delay: number; duration: number; color: string; size: number }[]>([]);

    useEffect(() => {
        const colors = ["#ff4d6d", "#ff85a1", "#ffd966", "#ff8c42", "#4da3ff", "#b366ff"];
        const newBalloons = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            top: 5 + Math.random() * 15, // Keep them near the top
            delay: Math.random() * 20,
            duration: 20 + Math.random() * 15,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 0.6 + Math.random() * 0.5,
        }));
        setBalloons(newBalloons);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-[300px] overflow-hidden pointer-events-none z-20">
            {balloons.map((b) => (
                <div
                    key={b.id}
                    className="absolute animate-horizontal-fly"
                    style={{
                        top: `${b.top}%`,
                        left: '-100px',
                        animationDelay: `${b.delay}s`,
                        animationDuration: `${b.duration}s`,
                    }}
                >
                    <FloatingShape type={0} color={b.color} size={b.size} />
                </div>
            ))}
            <style jsx global>{`
                @keyframes horizontal-fly {
                    0% {
                        transform: translateX(-100px) translateY(0);
                    }
                    25% {
                        transform: translateX(25vw) translateY(-20px);
                    }
                    50% {
                        transform: translateX(50vw) translateY(0);
                    }
                    75% {
                        transform: translateX(75vw) translateY(20px);
                    }
                    100% {
                        transform: translateX(110vw) translateY(0);
                    }
                }
                .animate-horizontal-fly {
                    animation-name: horizontal-fly;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
};

export default function AboutAdmin() {
    const { data: aboutData, isLoading } = useGetAboutInfoQuery();

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
                <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                <p className="font-black uppercase tracking-widest text-slate-400 text-xs text-center">Loading Excellence...</p>
            </div>
        );
    }

    const { leadership_team = [], social_network_groups = [], admin_settings = {}, personal_pictures = [] } = aboutData?.data || {};

    return (
        <main className="min-h-screen bg-white flex flex-col items-center pt-6 pb-0 relative overflow-hidden">
            {/* Enhanced Animation Layer */}
            <FloatingElements />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-red-50 -z-20" />



            <div className="w-full relative z-10">
                {/* Horizontal Top Balloons */}
                <HorizontalBalloons />




                {/* Header Section */}
                <div className="text-center mb-12 space-y-4 px-4 relative">
                    <div className="inline-flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
                        Our Leadership Team
                    </div>
                </div>

                {/* Full Width Grid */}
                <div className="w-full border-y-2 border-red-100 bg-red-50/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
                        {leadership_team.map((staff: any, index: number) => (
                            <div
                                key={staff.id}
                                className={`flex flex-col border-gray-200 relative w-full max-w-[280px] md:max-w-none mx-auto
                                    ${index !== leadership_team.length - 1 ? 'lg:border-r' : ''}
                                    ${index % 2 === 0 ? 'md:border-r' : 'md:border-r-0 lg:border-r'}
                                    border-b md:border-b-0 hover:bg-red-50/10 transition-colors duration-300`}
                            >
                                {/* Badge */}
                                <div className="absolute -top-3 -right-3 z-20">
                                    <div className="bg-yellow-500 text-white p-2 rounded-full shadow-md">
                                        <Award className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Role Header Section */}
                                <div className={`w-full py-6 text-center border-b border-gray-200 ${staff.bg} relative overflow-hidden`}>
                                    <h3 className={`text-xl font-black uppercase tracking-[0.2em] ${staff.color || 'text-red-500'} relative z-10`}>
                                        {staff.role}
                                    </h3>

                                </div>

                                {/* Image Section with Carousel for each staff */}
                                <div className="w-full aspect-[4/5] overflow-hidden bg-gray-50 relative">
                                    <div className="w-full h-full relative">
                                        <Swiper
                                            modules={[Autoplay, Pagination, EffectFade]}
                                            effect="fade"
                                            autoplay={{ delay: 3000 + (index * 500), disableOnInteraction: false }}
                                            loop={true}
                                            className="w-full h-full"
                                        >
                                            {(staff.images || []).map((img: string, idx: number) => (
                                                <SwiperSlide key={idx}>
                                                    <img
                                                        src={img}
                                                        alt={`${staff.role} portrait ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                                    </div>

                                    {/* Verification Badge */}
                                    <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded-xl shadow-md border border-gray-200">
                                        <ShieldCheck className={`w-6 h-6 ${staff.color || 'text-red-500'}`} />
                                    </div>

                                    {/* Floating Icons */}
                                    <Heart className="absolute bottom-4 left-4 w-5 h-5 text-red-400" />
                                    <Star className="absolute bottom-4 right-4 w-5 h-5 text-yellow-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admin Deep-Dive Section */}
                <section className="w-full bg-red-50/40 py-24 border-y border-red-100 relative overflow-hidden">


                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            {/* Admin Photo */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative mx-auto max-w-2xl">
                                    <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-xl">
                                        <Swiper
                                            modules={[Autoplay, Pagination, EffectFade]}
                                            effect="fade"
                                            pagination={{ clickable: true }}
                                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                                            loop={true}
                                            className="w-full h-full admin-swiper"
                                        >
                                            {(admin_settings.admin_images || leadership_team[0]?.images || []).map((img: string, idx: number) => (
                                                <SwiperSlide key={idx}>
                                                    <img
                                                        src={img}
                                                        alt={`${admin_settings.admin_title || 'Founder & Admin'} portrait ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <div className="absolute inset-x-0 bottom-0 p-8 text-center bg-black/40 z-10">
                                            <p className="text-white text-2xl font-black uppercase tracking-widest leading-none mb-2">
                                                {admin_settings.admin_title || 'Founder & Admin'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute -top-6 -right-6 bg-red-500 text-white p-6 rounded-3xl shadow-xl rotate-12">
                                        <Award className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>

                            {/* Admin Info with Celebration Message */}
                            <div className="w-full lg:w-1/2 space-y-8">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                                        <Sparkles className="w-4 h-4" />
                                        Our Admin!
                                        <Sparkles className="w-4 h-4" />
                                    </div>

                                    <p className="text-xl text-red-500 font-bold italic">
                                        {admin_settings.admin_greetings}
                                    </p>
                                </div>

                                <div className="space-y-6 text-slate-600 font-medium bg-white/50  p-8 rounded-3xl border border-red-100">
                                    <p className="text-xl text-slate-900 font-bold leading-relaxed italic border-l-4 border-red-400 pl-6">
                                        "{admin_settings.admin_quote}"
                                    </p>
                                    <p className="leading-relaxed">
                                        {admin_settings.admin_description}
                                    </p>
                                    <div className="grid grid-cols-3 gap-4 pt-4">
                                        <div className="space-y-1 text-center p-4 bg-red-50 rounded-2xl">
                                            <p className="text-3xl font-black text-red-500">{admin_settings.years_lead}</p>
                                            <p className="text-[13px] font-black text-slate-400 uppercase tracking-widest">Years Lead</p>
                                        </div>
                                        <div className="space-y-1 text-center p-4 bg-pink-50 rounded-2xl">
                                            <p className="text-3xl font-black text-pink-500">{admin_settings.community_size}</p>
                                            <p className="text-[13px] font-black text-slate-400 uppercase tracking-widest">Community</p>
                                        </div>
                                        <div className="space-y-1 text-center p-4 bg-purple-50 rounded-2xl">
                                            <p className="text-3xl font-black text-purple-500">{admin_settings.dedication_hours}</p>
                                            <p className="text-[13px] font-black text-slate-400 uppercase tracking-widest">Dedication</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 flex flex-wrap gap-4">
                                    <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-red-500/30 transition-all active:scale-95">
                                        Send Congratulations 🎉
                                    </button>
                                    <button className="border-2 border-red-200 text-red-500 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-50 transition-all active:scale-95">
                                        View Achievements 🏆
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* New Personal Pictures Section */}
                        <AdminPersonalPictures pictures={personal_pictures} />
                    </div>
                </section>

                {/* Social Networks Sections - Now Dynamic */}
                <div className="max-w-7xl mx-auto py-20 px-4 space-y-32 relative z-10">
                    {social_network_groups.map((group: any) => (
                        <section key={group.id}>
                            <div className="text-center mb-16 space-y-4">
                                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[13px] font-black uppercase tracking-widest">
                                    Connect with Us
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
                                    {group.name.split(' ').slice(0, -1).join(' ')} <span className="text-blue-600">{group.name.split(' ').slice(-1)}</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {group.social_networks.map((network: any) => (
                                    <a
                                        key={network.id}
                                        href={network.url || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white border border-gray-100 p-6 rounded-[2rem] flex flex-col items-center text-center gap-4 hover:shadow-xl transition-all hover:-translate-y-1"
                                    >
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
                                                {network.image ? (
                                                    <img
                                                        src={network.image}
                                                        alt={network.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Sparkles className="w-8 h-8 text-blue-200" />
                                                )}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white">
                                                <ShieldCheck className="w-3 h-3" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900">
                                                {network.name}
                                            </h3>
                                            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                {network.description || 'Official Network'}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Additional Content Section */}
                <div className="max-w-7xl mx-auto py-20 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Award, label: admin_settings.bottom_stat1_label || "Excellence Award", value: admin_settings.bottom_stat1_value || "10+ Years Service", color: "bg-red-500" },
                            { icon: Heart, label: admin_settings.bottom_stat2_label || "Community Love", value: admin_settings.bottom_stat2_value || "1M+ Members", color: "bg-pink-500" },
                            { icon: ShieldCheck, label: admin_settings.bottom_stat3_label || "Trust Badge", value: admin_settings.bottom_stat3_value || "100% Verified", color: "bg-blue-500" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-gray-50 border border-gray-100">
                                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</h4>
                                    <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* YouTube Video Section */}
                    <div className="mt-24 max-w-4xl mx-auto px-4">
                        <div className="text-center mb-8 space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                                {admin_settings.about_video_title ? (
                                    <>
                                        {admin_settings.about_video_title.split(' ').slice(0, -1).join(' ')} <span className="text-red-600">{admin_settings.about_video_title.split(' ').slice(-1)}</span>
                                    </>
                                ) : (
                                    <>Experience <span className="text-red-600">Alinggon</span></>
                                )}
                            </h2>
                            <p className="text-slate-500 font-medium">
                                {admin_settings.about_video_description || 'Watch our journey and learn more about how we serve our community.'}
                            </p>
                        </div>
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={admin_settings.about_video_url || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                                title="Alinggon Company Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Bottom Celebration */}
                    <div className="mt-24 pt-12 border-t border-gray-200 text-center relative">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md">
                            THANK YOU LEADERS!
                        </div>
                        <p className="text-slate-300 font-bold text-xs uppercase tracking-[0.5em] block mb-4 mt-8">
                            Alinggon Marketplace
                        </p>
                        <p className="text-slate-400 font-medium text-sm italic">
                            {admin_settings.about_footer_text || 'Celebrating a decade of digital excellence and community trust.'}
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <Heart className="w-5 h-5 text-red-400" />
                            <Star className="w-5 h-5 text-yellow-400" />
                            <Heart className="w-5 h-5 text-pink-400" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
