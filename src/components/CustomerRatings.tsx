"use client";

import React from "react";
import { Star, MessageCircle, User, Quote, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
    {
        id: 1,
        user: "Mustakim Ahmed",
        rating: 5,
        comment: "Excellent quality product and very fast delivery. Highly recommended!",
        date: "2 days ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mustakim"
    },
    {
        id: 2,
        user: "Ayesha Siddiqua",
        rating: 4,
        comment: "The packaging was very professional. Product matches the description perfectly.",
        date: "5 days ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha"
    },
    {
        id: 3,
        user: "Rakibul Hasan",
        rating: 5,
        comment: "I've ordered multiple times and Alinggon never disappoints. Best service!",
        date: "1 week ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rakib"
    },
    {
        id: 4,
        user: "Ariful Islam",
        rating: 5,
        comment: "Really impressed with the collection. Everything is premium and authentic.",
        date: "2 weeks ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arif"
    }
];

export default function CustomerRatings() {
    return (
        <section className="bg-white pt-6 relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 relative">
                <div className="flex flex-col items-center mb-10 text-center space-y-4">
                    <span className="text-red-400 text-[10px] font-black uppercase tracking-[0.4em]">Customer Trust</span>
                    <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900 border-b-4 border-slate-100 pb-2">
                        Authentic Ratings
                    </h2>
                    <p className="text-slate-500 max-w-lg font-bold text-xs tracking-tight leading-relaxed uppercase">
                        Voices of our satisfied community members
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="!pb-12"
                    pagination={{ clickable: true }}
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <ReviewCard review={review} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

function ReviewCard({ review, className = "" }: { review: any; className?: string }) {
    return (
        <div className={`bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 flex flex-col gap-4 relative group hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 h-full ${className}`}>
            <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 group-hover:text-red-50 transition-colors" />

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md">
                    <img src={review.avatar} alt={review.user} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="font-black text-slate-900 text-[11px] tracking-tight truncate uppercase">{review.user}</h4>
                    <div className="flex items-center gap-0.5 text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-slate-600 text-[11px] font-bold leading-relaxed tracking-tight relative z-10 line-clamp-3">
                "{review.comment}"
            </p>

            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{review.date}</span>
                <div className="flex items-center gap-1 text-red-400">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
                </div>
            </div>
        </div>
    );
}

function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
