"use client";

import { useGetMyOrdersQuery } from "@/store/api/frontendApi";
import {
    ShoppingBag,
    ChevronRight,
    Package,
    Truck,
    CheckCircle2,
    Clock,
    Search,
    Filter
} from "lucide-react";
import Link from "next/link";

export default function MyOrdersPage() {
    const { data, isLoading, error } = useGetMyOrdersQuery();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        );
    }

    const statusConfig: Record<string, { color: string, label: string, bg: string }> = {
        'pending': { color: 'text-amber-600', bg: 'bg-amber-50', label: 'Pending' },
        'processing': { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Processing' },
        'shipped': { color: 'text-purple-600', bg: 'bg-purple-50', label: 'Shipped' },
        'delivered': { color: 'text-green-600', bg: 'bg-green-50', label: 'Delivered' },
        'cancelled': { color: 'text-red-600', bg: 'bg-red-50', label: 'Cancelled' },
        'ready_delivery': { color: 'text-cyan-600', bg: 'bg-cyan-50', label: 'Ready for delivery' },
        'on_hold': { color: 'text-slate-600', bg: 'bg-slate-50', label: 'On Hold' },
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                            My <span className="text-red-500">Orders</span>
                        </h1>
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-2">
                            Manage and track your recent purchases
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by Order ID..."
                                className="h-12 pl-12 pr-6 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:border-red-500 transition-all w-full md:w-64"
                            />
                        </div>
                    </div>
                </div>

                {!data?.orders || data.orders.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-20 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-10 h-10 text-slate-200" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">No Orders Found</h3>
                        <p className="text-sm font-medium text-slate-500 mb-8 max-w-xs uppercase">
                            It looks like you haven't placed any orders yet.
                        </p>
                        <Link href="/" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.15em] hover:bg-red-500 transition-all shadow-xl active:scale-95">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data.orders.map((order: any) => {
                            const status = statusConfig[order.order_status] || statusConfig['pending'];
                            return (
                                <Link
                                    key={order.id}
                                    href={`/orders/${order.order_number}`}
                                    className="block bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-red-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                                                <Package className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="text-sm font-black text-slate-900 uppercase">#{order.order_number}</h4>
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                                    <span>•</span>
                                                    <span>{order.items.length} Items</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between md:justify-end gap-10 border-t md:border-t-0 pt-4 md:pt-0">
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                                                <p className="text-xl font-black text-slate-900 tracking-tighter">৳ {order.total_amount}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
