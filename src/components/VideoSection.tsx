"use client";

export default function VideoSection() {
    return (
        <div className="flex flex-row md:flex-col gap-6 h-full">
            {/* Video 1 - How to Order */}
            <div className="flex flex-col gap-1 lg:gap-2 flex-1 min-w-0">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-4 lg:w-2 lg:h-5 bg-red-400 rounded-full"></div>
                    <span className="text-slate-900 text-sm lg:text-base font-black uppercase tracking-widest truncate">
                        কিভাবে অর্ডার করবেন
                    </span>
                </div>
                <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg shadow-slate-200 border border-gray-100 group w-full flex-1">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=BygL4lQ3Z8q0_H-s"
                        title="কিভাবে অর্ডার করবেন"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
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
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/LXb3EKWsInQ?si=A5X3b2C1d4e5f6g7"
                        title="কাস্টমারদের রিভিও দেখুন"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
