"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { ProductSkeleton } from "./Skeleton";
import Loader from "./Loader";

interface ProductSliderProps {
    title: string;
    products: any[];
    link?: string;
    isLoading?: boolean;
}

export default function ProductSlider({ title, products, link = "/shop", isLoading = false }: ProductSliderProps) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="max-w-[1600px] mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                    {/* <div className="w-1 h-6 bg-red-400 rounded-full"></div> */}
                    <h2 className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 uppercase">{title}</h2>
                </div>
                <div className="flex items-center gap-4">
                    <Link href={link} className="hidden md:block text-[13px] font-black text-red-500 hover:text-slate-900 transition-all uppercase tracking-widest hover:translate-x-1 duration-300">
                        View All →
                    </Link>
                    <div className="flex gap-2">
                        <button ref={prevRef} className="p-2 rounded-full border border-gray-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-slate-800">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button ref={nextRef} className="p-2 rounded-full border border-gray-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-slate-800">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20 min-h-[400px]">
                    <Loader size="lg" />
                </div>
            ) : (
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 6 },
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    className="!pb-14"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} className="!h-auto">
                            <ProductCard {...product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
}
