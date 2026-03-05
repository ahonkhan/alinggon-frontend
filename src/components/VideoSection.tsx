"use client";

import { useGetHomeContentQuery } from "@/store/api/frontendApi";
import VideoPlayer from "./VideoPlayer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function VideoSection() {
    const { data: homeContent } = useGetHomeContentQuery();
    const howToOrder = homeContent?.data.how_to_order;
    const reviewVideos = homeContent?.data.review_videos || [];

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
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-lg shadow-slate-200 border border-gray-100 group w-full aspect-video lg:aspect-auto lg:h-full lg:flex-1 bg-slate-100">
                    {howToOrder?.url ? (
                        <VideoPlayer
                            type={howToOrder.type}
                            url={howToOrder.type === 'custom' ? howToOrder.url : undefined}
                            id={howToOrder.type === 'youtube' ? howToOrder.url : undefined}
                            title="কিভাবে অর্ডার করবেন"
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs uppercase tracking-widest text-center p-4">
                            How to Order Video
                        </div>
                    )}
                </div>
            </div>

            {/* Video 2 - Customer Reviews Slider */}
            <div className="flex flex-col gap-2 w-full flex-1 lg:min-h-0">
                <div className="flex items-center justify-start gap-2 px-1">
                    <div className="w-1.5 h-4 lg:w-2 lg:h-5 bg-slate-900 rounded-full"></div>
                    <span className="text-slate-900 text-[13px] md:text-sm font-black uppercase tracking-widest truncate pb-0.5">
                        কাস্টমারদের রিভিও দেখুন
                    </span>
                </div>
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-lg shadow-slate-200 border border-gray-100 group w-full aspect-video lg:aspect-auto lg:h-full lg:flex-1 bg-slate-100">
                    {reviewVideos.length > 0 ? (
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            slidesPerView={1}
                            autoplay={false}
                            pagination={{ clickable: true }}
                            navigation={true}
                            className="h-full w-full dynamic-video-swiper"
                        >
                            {reviewVideos.map((video, index) => (
                                <SwiperSlide key={index}>
                                    <VideoPlayer
                                        type={video.type}
                                        url={video.type === 'custom' ? video.url : undefined}
                                        id={video.type === 'youtube' ? video.url : undefined}
                                        title={`Customer Review ${index + 1}`}
                                        className="object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs uppercase tracking-widest text-center p-4">
                            Customer Reviews
                        </div>
                    )}
                </div>
            </div>
            <style jsx global>{`
                .dynamic-video-swiper .swiper-pagination-bullet {
                    background: white !important;
                    opacity: 0.5;
                }
                .dynamic-video-swiper .swiper-pagination-bullet-active {
                    background: #dc2626 !important;
                    opacity: 1;
                }
                .dynamic-video-swiper .swiper-button-next,
                .dynamic-video-swiper .swiper-button-prev {
                    color: white;
                    background: rgba(0, 0, 0, 0.3);
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    transform: scale(0.7);
                }
                .dynamic-video-swiper .swiper-button-next:hover,
                .dynamic-video-swiper .swiper-button-prev:hover {
                    background: rgba(0, 0, 0, 0.6);
                }
            `}</style>
        </div>
    );
}
