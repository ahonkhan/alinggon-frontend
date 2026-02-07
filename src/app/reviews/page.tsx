"use client";

import { Star, Quote, User } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Ahsan Habib",
        role: "Verified Buyer",
        rating: 5,
        comment: "The quality of the leather wallet is exceptional. It feels premium and the stitching is perfect. Highly recommended!",
        date: "2 days ago",
        avatar: "https://i.pravatar.cc/150?u=ahsan"
    },
    {
        id: 2,
        name: "Sadia Islam",
        role: "Gold Member",
        rating: 5,
        comment: "Fast delivery and great customer support. I had an issue with my order and they resolved it within an hour. Amazing service!",
        date: "1 week ago",
        avatar: "https://i.pravatar.cc/150?u=sadia"
    },
    {
        id: 3,
        name: "Tanvir Ahmed",
        role: "Tech Enthusiast",
        rating: 4,
        comment: "The smart fan is a game changer for the summer. It's quiet yet powerful. Wish the battery lasted a bit longer, but overall great.",
        date: "2 weeks ago",
        avatar: "https://i.pravatar.cc/150?u=tanvir"
    },
    {
        id: 4,
        name: "Nusrat Jahan",
        role: "Regular Customer",
        rating: 5,
        comment: "I've been shopping from Alinggon for months now. Always authentic products and the packaging is very secure.",
        date: "1 month ago",
        avatar: "https://i.pravatar.cc/150?u=nusrat"
    },
    {
        id: 5,
        name: "Rakib Hasan",
        role: "Verified Buyer",
        rating: 5,
        comment: "Excellent experience. The website is easy to use and the checkout process was smooth. Will definitely buy again.",
        date: "1 month ago",
        avatar: "https://i.pravatar.cc/150?u=rakib"
    },
    {
        id: 6,
        name: "Mousumi Akter",
        role: "Premium Member",
        rating: 5,
        comment: "Love the curated collections! Everything I've bought so far has been of high quality. The delivery team is also very polite.",
        date: "2 months ago",
        avatar: "https://i.pravatar.cc/150?u=mousumi"
    }
];

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
            <div className="max-w-[1600px] mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
                    <span className="text-red-400 text-[10px] font-black uppercase tracking-[0.4em]">Voices of Alinggon</span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-900 leading-none">
                        Customer <span className="text-red-400">Reviews.</span>
                    </h1>
                    <p className="max-w-2xl text-slate-500 text-sm md:text-base font-medium leading-relaxed uppercase tracking-wide opacity-60">
                        Join thousands of satisfied explorers who have elevated their lifestyle with our curated premium objects.
                    </p>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-slate-200/50 text-center space-y-2">
                        <p className="text-5xl font-black text-slate-900 tracking-tighter">4.9</p>
                        <div className="flex justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-red-400 text-red-400" />
                            ))}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Rating</p>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-slate-200/50 text-center space-y-2">
                        <p className="text-5xl font-black text-slate-900 tracking-tighter">12K+</p>
                        <p className="text-[10px] font-black text-red-400 uppercase tracking-widest leading-none">Satisfied Clients</p>
                        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Worldwide reach</p>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-slate-200/50 text-center space-y-2">
                        <p className="text-5xl font-black text-slate-900 tracking-tighter">99%</p>
                        <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Positive Feedback</p>
                        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Verified transactions</p>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-slate-200/50 relative group hover:-translate-y-2 transition-all duration-500">
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-50 opacity-[0.05] group-hover:text-red-400 group-hover:opacity-[0.1] transition-all" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3 h-3 ${i < review.rating ? "fill-red-400 text-red-400" : "text-gray-200"}`}
                                    />
                                ))}
                            </div>

                            <p className="text-slate-600 text-[13px] leading-relaxed mb-8 font-medium italic">
                                "{review.comment}"
                            </p>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-50 mt-auto">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-md">
                                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">{review.name}</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-bold text-red-400 uppercase tracking-tighter bg-red-50 px-2 py-0.5 rounded-full">{review.role}</span>
                                        <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{review.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 text-center py-20 bg-slate-900 rounded-[4rem] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-red-400/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">Share Your <span className="text-red-400">Experience.</span></h2>
                        <p className="text-white/40 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em]">Help other explorers find their perfect objects.</p>
                        <button className="bg-red-400 hover:bg-white hover:text-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-4 rounded-2xl transition-all shadow-2xl active:scale-95">Write a Review</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
