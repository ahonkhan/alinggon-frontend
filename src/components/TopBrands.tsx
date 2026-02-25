"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useGetBrandsQuery } from "@/store/api/frontendApi";

const getLogoUrl = (logo: string | undefined) => {
    if (!logo) return '';
    if (logo.startsWith('http')) return logo;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
    return `${baseUrl}/${logo}`;
};

export default function TopBrands() {
    const { data: brandsResponse, isLoading } = useGetBrandsQuery();

    if (isLoading) {
        return (
            <section className="pb-12 bg-white">
                <div className="max-w-[1600px] mx-auto px-4 flex justify-center items-center h-[150px]">
                    <div className="animate-pulse flex space-x-8 overflow-hidden w-full justify-center">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="w-24 h-12 bg-gray-200 rounded shrink-0"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const brands = brandsResponse?.data || [];

    if (brands.length === 0) {
        return null;
    }

    return (
        <section className="pb-12  bg-white ">
            <div className="max-w-[1600px] mx-auto px-4">
                <div className="flex flex-col items-center mb-8 text-center space-y-2">
                    <span className="text-red-400 text-[10px] font-black uppercase tracking-[0.4em]">Official Partners</span>
                    <h2 className="text-2xl font-black tracking-tighter uppercase text-slate-900 pb-2">
                        Top Brands
                    </h2>
                </div>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3}
                    breakpoints={{
                        640: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                        1280: { slidesPerView: 8 },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    className="brand-swiper !py-10"
                >
                    {brands.map((brand, index) => (
                        <SwiperSlide key={brand.id || index}>
                            <div className="bg-white rounded-3xl p-6 h-32 flex items-center justify-center border border-gray-100 hover:border-red-500 hover:shadow-2xl hover:shadow-red-50 transition-all group overflow-hidden relative">
                                <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-10 transition-opacity" />
                                {brand.logo ? (
                                    <img
                                        src={getLogoUrl(brand.logo)}
                                        alt={brand.name}
                                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-125"
                                    />
                                ) : (
                                    <span className="text-sm font-black uppercase tracking-widest">{brand.name}</span>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
