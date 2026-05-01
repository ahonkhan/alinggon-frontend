"use client";

import React from "react";
import { Laptop, Rocket, Palette, Code, Smartphone, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DreamWebsitePage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full bg-slate-950 text-white py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                
                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-red-500/20">
                        <Rocket className="w-4 h-4" />
                        Premium Web Development
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                        Build Your <span className="text-red-600">Dream</span> <br />
                        Website With Us
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-400 text-lg font-medium">
                        We transform your vision into a high-performance digital reality. From stunning UI/UX to robust e-commerce solutions, we engineer excellence.
                    </p>
                    <div className="pt-8">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-red-600/20 active:scale-95">
                            Get A Quote Today
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto py-24 px-4 w-full">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                        Our Expert <span className="text-red-600">Solutions</span>
                    </h2>
                    <p className="text-slate-500 font-medium">Tailored strategies for your unique business needs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard 
                        icon={Palette} 
                        title="UI/UX Design" 
                        desc="Modern, intuitive interfaces that captivate your audience and enhance user engagement."
                    />
                    <ServiceCard 
                        icon={Code} 
                        title="Custom Development" 
                        desc="Clean, scalable code tailored to your specific requirements using the latest technologies."
                    />
                    <ServiceCard 
                        icon={Smartphone} 
                        title="Mobile Optimization" 
                        desc="Responsive designs that look and perform perfectly on every device, from phones to desktops."
                    />
                    <ServiceCard 
                        icon={Zap} 
                        title="Performance Tuning" 
                        desc="Blazing fast load times and optimized performance to keep your visitors engaged."
                    />
                    <ServiceCard 
                        icon={Laptop} 
                        title="E-Commerce" 
                        desc="Powerful online stores designed to maximize conversions and simplify management."
                    />
                    <ServiceCard 
                        icon={Rocket} 
                        title="SEO Optimization" 
                        desc="Built-in SEO best practices to help your website rank higher and reach more customers."
                    />
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="w-full bg-white py-24 px-4 border-y border-slate-200">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                            Why Choose <br />
                            <span className="text-red-600">Alinggon Tech</span>
                        </h2>
                        <div className="space-y-6">
                            <FeatureItem text="Expert Team of Senior Developers" />
                            <FeatureItem text="Cutting-edge Modern Technology Stack" />
                            <FeatureItem text="Dedicated Post-Launch Support" />
                            <FeatureItem text="On-time Project Delivery Guarantee" />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="relative">
                            <div className="aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-slate-100 flex items-center justify-center p-12">
                                <Code className="w-32 h-32 text-red-600 opacity-20 absolute -top-8 -left-8 rotate-12" />
                                <Laptop className="w-48 h-48 text-white" />
                                <div className="absolute bottom-8 right-8 bg-red-600 text-white p-6 rounded-2xl shadow-xl animate-bounce">
                                    <span className="text-2xl font-black">100%</span>
                                    <p className="text-[10px] uppercase font-bold tracking-widest">Quality</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="max-w-7xl mx-auto py-24 px-4 w-full text-center">
                <div className="bg-slate-950 rounded-[3rem] p-12 md:p-24 space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        Ready to Launch <br />
                        Your <span className="text-red-600">Project?</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        Let's collaborate to build something extraordinary. Our team is ready to turn your ideas into reality.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-8">
                        <Link href="/support" className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95">
                            Contact Support
                        </Link>
                        <button className="border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:border-red-600 hover:text-red-600 transition-all active:scale-95">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ServiceCard({ icon: Icon, title, desc }: any) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">{title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-red-50 text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-lg font-bold text-slate-800">{text}</p>
        </div>
    );
}
