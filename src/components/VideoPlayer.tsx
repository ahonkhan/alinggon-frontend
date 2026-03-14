"use client";

import React from "react";
import YouTubeEmbed from "./YouTubeEmbed";

interface VideoPlayerProps {
    type: "youtube" | "custom";
    url?: string;
    id?: string;
    title: string;
    className?: string;
}

export default function VideoPlayer({ type, url, id, title, className }: VideoPlayerProps) {
    if (type === "youtube") {
        const videoId = extractYouTubeId(id || url || "");
        return <YouTubeEmbed id={videoId} title={title} className={className} />;
    }

    return (
        <video
            src={url}
            className={`w-full h-full object-cover ${className}`}
            controls
            playsInline
            title={title}
        />
    );
}

function extractYouTubeId(url: string) {
    url = url.trim();
    if (url.length === 11) return url;
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : "";
}
