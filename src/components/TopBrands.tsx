"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function TopBrands() {
    const brands = [
        { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" },
        { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" },
        { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png" },
        { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png" },
        { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png" },
        { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png" },
        { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png" },
        { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1200px-Dell_Logo.svg.png" },
    ];

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
                        <SwiperSlide key={index} className="flex items-center justify-center !transition-none">
                            <div className="w-24 h-12 relative flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
