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
        const videoId = id || (url ? extractYouTubeId(url) : "");
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
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
}
