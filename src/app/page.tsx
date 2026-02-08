"use client";

import Link from "next/link";
import { products } from "@/data/dummyData";
import CategorySidebar from "@/components/CategorySidebar";
import ProductSlider from "@/components/ProductSlider";
import VideoSection from "@/components/VideoSection";
import AdsSection from "@/components/AdsSection";
import ProductCard from "@/components/ProductCard";
import CustomerRatings from "@/components/CustomerRatings";
import FlashSell from "@/components/FlashSell";
import TopBrands from "@/components/TopBrands";
import PromoModal from "@/components/PromoModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  const collections = [
    { label: "Gadget", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300", tag: "Gadget" },
    { label: "Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300", tag: "Food" },
    { label: "Mobile", image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg", tag: "Mobile" },
    { label: "Man", image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg", tag: "Man" },
    { label: "Women", image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp", tag: "Women" },
    { label: "Tshirt", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=300", tag: "Tshirt" },
    { label: "Organic", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=300", tag: "Organic" },
    { label: "Accessories", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=300", tag: "Accessories" },
  ];

  return (
    <div className="pb-12 bg-gray-50/50">
      {/* Hero Section */}
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Categories - 2 Columns */}
          <div className="hidden lg:block lg:col-span-2 h-[380px]">
            <CategorySidebar />
          </div>

          {/* Main Slider - 8 Columns */}
          <div className="col-span-1 lg:col-span-8 h-[380px]">
            <div className="relative w-full h-full rounded-[1rem] overflow-hidden bg-slate-900 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10"></div>
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-12 text-white z-20 max-w-xl">
                <span className="bg-red-400 text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-6 shadow-xl shadow-red-400/20 uppercase tracking-[0.2em] border border-red-300">New Collection '26</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none uppercase">Elevate Your<br /><span className="text-red-400">Identity.</span></h1>
                <p className="text-xs md:text-sm font-medium opacity-60 mb-8 leading-relaxed uppercase tracking-widest text-balance">Premium curated products for the modern lifestyle explorer.</p>
                <Link href="/shop" className="w-fit bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-400 hover:text-white transition-all shadow-2xl shadow-white/5 active:scale-95">Discover Shop</Link>
              </div>
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[10000ms] group-hover:scale-110" alt="Banner visual" />
            </div>
          </div>

          {/* Video Section - 2 Columns */}
          <div className="col-span-1 lg:col-span-2 h-auto lg:h-[380px]">
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
          <span className="text-red-400 text-[10px] font-black uppercase tracking-[0.4em]">Curated Picks</span>
          <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900 border-b-4 border-slate-100 pb-2">
            Explore Collections
          </h2>
        </div>
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
          {collections.map((item) => (
            <SwiperSlide key={item.label}>
              <Link href={`/shop?category=${item.tag}`} className="group cursor-pointer block">
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-lg shadow-slate-100/50 overflow-hidden aspect-square mb-4 relative group-hover:shadow-red-100 transition-all p-2">
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.label} />
                  </div>
                </div>
                <h3 className="text-center text-xs font-black text-slate-500 tracking-widest uppercase group-hover:text-red-400 transition-colors">{item.label}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Flash Sell Section */}
      <FlashSell />

      {/* Product Sliders */}
      <ProductSlider title="12 Months Product" products={products} />

      <ProductSlider title="New Arrival" products={[...products].reverse()} />

      <ProductSlider title="Hot Deals" products={products} />

      {/* Trust Signal Banner */}
      <section className="max-w-[1600px] mx-auto px-4 pb-8 pt-4">
        <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-400/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-1000"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl space-y-2 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tighter">Your Trust, <span className="text-red-400">Our Core.</span></h3>
              <p className="text-white/50 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.1em]">Seamless flow from choice to destination.</p>
            </div>
            <div className="flex gap-3">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center space-y-1 backdrop-blur-md min-w-[100px]">
                <p className="text-xl font-black text-white tracking-tighter">100%</p>
                <p className="text-[9px] font-black text-red-400 uppercase tracking-widest">Authentic</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center space-y-1 backdrop-blur-md min-w-[100px]">
                <p className="text-xl font-black text-white tracking-tighter">24/7</p>
                <p className="text-[9px] font-black text-red-400 uppercase tracking-widest">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CustomerRatings />
      <TopBrands />
      <PromoModal />
    </div>
  );
}
