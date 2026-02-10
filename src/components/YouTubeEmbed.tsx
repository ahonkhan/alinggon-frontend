"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
    id: string;
    title: string;
    className?: string;
}

export default function YouTubeEmbed({ id, title, className = "" }: YouTubeEmbedProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    if (isLoaded) {
        return (
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={`absolute inset-0 w-full h-full ${className}`}
            />
        );
    }

    return (
        <button
            onClick={() => setIsLoaded(true)}
            className={`absolute inset-0 w-full h-full group bg-slate-900 cursor-pointer ${className}`}
            aria-label={`Play video: ${title}`}
        >
            <img
                src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white translate-x-1" />
                </div>
            </div>
        </button>
    );
}
