"use client";

import { useParams } from "next/navigation";
import { useGetOrderDetailsQuery } from "@/store/api/frontendApi";
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    MapPin,
    Phone,
    User,
    Calendar,
    ArrowLeft,
    AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function OrderDetailsPage() {
    const { orderNumber } = useParams();
    const { data, isLoading, error } = useGetOrderDetailsQuery(orderNumber as string);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        );
    }

    if (error || !data?.success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-black text-slate-800 uppercase mb-2">Order Not Found</h1>
                <p className="text-slate-500 mb-6">We couldn't find the order you're looking for.</p>
                <Link href="/" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 transition-colors">
                    Back to Shopping
                </Link>
            </div>
        );
    }

    const order = data.order;

    const statusConfig: Record<string, { icon: any, color: string, label: string }> = {
        'pending': { icon: Clock, color: 'text-amber-500', label: 'Pending' },
        'processing': { icon: Package, color: 'text-blue-500', label: 'Processing' },
        'shipped': { icon: Truck, color: 'text-purple-500', label: 'Shipped' },
        'delivered': { icon: CheckCircle2, color: 'text-green-500', label: 'Delivered' },
        'cancelled': { icon: AlertCircle, color: 'text-red-500', label: 'Cancelled' },
        'ready_delivery': { icon: Package, color: 'text-cyan-500', label: 'Ready for Delivery' },
        'on_hold': { icon: Clock, color: 'text-slate-500', label: 'On Hold' },
        'follow_up': { icon: Phone, color: 'text-indigo-500', label: 'Follow Up' },
        'call_not_received': { icon: Phone, color: 'text-orange-500', label: 'Call Not Received' },
    };

    const currentStatus = statusConfig[order.order_status] || statusConfig['pending'];

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors mb-4 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] uppercase font-black tracking-widest leading-none mt-1">Back to Home</span>
                        </Link>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                            Order <span className="text-red-500">#{order.order_number}</span>
                        </h1>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${currentStatus.color}`}>
                                <currentStatus.icon className="w-3.5 h-3.5" />
                                {currentStatus.label}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white border-2 border-slate-100 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-red-500 hover:text-red-500 transition-all shadow-sm">
                            Print Invoice
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Order Items */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-2 mb-6">
                                <Package className="w-5 h-5 text-red-500" />
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Order Items</h3>
                            </div>
                            <div className="space-y-6">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                                            <img
                                                src={item.product?.featured_image || "/placeholder.png"}
                                                className="w-full h-full object-cover"
                                                alt={item.product_name}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <h4 className="text-xs font-black text-slate-800 leading-tight uppercase mb-1 truncate">{item.product_name}</h4>
                                            {item.variation_details && (
                                                <div className="flex gap-2">
                                                    {Object.entries(item.variation_details).map(([key, val]: any) => (
                                                        <span key={key} className="text-[9px] font-black text-slate-400 uppercase tracking-tighter bg-white px-2 py-0.5 rounded border border-slate-100">
                                                            {key}: {val}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-400">Qty: {item.quantity}</span>
                                                <span className="text-xs font-black text-slate-900">৳ {item.unit_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Timeline */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-2 mb-8">
                                <Clock className="w-5 h-5 text-red-500" />
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Order Timeline</h3>
                            </div>
                            <div className="relative pl-8 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                                {order.status_logs.length > 0 ? (
                                    order.status_logs.map((log: any, index: number) => (
                                        <div key={log.id} className="relative group">
                                            <div className="absolute -left-[30px] top-0 w-6 h-6 rounded-full bg-white border-4 border-red-500/10 flex items-center justify-center z-10">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">{statusConfig[log.status]?.label || log.status}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                                                    {new Date(log.created_at).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                                                </p>
                                                {log.notes && (
                                                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-600 italic">
                                                        "{log.notes}"
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="relative group">
                                        <div className="absolute -left-[30px] top-0 w-6 h-6 rounded-full bg-white border-4 border-red-500/10 flex items-center justify-center z-10">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Order Placed</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                                                {new Date(order.created_at).toLocaleString()}
                                            </p>
                                            <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-600 italic">
                                                Order was successfully placed and is pending verification.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Order Summary */}
                        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl text-white">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Order Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="text-white font-black font-sans tracking-tight text-sm">৳ {order.total_amount - order.shipping_cost}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                                    <span>Shipping</span>
                                    <span className="text-white font-black font-sans tracking-tight text-sm">৳ {order.shipping_cost}</span>
                                </div>
                                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Grand Total</span>
                                    <span className="text-2xl font-black font-sans tracking-tighter">৳ {order.total_amount}</span>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Payment Method</span>
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-widest py-1 px-3 rounded-lg bg-slate-800 text-slate-200">
                                    {order.payment_method === 'cod' ? 'Cash On Delivery' : order.payment_method}
                                </span>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <User className="w-4 h-4 text-red-500" />
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Customer</h3>
                                </div>
                                <p className="text-[11px] font-black text-slate-800 uppercase">{order.customer_name}</p>
                                <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-slate-400">
                                    <Phone className="w-3.5 h-3.5" />
                                    {order.customer_phone}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-4 h-4 text-red-500" />
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Shipping Address</h3>
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic">
                                    {order.shipping_address}
                                </p>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-red-50 rounded-3xl p-6 border-2 border-red-100">
                            <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-3">Need Help?</h3>
                            <p className="text-[10px] font-bold text-red-500/70 mb-4 leading-relaxed uppercase">
                                Having issues with your order? Our support team is here to help 24/7.
                            </p>
                            <button className="w-full bg-white border-2 border-red-200 py-3 rounded-2xl text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                                Chat with Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
