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
                    spaceBetween={50}
                    slidesPerView={3}
                    loop={true}
                    speed={5000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 4 },
                        768: { slidesPerView: 5 },
                        1024: { slidesPerView: 6 },
                    }}
                    className="flex items-center !ease-linear"
                >
                    {brands.map((brand, index) => (
                        <SwiperSlide key={brand.id || index} className="flex items-center justify-center !transition-none">
                            <div className="w-24 h-12 relative  flex items-center justify-center grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                {brand.logo ? (
                                    <img
                                        src={getLogoUrl(brand.logo)}
                                        alt={brand.name}
                                        className="max-w-full max-h-full object-contain rounded-lg"
                                    />
                                ) : (
                                    <span className="text-sm font-semibold">{brand.name}</span>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
