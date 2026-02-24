"use client";

import { useState } from "react";
import { useLazyTrackOrderQuery } from "@/store/api/frontendApi";
import { Search, Package, Phone, AlertCircle, ArrowRight, Clock, MapPin, Calendar, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function TrackingPage() {
    const [orderNumber, setOrderNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [trigger, { data, isFetching, error }] = useLazyTrackOrderQuery();

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone) {
            trigger({ orderNumber, phone });
        }
    };

    const statusConfig: Record<string, { icon: any, color: string, label: string, bg: string }> = {
        'pending': { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Pending' },
        'processing': { icon: Package, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Processing' },
        'shipped': { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Shipped' },
        'delivered': { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', label: 'Delivered' },
        'cancelled': { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Cancelled' },
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                        Track Your <span className="text-red-500">Order</span>
                    </h1>
                    <p className="text-[11px] uppercase font-black tracking-widest text-slate-400 max-w-md mx-auto leading-relaxed">
                        Enter your phone number to track your latest order in real-time
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-10">
                    <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Order Number (Optional)</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                    placeholder="ORD-XXXXXXXX"
                                />
                                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                            <div className="relative">
                                <input
                                    type="tel" required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                    placeholder="01XXXXXXXXX"
                                />
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isFetching}
                            className="md:col-span-2 h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {isFetching ? "Locating Order..." : (
                                <>
                                    <span>Track Now</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="bg-red-50 rounded-3xl p-6 border-2 border-red-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                        <div>
                            <h4 className="text-xs font-black text-red-600 uppercase tracking-widest">No Order Found</h4>
                            <p className="text-[10px] font-bold text-red-500/70 uppercase">Please check your phone number for accuracy.</p>
                        </div>
                    </div>
                )}

                {data?.success && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full blur-[100px] opacity-10 -mr-32 -mt-32"></div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">Order Tracking Results</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(data.order.created_at).toLocaleDateString()}
                                        </span>
                                        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${statusConfig[data.order.order_status]?.color || 'text-white'}`}>
                                            {statusConfig[data.order.order_status]?.label || data.order.order_status}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href={`/orders/${data.order.order_number}`}
                                    className="bg-white/10 hover:bg-red-500 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-md"
                                >
                                    View Full Details
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                            <UserIcon className="w-4 h-4 text-red-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer</p>
                                            <p className="text-xs font-black uppercase">{data.order.customer_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-4 h-4 text-red-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Shipping Address</p>
                                            <p className="text-xs font-bold text-slate-300 italic line-clamp-2">{data.order.shipping_address}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Status</p>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl ${statusConfig[data.order.order_status]?.bg || 'bg-white/10'}`}>
                                            {(() => {
                                                const Icon = statusConfig[data.order.order_status]?.icon || Package;
                                                return <Icon className={`w-10 h-10 ${statusConfig[data.order.order_status]?.color || 'text-white'}`} />;
                                            })()}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black uppercase tracking-tight">{statusConfig[data.order.order_status]?.label}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Updated: {new Date(data.order.updated_at).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function UserIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    )
}
