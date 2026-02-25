"use client";

import Link from "next/link";
import Image from "next/image";
import CategorySidebar from "@/components/CategorySidebar";
import ProductSlider from "@/components/ProductSlider";
import VideoSection from "@/components/VideoSection";
import AdsSection from "@/components/AdsSection";
import ProductCard from "@/components/ProductCard";
import CustomerRatings from "@/components/CustomerRatings";
import TopBrands from "@/components/TopBrands";
import FlashSaleSection from "@/components/FlashSaleSection";
import PromoModal from "@/components/PromoModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetFeaturedProductsQuery, useGetCategoriesQuery, CategoryData } from "@/store/api/frontendApi";

export default function Home() {
  const { data: featuredData, isLoading } = useGetFeaturedProductsQuery();
  const { data: catData, isLoading: catLoading } = useGetCategoriesQuery();
  const categories = catData?.data || [];

  return (
    <div className="bg-gray-50/50">
      {/* Hero Section */}
      <div className="max-w-[1600px] mx-auto md:px-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Categories - 2 Columns */}
          <div className="hidden lg:block lg:col-span-2 h-[380px]">
            <CategorySidebar />
          </div>

          {/* Main Slider - 8 Columns */}
          <div className="col-span-1 lg:col-span-7 h-[380px]">
            <div className="relative w-full h-full md:rounded-[1rem] overflow-hidden bg-slate-900 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10"></div>
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-12 text-white z-20 max-w-xl">
                <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-6 shadow-xl shadow-red-600/20 uppercase tracking-[0.2em] border border-red-300">New Collection '26</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none uppercase">Elevate Your<br /><span className="text-red-600">Identity.</span></h1>
                <p className="text-xs md:text-sm font-medium opacity-60 mb-8 leading-relaxed uppercase tracking-widest text-balance">Premium curated products for the modern lifestyle explorer.</p>
                <Link href="/shop" className="w-fit bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl shadow-white/5 active:scale-95">Discover Shop</Link>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600"
                alt="Banner visual"
                fill
                priority
                className="object-cover opacity-60 transition-transform duration-[10000ms] group-hover:scale-110"
              />
            </div>
          </div>

          {/* Video Section - 2 Columns */}
          <div className="col-span-1 px-4 md:px-0 lg:col-span-3 h-auto lg:h-[380px]">
            <VideoSection />
          </div>
        </div>
      </div>

      {/* Ads Section */}
      <div className="border-t border-gray-100">
        <AdsSection />
      </div>

      {/* Explore Collections Slider */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-10 text-center space-y-4">
          <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em]">Curated Picks</span>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900 border-b-4 border-slate-100 pb-2">
            Explore Collections
          </h2>
        </div>
        {catLoading ? (
          <div className="flex gap-4 overflow-x-auto pb-12 opacity-50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="min-w-[150px] aspect-square bg-white rounded-[2rem] animate-pulse rounded-2xl block border border-gray-100"></div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
              1280: { slidesPerView: 8 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="!pb-12"
            pagination={{ clickable: true }}
          >
            {categories.map((item: CategoryData) => (
              <SwiperSlide key={item.id}>
                <Link href={`/shop?category=${item.slug}`} className="group cursor-pointer block">
                  <div className="bg-white rounded-[2rem] border border-gray-100 shadow-lg shadow-slate-100/50 overflow-hidden aspect-square mb-4 relative group-hover:shadow-red-100 transition-all p-2 flex items-center justify-center">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-gray-50 flex items-center justify-center">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <span className="text-4xl font-black text-slate-200">{item.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-center text-xs font-black text-slate-500 tracking-widest uppercase group-hover:text-red-600 transition-colors line-clamp-1 px-1">{item.name}</h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* Flash Sale Section */}
      <FlashSaleSection />

      {/* Product Sliders */}
      <ProductSlider title="12 Months Product" products={featuredData?.data.twelve_months_products || []} />

      <ProductSlider title="Alinggon  New Arrival" products={featuredData?.data.new_arrivals || []} />

      <ProductSlider title="Our Special Offers" products={featuredData?.data.special_offers || []} />

      <ProductSlider title="Today's Deals" products={featuredData?.data.todays_deals || []} />

      <CustomerRatings />
      <TopBrands />
      <PromoModal />
    </div>
  );
}
