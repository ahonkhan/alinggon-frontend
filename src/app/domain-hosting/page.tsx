"use client";

import React from "react";
import { Server, Globe, Shield, Zap, Headphones, Database, Check, Cpu, HardDrive } from "lucide-react";
import Link from "next/link";

export default function DomainHostingPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full bg-slate-950 text-white py-24 px-4 relative overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20">
                        <Globe className="w-4 h-4" />
                        Global Infrastructure
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                        Reliable <span className="text-red-600">Hosting</span> <br />
                        For Your Vision
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-400 text-lg font-medium">
                        Secure, fast, and scalable hosting solutions. From domain registration to enterprise-grade cloud servers, we keep your business online 24/7.
                    </p>
                </div>
            </section>

            {/* Hosting Plans */}
            <section className="max-w-7xl mx-auto py-24 px-4 w-full">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                        Simplified <span className="text-red-600">Pricing</span>
                    </h2>
                    <p className="text-slate-500 font-medium">No hidden fees. Scale as you grow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PricingCard 
                        title="Starter" 
                        price="BDT 1,500" 
                        period="/year"
                        features={["5GB SSD Storage", "Free SSL Certificate", "1 Domain Mapping", "24/7 Basic Support"]}
                    />
                    <PricingCard 
                        title="Professional" 
                        price="BDT 3,500" 
                        period="/year"
                        popular={true}
                        features={["20GB NVMe Storage", "Free SSL & Domain", "5 Domain Mappings", "Priority Support", "Daily Backups"]}
                    />
                    <PricingCard 
                        title="Business" 
                        price="BDT 7,500" 
                        period="/year"
                        features={["Unlimited NVMe Storage", "Premium SSL", "Unlimited Domains", "Expert 24/7 Support", "Free Migration"]}
                    />
                </div>
            </section>

            {/* Infrastructure Features */}
            <section className="w-full bg-slate-50 py-24 px-4 border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <FeatureBox icon={Zap} title="99.9% Uptime" desc="Ensuring your website is always accessible to your customers." />
                        <FeatureBox icon={Shield} title="Advanced Security" desc="DDoS protection and malware scanning built-in." />
                        <FeatureBox icon={Headphones} title="Expert Support" desc="Our team of experts is ready to help you anytime." />
                        <FeatureBox icon={Database} title="NVMe SSDs" desc="Ultrafast storage for lightning-quick website performance." />
                    </div>
                </div>
            </section>

            {/* Domain Search Placeholder/Teaser */}
            <section className="max-w-7xl mx-auto py-24 px-4 w-full">
                <div className="bg-red-600 rounded-[3rem] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl shadow-red-600/30">
                    <div className="text-white space-y-6 max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                            Secure Your <br /> Perfect Domain
                        </h2>
                        <p className="text-red-100 text-lg font-medium">
                            Your identity starts with a domain. Check availability and register yours today.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-lg">
                            <input 
                                type="text" 
                                placeholder="yourdomain.com" 
                                className="flex-1 px-6 py-4 outline-none font-bold text-slate-900 placeholder:text-slate-400"
                            />
                            <button className="bg-slate-950 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">
                                Search
                            </button>
                        </div>
                        <div className="flex gap-4 mt-4 justify-center lg:justify-start">
                            <span className="text-red-100 font-black text-[10px] uppercase tracking-widest">.com</span>
                            <span className="text-red-100 font-black text-[10px] uppercase tracking-widest">.net</span>
                            <span className="text-red-100 font-black text-[10px] uppercase tracking-widest">.org</span>
                            <span className="text-red-100 font-black text-[10px] uppercase tracking-widest">.com.bd</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Server Specs */}
            <section className="max-w-7xl mx-auto py-24 px-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                            Next-Gen <br /> <span className="text-red-600">Infrastructure</span>
                        </h2>
                        <p className="text-slate-600 font-medium text-lg leading-relaxed">
                            We use the latest hardware technologies to ensure your applications run at peak efficiency. Our data centers are equipped with state-of-the-art cooling and redundancy systems.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <Cpu className="w-8 h-8 text-red-600" />
                                <p className="font-bold text-slate-800 uppercase tracking-tight">AMD EPYC™ Processors</p>
                            </div>
                            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <HardDrive className="w-8 h-8 text-blue-600" />
                                <p className="font-bold text-slate-800 uppercase tracking-tight">Enterprise NVMe SSD Storage</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-slate-950 rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
                            <Server className="w-32 h-32 text-red-600 opacity-20" />
                            <div className="space-y-4 relative z-10">
                                <div className="h-2 w-24 bg-red-600 rounded-full animate-pulse"></div>
                                <div className="h-2 w-16 bg-blue-600 rounded-full"></div>
                                <div className="h-2 w-32 bg-slate-700 rounded-full"></div>
                            </div>
                            <div className="text-right">
                                <p className="text-5xl font-black text-white/10 uppercase italic">Power</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function PricingCard({ title, price, period, features, popular }: any) {
    return (
        <div className={`p-12 rounded-[3rem] border-2 transition-all hover:scale-105 flex flex-col ${popular ? 'bg-slate-950 text-white border-red-600 shadow-2xl' : 'bg-white text-slate-950 border-slate-100 shadow-sm'}`}>
            {popular && <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full self-start mb-6">Most Popular</span>}
            <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${popular ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
            <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-black tracking-tighter">{price}</span>
                <span className="text-sm font-medium opacity-50">{period}</span>
            </div>
            <ul className="space-y-4 mb-12 flex-1">
                {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                        <Check className={`w-5 h-5 ${popular ? 'text-red-500' : 'text-green-500'}`} />
                        <span className="text-sm font-bold uppercase tracking-tight opacity-80">{f}</span>
                    </li>
                ))}
            </ul>
            <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${popular ? 'bg-red-600 hover:bg-white hover:text-slate-950' : 'bg-slate-950 text-white hover:bg-red-600'}`}>
                Choose Plan
            </button>
        </div>
    );
}

function FeatureBox({ icon: Icon, title, desc }: any) {
    return (
        <div className="text-center space-y-4 group">
            <div className="w-16 h-16 mx-auto bg-white text-red-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                <Icon className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{title}</h4>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
        </div>
    );
}
