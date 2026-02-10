"use client";

import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function VideoSection() {
    return (
        <div className="flex flex-row md:flex-col gap-6 h-full">
            {/* Video 1 - How to Order */}
            <div className="flex flex-col gap-1 lg:gap-2 flex-1 min-w-0">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-4 lg:w-2 lg:h-5 bg-red-600 rounded-full"></div>
                    <span className="text-slate-900 text-sm lg:text-base font-black uppercase tracking-widest truncate">
                        কিভাবে অর্ডার করবেন
                    </span>
                </div>
                <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg shadow-slate-200 border border-gray-100 group w-full flex-1">
                    <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg shadow-slate-200 border border-gray-100 group w-full flex-1">
                        <YouTubeEmbed
                            id="dQw4w9WgXcQ"
                            title="কিভাবে অর্ডার করবেন"
                        />
                    </div>
                </div>
            </div>

            {/* Video 2 - Customer Reviews */}
            <div className="flex flex-col gap-1 lg:gap-2 flex-1 min-w-0">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-4 lg:w-2 lg:h-5 bg-slate-900 rounded-full"></div>
                    <span className="text-slate-900 text-sm lg:text-base font-black uppercase tracking-widest truncate">
                        কাস্টমারদের রিভিও দেখুন
                    </span>
                </div>
                <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg shadow-slate-200 border border-gray-100 group w-full flex-1">
                    <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg shadow-slate-200 border border-gray-100 group w-full flex-1">
                        <YouTubeEmbed
                            id="LXb3EKWsInQ"
                            title="কাস্টমারদের রিভিও দেখুন"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
