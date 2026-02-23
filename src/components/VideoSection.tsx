"use client";

import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function VideoSection() {
    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Video 1 - How to Order */}
            <div className="flex flex-col gap-2 w-full flex-1 lg:min-h-0">
                <div className="flex items-center justify-start gap-2 px-1">
                    <div className="w-1.5 h-4 lg:w-2 lg:h-5 bg-red-600 rounded-full"></div>
                    <span className="text-slate-900 text-[13px] md:text-sm font-black uppercase tracking-widest truncate pb-0.5">
                        কিভাবে অর্ডার করবেন
                    </span>
                </div>
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-lg shadow-slate-200 border border-gray-100 group w-full aspect-video lg:aspect-auto lg:h-full lg:flex-1">
                    <YouTubeEmbed
                        id="dQw4w9WgXcQ"
                        title="কিভাবে অর্ডার করবেন"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Video 2 - Customer Reviews */}
            <div className="flex flex-col gap-2 w-full flex-1 lg:min-h-0">
                <div className="flex items-center justify-start gap-2 px-1">
                    <div className="w-1.5 h-4 lg:w-2 lg:h-5 bg-slate-900 rounded-full"></div>
                    <span className="text-slate-900 text-[13px] md:text-sm font-black uppercase tracking-widest truncate pb-0.5">
                        কাস্টমারদের রিভিও দেখুন
                    </span>
                </div>
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-lg shadow-slate-200 border border-gray-100 group w-full aspect-video lg:aspect-auto lg:h-full lg:flex-1">
                    <YouTubeEmbed
                        id="LXb3EKWsInQ"
                        title="কাস্টমারদের রিভিও দেখুন"
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
