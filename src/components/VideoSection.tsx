"use client";

export default function VideoSection() {
    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Video 1 */}
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200 border border-gray-100 group w-full flex-1">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=BygL4lQ3Z8q0_H-s"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            </div>

            {/* Video 2 */}
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200 border border-gray-100 group w-full flex-1">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/LXb3EKWsInQ?si=A5X3b2C1d4e5f6g7"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            </div>
        </div>
    );
}
