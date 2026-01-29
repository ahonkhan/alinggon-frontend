"use client";

import Link from "next/link";
import AccountSidebar from "@/components/AccountSidebar";
import { Package, ChevronRight, Search, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Orders() {
    const orders = [
        { id: "ORD-55214BD", date: "Jan 20, 2026", items: 2, status: "Processing", amount: 1250, statusType: "processing" },
        { id: "ORD-54882AC", date: "Jan 15, 2026", items: 1, status: "Delivered", amount: 450, statusType: "delivered" },
        { id: "ORD-54110EF", date: "Jan 02, 2026", items: 3, status: "Canceled", amount: 2100, statusType: "canceled" },
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-gray-50/30">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <AccountSidebar />

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                        <div className="px-10 py-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gray-50/30">
                            <div className="flex items-center gap-4">
                                <div className="bg-red-400 p-3 rounded-2xl text-white shadow-lg">
                                    <Package className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">My Order Vault</h1>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Manage and track your recent transactions</p>
                                </div>
                            </div>

                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder="Search Order ID..." className="w-full h-11 pl-12 pr-4 rounded-xl bg-white border border-gray-200 focus:border-red-400 focus:outline-none text-xs font-bold transition-all shadow-sm" />
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left font-sans">
                                    <thead>
                                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-6">
                                            <th className="pb-6 px-4">Order Identity</th>
                                            <th className="pb-6 px-4">Placement Date</th>
                                            <th className="pb-6 px-4 text-center">Qty</th>
                                            <th className="pb-6 px-4">Current Status</th>
                                            <th className="pb-6 px-4 text-right">Investment</th>
                                            <th className="pb-6 px-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="group hover:bg-gray-50/30 transition-all">
                                                <td className="py-6 px-4">
                                                    <span className="text-sm font-black text-slate-900 group-hover:text-red-500 transition-colors">#{order.id}</span>
                                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Digital Order</div>
                                                </td>
                                                <td className="py-6 px-4 text-xs font-bold text-gray-500 uppercase">{order.date}</td>
                                                <td className="py-6 px-4 text-center">
                                                    <span className="bg-gray-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-black">{order.items} Items</span>
                                                </td>
                                                <td className="py-6 px-4">
                                                    <StatusBadge type={order.statusType} label={order.status} />
                                                </td>
                                                <td className="py-6 px-4 text-sm font-black text-slate-900 text-right tracking-tight">৳ {order.amount.toLocaleString()}</td>
                                                <td className="py-6 px-4 text-right">
                                                    <Link
                                                        href={`/orders/${order.id}`}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-red-400 text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-slate-100 group-hover:-translate-y-0.5"
                                                    >
                                                        Details <ChevronRight className="w-3.5 h-3.5" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Enhanced Pagination */}
                            <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-6 border-t border-gray-50 pt-10">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing 1 to 3 of 3 orders</p>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-xs font-black bg-red-400 text-white shadow-xl shadow-red-200/50">1</button>
                                    <button className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-xs font-black text-slate-400 hover:bg-gray-50 hover:text-slate-900 transition-all shadow-sm">2</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-red-400/20 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-110 transition-transform"></div>
                        <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                            <div className="bg-white/10 p-5 rounded-[2rem] border border-white/10 shadow-xl">
                                <Clock className="w-8 h-8 text-red-400" />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-xl font-black uppercase tracking-tight mb-2">Realtime Order Tracking</h3>
                                <p className="text-white/60 text-xs font-medium max-w-sm leading-relaxed uppercase tracking-widest">Connect with our logistics cloud to see precisely where your package is at this moment.</p>
                            </div>
                            <Link href="/track-order" className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-400 hover:text-white transition-all shadow-xl active:scale-95">
                                Live Tracking
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function StatusBadge({ type, label }: { type: string; label: string }) {
    const styles: any = {
        processing: "bg-amber-50 text-amber-500 border-amber-100",
        delivered: "bg-green-50 text-green-500 border-green-100",
        canceled: "bg-gray-50 text-gray-400 border-gray-100",
    };

    const Icons: any = {
        processing: <Clock className="w-3 h-3" />,
        delivered: <CheckCircle className="w-3 h-3" />,
        canceled: <XCircle className="w-3 h-3" />,
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] font-black uppercase tracking-tighter ${styles[type] || styles.processing}`}>
            {Icons[type]}
            {label}
        </span>
    );
}
