"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ShoppingBag, Youtube, Send, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";
import { useGetHomeContentQuery } from "@/store/api/frontendApi";

const XIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z" />
    </svg>
);

export default function Footer() {
    const { showToast } = useToast();
    const { data: homeContent } = useGetHomeContentQuery();
    const logoUrl = homeContent?.data?.footer_logo || homeContent?.data?.logo;
    const footerText = homeContent?.data?.footer_text || "Architecting the future of digital shopping with a focus on premium objects and seamless customer intelligence.";

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        showToast("Welcome to our Newsletter!", "success");
    };

    return (
        <footer className="bg-slate-950 text-gray-400 font-not-not-sans-serif">


            {/* Main Footer Content */}
            <div className="max-w-[1600px] mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* About & Branding */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            {logoUrl ? (
                                <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
                            ) : (
                                <>
                                    <div className="bg-red-600 text-white p-2 rounded-xl shadow-lg shadow-red-500/10">
                                        <ShoppingBag className="w-6 h-6" />
                                    </div>
                                    <span className="text-2xl font-black text-white tracking-tighter uppercase">Alinggon</span>
                                </>
                            )}
                        </div>
                        <p className="text-sm leading-loose max-w-sm uppercase font-bold text-white/50 tracking-tight">
                            {footerText}
                        </p>
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="space-y-1">
                                <h5 className="text-sm font-black text-white uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: homeContent?.data?.footer_trust_title || 'Your Trust, <span class="text-red-600">Our Core.</span>' }}></h5>
                                <p className="text-white/40 text-[9px] uppercase font-black tracking-widest leading-none">{homeContent?.data?.footer_trust_subtitle || "Seamless flow from choice to destination."}</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="space-y-1">
                                    <p className="text-lg font-black text-white tracking-tighter leading-none">{homeContent?.data?.footer_stat1_value || "100%"}</p>
                                    <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">{homeContent?.data?.footer_stat1_label || "Authentic"}</p>
                                </div>
                                <div className="space-y-1 border-l border-white/10 pl-4">
                                    <p className="text-lg font-black text-white tracking-tighter leading-none">{homeContent?.data?.footer_stat2_value || "24/7"}</p>
                                    <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">{homeContent?.data?.footer_stat2_label || "Support"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {homeContent?.data?.social_facebook && <SocialIcon icon={Facebook} url={homeContent.data.social_facebook} label="Facebook" />}
                            {homeContent?.data?.social_x && <SocialIcon icon={XIcon} url={homeContent.data.social_x} label="X (Twitter)" />}
                            {homeContent?.data?.social_instagram && <SocialIcon icon={Instagram} url={homeContent.data.social_instagram} label="Instagram" />}
                            {homeContent?.data?.social_youtube && <SocialIcon icon={Youtube} url={homeContent.data.social_youtube} label="Youtube" />}
                            {homeContent?.data?.social_linkedin && <SocialIcon icon={Linkedin} url={homeContent.data.social_linkedin} label="Linkedin" />}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-white text-[15px] font-black uppercase tracking-[0.3em] ">{homeContent?.data?.footer_col1_title || "Platform"}</h4>
                        <ul className="space-y-4 pt-8 text-[12px] font-black uppercase tracking-widest leading-none">
                            {homeContent?.data?.footer_col1_links && homeContent.data.footer_col1_links.length > 0 ? (
                                homeContent.data.footer_col1_links.map((link, idx) => (
                                    <li key={idx}><NavLink href={link.url}>{link.name}</NavLink></li>
                                ))
                            ) : (
                                <>
                                    <li><NavLink href="/shop">Master Catalog</NavLink></li>
                                    <li><NavLink href="/about">About Admin</NavLink></li>
                                    <li><NavLink href="/orders">Order Vault</NavLink></li>
                                    <li><NavLink href="/track-order">Live Tracking</NavLink></li>
                                    <li><NavLink href="/profile">Identity Profile</NavLink></li>
                                    <li><NavLink href="/wishlist">Saved Items</NavLink></li>
                                </>
                            )}
                        </ul>

                        <div className="space-y-1">
                            <h5 className="text-[15px] font-black text-white uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: homeContent?.data?.footer_col1_text || 'Your dream website <span class="text-red-600">available here.</span>' }}></h5>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-white text-[15px] font-black uppercase tracking-[0.3em] ">{homeContent?.data?.footer_col2_title || "Directives"}</h4>
                        <ul className="space-y-4 text-[12px] pt-8 font-black uppercase tracking-widest leading-none">
                            {homeContent?.data?.footer_col2_links && homeContent.data.footer_col2_links.length > 0 ? (
                                homeContent.data.footer_col2_links.map((link, idx) => (
                                    <li key={idx}><NavLink href={link.url}>{link.name}</NavLink></li>
                                ))
                            ) : (
                                <>
                                    <li><NavLink href="/privacy">Privacy Protocol</NavLink></li>
                                    <li><NavLink href="/terms">Terms of Access</NavLink></li>
                                    <li><NavLink href="/returns">Return Logic</NavLink></li>
                                    <li><NavLink href="#">Shipping Grid</NavLink></li>
                                    <li><NavLink href="#">Refund Policy</NavLink></li>
                                    <li><NavLink href="/returns">Customer Ratings</NavLink></li>
                                </>
                            )}
                        </ul>

                        <div className="space-y-1">
                            <h5 className="text-[15px] font-black text-white uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: homeContent?.data?.footer_col2_text || 'We have also available <span class="text-red-600">Domain & Hosting.</span>' }}></h5>
                        </div>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white/5 rounded-[2rem]  border border-white/5 space-y-4">
                            <h4 className="text-white text-[15px] font-black uppercase tracking-widest">Global Newsletter</h4>
                            <p className="text-[12px] uppercase font-bold text-white/70 tracking-widest">Get prioritized for limited stock drops.</p>
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="your@intel.com"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 text-xs font-black text-white placeholder:text-white/10 focus:outline-none focus:border-red-600 transition-all outline-none"
                                    required
                                />
                                <button type="submit" aria-label="Subscribe" className="bg-red-600 hover:bg-white hover:text-slate-900 text-white rounded-2xl p-4 transition-all shadow-xl active:scale-90">
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        <div className="flex flex-col gap-6 pl-2">
                            <ContactItem icon={MapPin} label="Operating Base" value={homeContent?.data?.contact_address || "Mirpur 02, Dhaka"} />
                            <ContactItem icon={Phone} label="Priority Line" value={homeContent?.data?.contact_phone || "+97336781645"} />
                            {homeContent?.data?.contact_email && <ContactItem icon={Mail} label="Official Email" value={homeContent.data.contact_email} />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Utility Bar */}
            <div className="border-t border-white/5 bg-slate-950">
                <div className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/80">
                        © 2026 Alinggon Shop • Engineered by <span className="text-red-600/80">Rangpur IT</span>
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
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-red-600 border border-white/5 mx-auto md:mx-0 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                <Icon className="w-6 h-6" />
            </div>
            <h5 className="text-xs font-black text-white uppercase tracking-widest">{title}</h5>
            <p className="text-[13px] font-bold text-white/20 uppercase tracking-tighter leading-relaxed">{desc}</p>
        </div>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="hover:text-red-600 transition-all hover:translate-x-2 inline-block">
            {children}
        </Link>
    );
}

function SocialIcon({ icon: Icon, url, label }: { icon: any, url: string, label: string }) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-white/40 hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1">
            <Icon className="w-4 h-4" />
        </a>
    );
}

function ContactItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex gap-4">
            <div className="text-red-600/50 mt-1"><Icon className="w-4 h-4" /></div>
            <div>
                <p className="text-[8px] font-black uppercase text-white/30 tracking-[0.2em] mb-1">{label}</p>
                <p className="text-xs font-black text-white/70 tracking-tight">{value}</p>
            </div>
        </div>
    );
}
