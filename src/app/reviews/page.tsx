"use client";

import { Star, Quote, CheckCircle2, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useGetSiteReviewsQuery } from "@/store/api/frontendApi";

export default function ReviewsPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { data: reviewsResponse, isLoading, isError } = useGetSiteReviewsQuery();

    const reviews = reviewsResponse?.success ? reviewsResponse.data : [];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-[#fdfdfd] pt-10 pb-24">
            {/* Enhanced Image Preview Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-500 overflow-hidden"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="absolute top-10 right-10 z-[100000]">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className="bg-white/10 hover:bg-red-500 hover:text-white text-white p-4 rounded-3xl backdrop-blur-2xl border border-white/20 transition-all active:scale-90 group shadow-2xl"
                        >
                            <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>

                    <div
                        className="relative max-w-6xl w-full max-h-[85vh] flex items-center justify-center animate-in zoom-in-95 duration-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Review Preview"
                            className="max-w-full max-h-full rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] object-contain border-8 border-white/10"
                        />
                        <div className="absolute -inset-10 bg-red-600/10 rounded-[5rem] -z-10 blur-[100px] opacity-50"></div>
                    </div>
                </div>
            )}


            <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16 md:mb-24 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full border border-red-100 animate-bounce-slow">
                        <CheckCircle2 className="w-3 h-3 text-red-500" />
                        <span className="text-red-600 text-[10px] font-black uppercase tracking-widest">10,000+ Happy Explorers</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[0.9] max-w-4xl">
                        COMMUNITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">CHRONICLES.</span>
                    </h1>
                    <p className="max-w-xl text-slate-500 text-sm md:text-base font-medium leading-relaxed opacity-80 uppercase tracking-widest px-4 md:px-0">
                        Real stories from real travelers who chose <span className="font-black text-slate-900">Alinggon</span> for their curated lifestyle needs.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Retrieving Stories...</p>
                    </div>
                ) : isError ? (
                    <div className="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100">
                        <p className="text-red-600 font-black uppercase tracking-widest text-sm">Failed to load chronicles.</p>
                        <button onClick={() => window.location.reload()} className="mt-4 text-[10px] font-black underline uppercase text-red-400 tracking-widest hover:text-red-600">Try Again</button>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-slate-100">
                        <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs">No chronicles shared yet.</p>
                    </div>
                ) : (
                    /* Main Reviews Layout with Custom Scroll/Masonry Feel */
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-2 md:px-0">
                        {reviews.map((review) => (
                            <div key={review.id} className="break-inside-avoid bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 group relative">
                                {/* Verified Badge */}
                                {review.is_verified && (
                                    <div className="absolute top-8 right-8 flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                                        <span className="text-[9px] font-black text-green-700 uppercase tracking-tighter">Verified</span>
                                    </div>
                                )}

                                <Quote className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-50 opacity-[0.03] group-hover:text-red-50 group-hover:opacity-[1] transition-all" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-xl group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`}
                                            alt={review.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-0.5">{review.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-2.5 h-2.5 ${i < review.rating ? "fill-red-500 text-red-500" : "text-slate-100"}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{formatDate(review.created_at)}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium font-sans">
                                    "{review.comment}"
                                </p>

                                {/* Review Images Grid */}
                                {review.images && review.images.length > 0 && (
                                    <div className={`grid ${review.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-3 mb-6 relative`}>
                                        {review.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 cursor-zoom-in group/img"
                                                onClick={() => setSelectedImage(img)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Review ${idx}`}
                                                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                                                    <ImageIcon className="text-white w-6 h-6 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] bg-red-50/50 px-3 py-1 rounded-lg">
                                        {review.role || "Verified Buyer"}
                                    </span>
                                    <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-red-500 transition-colors">Helpful?</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Dynamic CTA Section */}
                <div className="mt-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 rounded-[3rem] -rotate-1 scale-105 opacity-5 blur-2xl"></div>
                    <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] -ml-48 -mt-48 transition-all duration-1000 group-hover:ml-0 group-hover:mt-0"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] -mr-48 -mb-48 transition-all duration-1000 group-hover:mr-0 group-hover:mb-0"></div>

                        <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                            <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Become a Narrator</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
                                YOUR STORY <span className="text-red-500 italic">MATTERS.</span>
                            </h2>
                            <p className="text-white/40 text-sm md:text-lg font-medium leading-relaxed uppercase tracking-wide">
                                Join the Alinggon community and help fellow seekers discover their next favorite object.
                            </p>
                            <div className="pt-6">
                                <button className="relative group/btn overflow-hidden bg-red-600 hover:bg-white text-white hover:text-slate-900 font-black text-[11px] uppercase tracking-[0.4em] px-12 py-5 rounded-full transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(239,68,68,0.5)] active:scale-95">
                                    <span className="relative z-10">Write Your Review</span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
