"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ShoppingBag, Twitter, Youtube, Send, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";

export default function Footer() {
    const { showToast } = useToast();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        showToast("Welcome to our Newsletter!", "success");
    };

    return (
        <footer className="bg-slate-950 text-gray-400 font-not-not-sans-serif">
            {/* Top Value Prop */}
            <div className="border-b border-white/5 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    <ValueProp icon={ShieldCheck} title="Authentic Objects" desc="101% verified premium products." />
                    <ValueProp icon={Truck} title="Swift Logistics" desc="Express delivery to your destination." />
                    <ValueProp icon={RefreshCcw} title="Seamless Exchange" desc="30-day hassle-free return window." />
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
                    {/* About & Branding */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-400 text-white p-2 rounded-xl shadow-lg shadow-red-500/10">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter uppercase">Alinggon</span>
                        </div>
                        <p className="text-sm leading-loose max-w-sm uppercase font-bold text-white/30 tracking-tight">
                            Architecting the future of digital shopping with a focus on premium objects and seamless customer intelligence.
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialIcon icon={Facebook} />
                            <SocialIcon icon={Twitter} />
                            <SocialIcon icon={Instagram} />
                            <SocialIcon icon={Youtube} />
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] border-l-2 border-red-400 pl-4">Platform</h4>
                        <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest leading-none">
                            <li><NavLink href="/shop">Master Catalog</NavLink></li>
                            <li><NavLink href="/orders">Order Vault</NavLink></li>
                            <li><NavLink href="/track-order">Live Tracking</NavLink></li>
                            <li><NavLink href="/profile">Identity Profile</NavLink></li>
                            <li><NavLink href="/wishlist">Saved Items</NavLink></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] border-l-2 border-slate-700 pl-4">Directives</h4>
                        <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest leading-none">
                            <li><NavLink href="/privacy">Privacy Protocol</NavLink></li>
                            <li><NavLink href="/terms">Terms of Access</NavLink></li>
                            <li><NavLink href="/returns">Return Logic</NavLink></li>
                            <li><NavLink href="#">Shipping Grid</NavLink></li>
                            <li><NavLink href="#">Refund Policy</NavLink></li>
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 space-y-6">
                            <h4 className="text-white text-xs font-black uppercase tracking-widest">Global Newsletter</h4>
                            <p className="text-[10px] uppercase font-bold text-white/20 tracking-widest">Get prioritized for limited stock drops.</p>
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="your@intel.com"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 text-xs font-black text-white placeholder:text-white/10 focus:outline-none focus:border-red-400 transition-all outline-none"
                                    required
                                />
                                <button type="submit" className="bg-red-400 hover:bg-white hover:text-slate-900 text-white rounded-2xl p-4 transition-all shadow-xl active:scale-90">
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        <div className="flex flex-col gap-6 pl-2">
                            <ContactItem icon={MapPin} label="Operating Base" value="Uttara, Sector 07, Dhaka" />
                            <ContactItem icon={Phone} label="Priority Line" value="+880 1568 324268" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Utility Bar */}
            <div className="border-t border-white/5 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                        © 2026 Alinggon Complex • Engineered by <span className="text-red-400/50">Rangpur IT</span>
                    </p>
                    <div className="flex items-center gap-6">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_uU-E1bF5B8-L9R_Lq8_Y8yG7y-N0G-W-Yg&s" className="h-6 filter grayscale invert opacity-20 hover:opacity-100 transition-opacity cursor-pointer" alt="SSL Commerz" />
                        <div className="h-4 w-px bg-white/5"></div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[8px] font-black text-white/30">VISA</div>
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[8px] font-black text-white/30">MC</div>
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[8px] font-black text-white/30">COD</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function ValueProp({ icon: Icon, title, desc }: any) {
    return (
        <div className="space-y-3 group cursor-pointer">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-red-400 border border-white/5 mx-auto md:mx-0 group-hover:bg-red-400 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                <Icon className="w-6 h-6" />
            </div>
            <h5 className="text-xs font-black text-white uppercase tracking-widest">{title}</h5>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter leading-relaxed">{desc}</p>
        </div>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="hover:text-red-400 transition-all hover:translate-x-2 inline-block">
            {children}
        </Link>
    );
}

function SocialIcon({ icon: Icon }: any) {
    return (
        <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-white/40 hover:bg-red-400 hover:text-white transition-all transform hover:-translate-y-1">
            <Icon className="w-4 h-4" />
        </a>
    );
}

function ContactItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex gap-4">
            <div className="text-red-400/50 mt-1"><Icon className="w-4 h-4" /></div>
            <div>
                <p className="text-[8px] font-black uppercase text-white/10 tracking-[0.2em] mb-1">{label}</p>
                <p className="text-xs font-black text-white/60 tracking-tight">{value}</p>
            </div>
        </div>
    );
}
