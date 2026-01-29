"use client";

import { ChevronLeft, ChevronRight, Smartphone, Utensils, Tablet, Shirt, Gem, Leaf, Sparkles, Watch, BookOpen, Percent, Briefcase } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FlashSell from "@/components/FlashSell";
import { products } from "@/data/dummyData";

export default function Home() {
  const collections = [
    { label: "Gadget", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300", tag: "Gadget" },
    { label: "Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300", tag: "Food" },
    { label: "Mobile", image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg", tag: "Mobile" },
    { label: "Man", image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg", tag: "Man" },
    { label: "Women", image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp", tag: "Women" },
    { label: "Tshirt", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=300", tag: "Tshirt" },
  ];

  return (
    <div className="pb-12 bg-gray-50/50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Categories */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-slate-100/50 h-fit overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/30">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">Main Categories</h3>
            </div>
            <div className="divide-y divide-gray-50">
              <SidebarItem label="Gadget" icon={Smartphone} hasMegaMenu />
              <SidebarItem label="Food" icon={Utensils} />
              <SidebarItem label="Mobile" icon={Tablet} />
              <SidebarItem label="Man" icon={Shirt} hasMegaMenu />
              <SidebarItem label="Women" icon={Gem} hasMegaMenu />
              <SidebarItem label="Organic" icon={Leaf} />
              <SidebarItem label="Accessories" icon={Watch} />
            </div>
          </div>

          {/* Main Slider */}
          <div className="col-span-1 lg:col-span-9 space-y-8">
            <div className="relative w-full h-[350px] md:h-[450px] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10"></div>
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-12 md:px-20 text-white z-20 max-w-2xl">
                <span className="bg-red-400 text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-6 shadow-xl shadow-red-400/20 uppercase tracking-[0.2em] border border-red-300">New Collection '26</span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none uppercase">Elevate Your<br /><span className="text-red-400">Identity.</span></h1>
                <p className="text-sm md:text-lg font-medium opacity-60 mb-10 leading-relaxed uppercase tracking-widest">Premium curated products for the modern lifestyle explorer.</p>
                <Link href="/shop" className="w-fit bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-400 hover:text-white transition-all shadow-2xl shadow-white/5 active:scale-95">Discover Shop</Link>
              </div>
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[10000ms] group-hover:scale-110" alt="Banner visual" />
              <div className="absolute bottom-10 left-12 flex space-x-3 z-20">
                <span className="w-10 h-1.5 rounded-full bg-red-400"></span>
                <span className="w-4 h-1.5 rounded-full bg-white/20"></span>
                <span className="w-4 h-1.5 rounded-full bg-white/20"></span>
              </div>
            </div>

            {/* Sub Banners */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SubBanner title="New Arrival" sub="Latest tech curated for you" icon={BookOpen} bgColor="bg-blue-50/50" iconColor="text-blue-500" borderColor="border-blue-100/50" />
              <SubBanner title="Special Offer" sub="Up to 50% discount event" icon={Percent} bgColor="bg-green-50/50" iconColor="text-green-500" borderColor="border-green-100/50" />
              <SubBanner title="Premium Care" sub="24/7 client support system" icon={Briefcase} bgColor="bg-red-50/50" iconColor="text-red-500" borderColor="border-red-100/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sell Section */}
      <FlashSell />

      {/* Explore Collections */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center mb-16 text-center space-y-4">
          <span className="text-red-400 text-[10px] font-black uppercase tracking-[0.4em]">Curated Picks</span>
          <h2 className="text-4xl font-black tracking-tighter uppercase text-slate-900 border-b-4 border-slate-100 pb-2">
            Explore Collections
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {collections.map((item) => (
            <Link key={item.label} href={`/shop?category=${item.tag}`} className="group cursor-pointer">
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-slate-100/50 overflow-hidden aspect-square mb-6 relative group-hover:shadow-red-100 transition-all p-2">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[8px] font-black px-3 py-1 rounded-full z-10 uppercase tracking-widest border border-white/10">{item.tag}</span>
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.label} />
                </div>
              </div>
              <h3 className="text-center text-xs font-black text-slate-500 tracking-widest uppercase group-hover:text-red-400 transition-colors">{item.label}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-red-400 rounded-full"></div>
            <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Best Selling Items</h2>
          </div>
          <Link href="/shop" className="text-[10px] font-black text-red-400 hover:bg-red-50 px-5 py-2.5 rounded-xl border border-red-50 transition-all uppercase tracking-widest">View Master Catalog</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Trust Signal Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/10 rounded-full blur-3xl -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-1000"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6 text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-black text-white leading-none uppercase tracking-tighter">Your Trust is Our<br /><span className="text-red-400">Core Engine.</span></h3>
              <p className="text-white/50 text-xs md:text-sm font-medium uppercase tracking-[0.1em] leading-relaxed">Experience a seamless flow from choosing your object to safe delivery at your authenticated destination.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-center space-y-2 backdrop-blur-md">
                <p className="text-3xl font-black text-white tracking-tighter">100%</p>
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Authentic</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-center space-y-2 backdrop-blur-md">
                <p className="text-3xl font-black text-white tracking-tighter">24/7</p>
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SidebarItem({ label, icon: Icon, hasMegaMenu }: { label: string; icon: any; hasMegaMenu?: boolean }) {
  return (
    <div className="group relative">
      <Link href={`/shop?category=${label}`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-xs font-black text-slate-600 hover:text-red-500 uppercase tracking-widest">
        <Icon className="w-5 h-5 text-slate-300 group-hover:text-red-400 transition-colors" />
        <span className="flex-1">{label}</span>
        {hasMegaMenu && <ChevronRight className="w-3.5 h-3.5 text-slate-200 group-hover:text-red-400 transition-all font-bold" />}
      </Link>
    </div>
  );
}

function SubBanner({ title, sub, icon: Icon, bgColor, iconColor, borderColor }: any) {
  return (
    <div className={`${bgColor} border ${borderColor} rounded-3xl p-6 flex flex-col gap-4 hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer group`}>
      <div className={`bg-white p-3 rounded-2xl w-fit shadow-sm text-slate-400 group-hover:${iconColor} transition-colors`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">{title}</h3>
        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tight">{sub}</p>
      </div>
    </div>
  );
}
