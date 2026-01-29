"use client";

import { use } from "react";
import { ArrowLeft, CreditCard, ShoppingBag, Truck, Package, Calendar, MapPin, ChevronRight, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import AccountSidebar from "@/components/AccountSidebar";

export default function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const orderItems = [
        { id: "p1", name: "Smart Hand Fan cute handheld cooling Mini Fan", price: 300, quantity: 1, image: "https://sc04.alicdn.com/kf/H55a43588f00045e7834a366e6097d8e87.jpg" },
        { id: "p2", name: "FLH-E88 Max Mini Drone, Duel Camera", price: 950, quantity: 1, image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/30104e3c-5eea-4b93-93e9-5313698a7156_1600w.webp" },
    ];

    const subtotal = 1250;
    const shipping = 80;
    const total = 1330;

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-gray-50/30">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <AccountSidebar />

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-10">

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                        {/* Header */}
                        <div className="px-10 py-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-400/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="relative z-10 flex items-center gap-4">
                                <Link href="/orders" className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-all group">
                                    <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                                </Link>
                                <div>
                                    <h1 className="text-2xl font-black uppercase tracking-tighter">Order Intelligence</h1>
                                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-1">Order Identifier: #{id}</p>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-center gap-3">
                                <span className="px-4 py-1.5 bg-red-400 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-red-400/20">
                                    In Progress
                                </span>
                            </div>
                        </div>

                        <div className="p-10">
                            {/* Status Overview cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                                <InfoCard icon={Calendar} label="Placed Date" value="Jan 20, 2026" />
                                <InfoCard icon={CreditCard} label="Payment Via" value="Cash On Delivery" />
                                <InfoCard icon={Truck} label="Logistics" value="Pathao Express" />
                            </div>

                            {/* Items List */}
                            <div className="space-y-8">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">
                                    Order Payload ({orderItems.length})
                                </h4>

                                {orderItems.map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row gap-6 border-b border-gray-50 pb-8 last:border-0 group">
                                        <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-inner group-hover:scale-105 transition-all">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                        </div>
                                        <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div>
                                                <h5 className="text-sm font-black text-slate-800 hover:text-red-400 transition-colors cursor-pointer leading-tight mb-2">
                                                    {item.name}
                                                </h5>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    Quantity: <span className="text-slate-900">{item.quantity}</span> • Unit Price: <span className="text-slate-900">৳ {item.price}</span>
                                                </p>
                                            </div>
                                            <div className="text-lg font-black text-slate-900 tracking-tighter font-sans">
                                                ৳ {item.price * item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tracking / Address / Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 bg-gray-50/50 p-10 rounded-[2rem] border border-gray-100">
                                <div className="space-y-8">
                                    <div>
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-red-400" /> Destination Intelligence
                                        </h5>
                                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                                            <p className="text-sm font-black text-slate-800">Karim Ullah</p>
                                            <p className="text-xs font-bold text-gray-500 leading-relaxed uppercase tracking-tight">
                                                House 24, Road 7, Block D<br />
                                                Mirpur 10, Dhaka<br />
                                                Contact: 01712345678
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Live Status</p>
                                            <p className="text-sm font-black text-slate-800">Warehouse Dispatched</p>
                                        </div>
                                        <Link href="/track-order" className="ml-auto p-2 bg-gray-50 hover:bg-red-400 hover:text-white rounded-lg transition-all">
                                            <ChevronRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Fiscal Summary</h5>
                                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4 font-sans">
                                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <span>Core Subtotal</span>
                                            <span className="text-slate-900">৳ {subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <span>Shipping Flat</span>
                                            <span className="text-slate-900">৳ {shipping}</span>
                                        </div>
                                        <div className="pt-6 mt-4 border-t-2 border-dashed border-gray-50 flex justify-between items-center">
                                            <span className="text-sm font-black text-slate-900 uppercase tracking-tighter">Net Payable</span>
                                            <span className="text-3xl font-black text-red-500 tracking-tighter">৳ {total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-400 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125"></div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="bg-white/20 p-4 rounded-[2rem] border border-white/20 shadow-xl">
                                    <ShoppingBag className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">Need Assistance?</h3>
                                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-1">Our support team is 24/7 dedicated for you</p>
                                </div>
                            </div>
                            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl active:scale-95">
                                Live Concierge
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

function InfoCard({ icon: Icon, label, value }: any) {
    return (
        <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-2xl flex items-center gap-4 group hover:bg-white transition-all hover:shadow-xl hover:shadow-slate-100">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-400 shadow-sm border border-gray-50 group-hover:bg-red-400 group-hover:text-white transition-all">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-sm font-black text-slate-800 tracking-tight">{value}</p>
            </div>
        </div>
    );
}
