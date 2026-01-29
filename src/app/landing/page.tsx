"use client";

import { ShoppingCart, PhoneCall, ShoppingBag, ShieldCheck, Clock, Check, MessageCircle, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { products } from "@/data/dummyData";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 58, seconds: 11 });
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const router = useRouter();

    const bundleProduct = products.find(p => p.id === "bundle-1");

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleOrderBundle = () => {
        if (bundleProduct) {
            addToCart(bundleProduct);
            showToast("Bundle added to bag", "success");
            router.push("/checkout");
        }
    };

    return (
        <div className="bg-white min-h-screen font-not-not-sans-serif">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-red-400 text-white p-1 rounded transition-transform hover:rotate-6">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900">Alinggon</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <a href="tel:01568324268" className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black hover:bg-red-400 transition-all uppercase tracking-widest shadow-lg active:scale-95">
                            <PhoneCall className="w-3.5 h-3.5" /> কল করুন
                        </a>
                        <button onClick={handleOrderBundle} className="flex items-center gap-2 px-6 py-2.5 bg-red-400 text-white rounded-full text-[10px] font-black shadow-xl shadow-red-200/50 hover:bg-red-500 transition-all uppercase tracking-widest active:scale-95">
                            অর্ডার করুন
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <div className="bg-red-50 text-red-500 px-4 py-2 rounded-2xl border border-red-100 inline-flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                        <span className="text-xs font-black uppercase tracking-widest leading-none mt-1">Limited Stock Bundle Offer</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                        ঘড়ি, সানগ্লাস, মানিব্যাগ, বেল্ট ও আতর – সবকিছু একসাথে, <mark className="bg-red-100 text-red-500 px-2 rounded-lg">এক প্যাকেজে</mark>
                    </h1>
                    <p className="text-gray-500 font-bold text-sm md:text-base leading-relaxed max-w-lg">
                        আপনার পারসনালিটি ও স্টাইলকে এক ধাপ এগিয়ে নিতে, এক প্যাকেজেই পাচ্ছেন ৫টি প্রিমিয়াম আইটেম যা আপনার প্রতিদিনের সঙ্গী হবে।
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <HeroFeature label="Current স্টাইলিশ ঘড়ি" />
                        <HeroFeature label="প্রিমিয়াম মানিব্যাগ" />
                        <HeroFeature label="UV ট্রেন্ডি সানগ্লাস" />
                        <HeroFeature label="লেদার বেল্ট" />
                        <HeroFeature label="লং-লাস্টিং আতর" />
                    </ul>

                    <div className="pt-8 flex flex-wrap items-center gap-8">
                        <div className="flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100 shadow-inner">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-${200 + i * 100}`}></div>)}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">৫,০০০+ সফল ডেলিভারি</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 rounded-xl border border-yellow-100">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-[10px] font-black text-slate-900 mt-0.5">৪.৯/৫ (৩২০ রিভিউ)</span>
                        </div>
                    </div>

                    <button onClick={handleOrderBundle} className="inline-flex items-center gap-4 px-12 py-5 bg-red-400 text-white rounded-[2rem] text-lg font-black shadow-2xl shadow-red-200/50 hover:bg-slate-900 transition-all group mt-6 active:scale-95 uppercase tracking-tighter">
                        <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        এখনই অর্ডার করুন
                    </button>
                </div>

                <div className="lg:w-1/2 relative group animate-in fade-in zoom-in duration-1000 delay-300">
                    <div className="bg-white rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white p-2">
                        <div className="aspect-square bg-gray-50 rounded-[2.5rem] flex items-center justify-center p-8 overflow-hidden">
                            <img src="https://sc04.alicdn.com/kf/H55a43588f00045e7834a366e6097d8e87.jpg" alt="Combo" className="w-full h-full object-contain hover:scale-110 transition-transform duration-1000" />
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -left-10 bg-slate-900 text-white w-32 h-32 rounded-full flex flex-col items-center justify-center font-black shadow-2xl border-4 border-white animate-bounce-slow">
                        <span className="text-[10px] uppercase tracking-widest opacity-60">Super</span>
                        <span className="text-2xl mt-1">OFFER!</span>
                    </div>
                </div>
            </section>

            {/* Pricing Banner */}
            <section className="bg-slate-900 py-16 md:py-24 my-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-block px-8 py-3 bg-red-400 text-white rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] mb-8 shadow-xl shadow-red-400/20 translate-y-1/2">
                        Special Pricing Event
                    </div>
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-12 md:p-20 shadow-2xl">
                        <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.3em] mb-6">Regular Value <span className="line-through decoration-red-400 font-sans mx-2">১,৫৯০ ৳</span></p>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                            মাত্র <span className="text-red-400 font-sans">১,০৯০</span> টাকা
                        </h2>
                        <div className="w-24 h-2 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-10 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Countdown */}
            <section className="bg-red-400 py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none">
                    <div className="text-[20rem] font-black tracking-tighter absolute -left-20 -top-40">SALE</div>
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center text-white relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black mb-10 uppercase tracking-tighter">অফারটি শীঘ্রই শেষ হতে যাচ্ছে!</h3>
                    <div className="flex justify-center gap-6">
                        <CountUnit value={timeLeft.hours} label="ঘন্টা" />
                        <CountUnit value={timeLeft.minutes} label="মিনিট" />
                        <CountUnit value={timeLeft.seconds} label="সেকেন্ড" />
                    </div>
                </div>
            </section>

            <section id="order-form" className="max-w-7xl mx-auto px-4 py-24 bg-gray-50 rounded-[4rem] mb-32 border border-gray-100 shadow-inner">
                <div className="text-center mb-20 max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                        অর্ডার করতে নিচের বাটনে ক্লিক করুন!
                    </h2>
                    <div className="w-20 h-2 bg-red-400 mx-auto rounded-full"></div>
                </div>

                <div className="flex justify-center">
                    <button onClick={handleOrderBundle} className="inline-flex items-center gap-4 px-16 py-6 bg-red-400 text-white rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-red-200/50 hover:bg-slate-900 transition-all group active:scale-95 uppercase tracking-tighter">
                        <ShieldCheck className="w-8 h-8" />
                        অর্ডার নিশ্চিত করুন
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-slate-900 text-center">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-10">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-red-400 text-white p-1 rounded">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">Alinggon</span>
                    </Link>
                    <div className="h-0.5 w-1/4 bg-white/5 rounded-full"></div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">কপিরাইট অর্পিত &copy; ২০২৬ Alinggon. Developed by Rangpur IT</p>
                </div>
            </footer>

            {/* Floating CTA */}
            <a href="https://wa.me/8801568324268" className="fixed bottom-10 right-10 bg-green-500 p-5 rounded-[2rem] text-white shadow-2xl hover:bg-green-600 transition-all z-[60] hover:-translate-y-2 group">
                <MessageCircle className="w-8 h-8 fill-current" />
            </a>
        </div>
    );
}

function HeroFeature({ label }: { label: string }) {
    return (
        <li className="flex items-center gap-3 text-xs font-black text-slate-700 uppercase tracking-tight group">
            <div className="w-5 h-5 bg-red-400 rounded-lg flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform">
                <Check className="w-3.5 h-3.5" strokeWidth={4} />
            </div>
            {label}
        </li>
    );
}

function CountUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] w-24 h-24 flex flex-col items-center justify-center border border-white/20 shadow-2xl">
                <span className="text-4xl font-black font-sans leading-none">{value.toString().padStart(2, "0")}</span>
                <span className="text-[10px] font-black mt-1 uppercase tracking-widest opacity-60">{label}</span>
            </div>
        </div>
    );
}
