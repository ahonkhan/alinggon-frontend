"use client";

import React from "react";
import { Star, Quote, CheckCircle2, Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetSiteReviewsQuery } from "@/store/api/frontendApi";

export default function CustomerRatings() {
    const { data: reviewsResponse, isLoading, isError } = useGetSiteReviewsQuery();
    const reviews = reviewsResponse?.success ? reviewsResponse.data.slice(0, 8) : []; // Limit to 8 on home page

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

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-white">
                <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Loading Chronicles...</p>
            </div>
        );
    }

    if (isError || reviews.length === 0) {
        return null; // Hide the section if there's an error or no reviews
    }

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
                            <ReviewCard review={review} formatDate={formatDate} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

function ReviewCard({ review, formatDate, className = "" }: { review: any; formatDate: (d: string) => string; className?: string }) {
    return (
        <div className={`bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 flex flex-col gap-4 relative group hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 h-full ${className}`}>
            <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 group-hover:text-red-50 transition-colors" />

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md bg-slate-100">
                    <img
                        src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`}
                        alt={review.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-black text-slate-900 text-[11px] tracking-tight truncate uppercase">{review.name}</h4>
                    <div className="flex items-center gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-2.5 h-2.5 ${i < review.rating ? "fill-current" : "text-slate-200"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-slate-600 text-[11px] font-bold leading-relaxed tracking-tight relative z-10 line-clamp-3">
                "{review.comment}"
            </p>

            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{formatDate(review.created_at)}</span>
                {review.is_verified && (
                    <div className="flex items-center gap-1 text-red-400">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
                    </div>
                )}
            </div>
        </div>
    );
}
