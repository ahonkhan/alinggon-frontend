"use client";

import Link from "next/link";
import Image from "next/image";
import CategorySidebar from "@/components/CategorySidebar";
import ProductSlider from "@/components/ProductSlider";
import VideoSection from "@/components/VideoSection";
import AdsSection from "@/components/AdsSection";
import ProductCard from "@/components/ProductCard";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetFeaturedProductsQuery, useGetCategoriesQuery, CategoryData, useGetHomeContentQuery } from "@/store/api/frontendApi";
import { SliderSkeleton } from "@/components/Skeleton";

// Dynamic imports for below-the-fold components
const CustomerRatings = dynamic(() => import("@/components/CustomerRatings"), { ssr: false });
const TopBrands = dynamic(() => import("@/components/TopBrands"), { ssr: false });
const PromoModal = dynamic(() => import("@/components/PromoModal"), { ssr: false });

export default function Home() {
  const { data: featuredData, isLoading: featuredLoading } = useGetFeaturedProductsQuery();
  const { data: catData, isLoading: catLoading } = useGetCategoriesQuery();
  const { data: homeContent, isLoading: homeLoading } = useGetHomeContentQuery();
  const categories = catData?.data || [];
  const banners = homeContent?.data.banners || [];

  return (
    <div className="bg-gray-50/50">
      {/* Hero Section */}
      <div className="max-w-[1600px] mx-auto md:px-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Categories - 2 Columns */}
          <div className="hidden lg:block lg:col-span-2 relative">
            <div className="lg:absolute lg:inset-0">
              <CategorySidebar />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 xl:col-span-7">
            <div className="relative w-full md:rounded-[1rem] overflow-hidden bg-slate-900 shadow-2xl group min-h-[200px] md:min-h-[380px] aspect-[21/9] md:aspect-[3/1]">
              {/* Static Fallback / LCP Target */}
              {(!banners || banners.length === 0 || homeLoading) && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600"
                    alt="Hero Loading"
                    fill
                    priority
                    quality={60}
                    className="object-cover opacity-40 animate-pulse"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center px-12 text-white z-10">
                    <div className="h-4 w-32 bg-red-600/50 rounded-full mb-6 animate-pulse" />
                    <div className="h-12 w-64 bg-white/20 rounded-xl mb-4 animate-pulse" />
                  </div>
                </div>
              )}

              {banners.length > 0 && (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  slidesPerView={1}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  className="w-full relative z-10"
                >
                  {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full aspect-[21/9] md:aspect-[3/1]">
                        <Image
                          src={banner}
                          alt={`Banner ${index + 1}`}
                          fill
                          priority={index === 0}
                          quality={60}
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 60vw"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>

          {/* Video Section - 2 Columns */}
          <div className="col-span-1 px-4 md:px-0 lg:col-span-3 relative">
            <div className="lg:absolute lg:inset-0">
              <VideoSection />
            </div>
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
          <span className="text-red-600 text-[13px] font-black uppercase tracking-[0.4em]">Curated Picks</span>
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
                          quality={60}
                          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <span className="text-4xl font-black text-slate-200">{item.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-center text-xs font-black text-slate-700 tracking-widest uppercase group-hover:text-red-600 transition-colors line-clamp-1 px-1">{item.name}</h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
      </section>


      {/* Product Sliders */}
      <ProductSlider 
        title="12 Months Product" 
        products={featuredData?.data.twelve_months_products || []} 
        isLoading={featuredLoading}
      />

      <ProductSlider 
        title="Alinggon New Arrival" 
        products={featuredData?.data.new_arrivals || []} 
        isLoading={featuredLoading}
      />

      <ProductSlider 
        title="Our Special Offers" 
        products={featuredData?.data.special_offers || []} 
        isLoading={featuredLoading}
      />

      <ProductSlider 
        title="Today's Deals" 
        products={featuredData?.data.todays_deals || []} 
        isLoading={featuredLoading}
      />

      <CustomerRatings />

      {/* Main Categories Links - Text Only */}
      <section className="max-w-[1600px] mx-auto px-4 py-8 border-t border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-black tracking-tighter uppercase text-slate-900 border-b-2 border-red-600 pb-1">
            Top Categories
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="text-slate-900 font-black uppercase tracking-widest text-xs md:text-sm hover:text-red-600 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <TopBrands />
      <PromoModal />
    </div>
  );
}
