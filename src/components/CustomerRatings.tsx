"use client";

import React from "react";
import { Star, MessageCircle, User, Quote, ArrowRight } from "lucide-react";

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
    }
];

export default function CustomerRatings() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-[1600px] mx-auto px-4 relative">
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <Star className="w-3 h-3 fill-current" />
                            Customer Trust
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                            Customer Wisdom & <br />
                            <span className="text-red-400">Authentic Ratings</span>
                        </h2>
                        <p className="text-slate-500 max-w-lg font-bold text-sm tracking-tight leading-relaxed">
                            Join thousands of satisfied customers who trust Alinggon for their premium shopping needs. Your voice helps us architecture a better experience.
                        </p>
                        <div className="flex items-center gap-8">
                            <div>
                                <div className="text-3xl font-black text-slate-900">4.9/5.0</div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Based on 2k+ Reviews</div>
                            </div>
                            <div className="w-px h-12 bg-slate-100" />
                            <button className="flex items-center gap-3 bg-slate-900 text-white px-8 h-14 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-400 transition-all shadow-xl shadow-slate-900/10 group">
                                Share Your Experience
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.slice(0, 2).map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} className="last:hidden md:last:flex" />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ReviewCard({ review, className = "" }: { review: any; className?: string }) {
    return (
        <div className={`bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 flex flex-col gap-6 relative group hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 ${className}`}>
            <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100 group-hover:text-red-50 transition-colors" />

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                    <img src={review.avatar} alt={review.user} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="font-black text-slate-900 text-sm tracking-tight">{review.user}</h4>
                    <div className="flex items-center gap-0.5 text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-slate-600 text-[13px] font-bold leading-relaxed tracking-tight relative z-10">
                "{review.comment}"
            </p>

            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{review.date}</span>
                <div className="flex items-center gap-1 text-red-400">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Verified Order</span>
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
