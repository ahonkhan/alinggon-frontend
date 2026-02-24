"use client";

import { Trash2, Minus, Plus, Phone, ShoppingBag, CreditCard, ArrowLeft, Loader2, MapPin, User, Mail } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlaceOrderMutation } from "@/store/api/frontendApi";
import { useToast } from "@/context/ToastContext";

export default function Checkout() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [placeOrder] = usePlaceOrderMutation();
    const { showToast } = useToast();
    const router = useRouter();

    const [formData, setFormData] = useState({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        shipping_address: "",
        notes: "",
    });

    const [shippingZone, setShippingZone] = useState<"inside" | "outside">("inside");
    const shippingCharge = cart.length > 0 ? (shippingZone === "inside" ? 80 : 120) : 0;
    const total = cartTotal + shippingCharge;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;

        if (!formData.customer_name || !formData.customer_phone || !formData.shipping_address) {
            showToast("Please fill in all required fields", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const orderData = {
                ...formData,
                shipping_cost: shippingCharge,
                items: cart.map(item => ({
                    product_id: item.id,
                    variation_combination_id: item.variation_combination_id,
                    quantity: item.quantity
                }))
            };

            const response = await placeOrder(orderData).unwrap();

            if (response.success) {
                showToast("Order placed successfully!", "success");
                clearCart();
                router.push(`/orders/${response.order.order_number}`);
            } else {
                showToast(response.message || "Failed to place order", "error");
            }
        } catch (error: any) {
            showToast(error?.data?.message || "Something went wrong", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 bg-gray-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-4">
                    <Link href="/shop" className="p-2 bg-white rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tighter">
                        Checkout <span className="text-red-400 block text-xs tracking-widest mt-1 font-bold">Cash on Delivery Available</span>
                    </h1>
                </div>
            </div>

            <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Side: Order Review */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-slate-100/50 overflow-hidden">
                        <div className="bg-slate-900 px-8 py-5 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-red-400" />
                                <h3 className="font-bold text-sm uppercase tracking-widest">Items in Bag</h3>
                            </div>
                            <span className="bg-white/10 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                                {cart.length} Products
                            </span>
                        </div>

                        <div className="p-8">
                            {cart.length === 0 ? (
                                <div className="text-center py-20 px-10">
                                    <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-6">Your bag is currently empty</p>
                                    <Link href="/shop" className="inline-block bg-red-400 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 transition-all shadow-lg active:scale-95">
                                        Browse Shop
                                    </Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-50">
                                    {cart.map((item) => (
                                        <div key={item.cartItemId} className="py-6 first:pt-0 last:pb-0 flex gap-6 group">
                                            <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-inner group-hover:scale-105 transition-transform">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col min-w-0">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <h4 className="text-sm font-black text-slate-800 line-clamp-1 leading-tight group-hover:text-red-500 transition-colors">
                                                            {item.name}
                                                        </h4>
                                                        {item.variation_details && (
                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                {Object.entries(item.variation_details).map(([key, val]) => (
                                                                    <span key={key} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black uppercase tracking-tighter">
                                                                        {key}: {val}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.cartItemId)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors p-2 bg-gray-50 rounded-xl hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                                    <div className="flex border-2 border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm font-sans">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 border-r-2 border-gray-100 flex items-center active:scale-90 transition-all">
                                                            <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                                                        </button>
                                                        <span className="w-10 text-center text-xs font-black text-slate-900 py-1.5">{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 border-l-2 border-gray-100 flex items-center active:scale-90 transition-all">
                                                            <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                    <span className="text-lg font-black text-slate-900 font-sans tracking-tighter">৳ {item.price * item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Method - Only COD as per request */}
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-slate-100/50 overflow-hidden">
                        <div className="bg-gray-50 px-8 py-5 border-b border-gray-100">
                            <h3 className="font-black text-gray-800 text-sm uppercase tracking-widest">Payment Method</h3>
                        </div>
                        <div className="p-8">
                            <div className="relative">
                                <label className="flex items-center gap-4 p-5 border-2 border-red-400 bg-red-50/50 rounded-3xl cursor-default transition-all shadow-sm">
                                    <div className="w-6 h-6 rounded-full border-4 border-white ring-2 ring-red-400 bg-red-400 shadow-inner flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <span className="text-sm font-black text-slate-800 uppercase tracking-tighter">Cash on Delivery</span>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Pay after you receive your items</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Shipping Details */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-slate-100/50 overflow-hidden sticky top-8">
                        <div className="bg-slate-900 px-8 py-5 border-b border-gray-100">
                            <h3 className="font-black text-white text-sm uppercase tracking-widest">Shipping & Review</h3>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Customer Information</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="customer_name"
                                            value={formData.customer_name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Full Name *"
                                            className="w-full h-14 pl-12 pr-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all shadow-inner outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="customer_phone"
                                        value={formData.customer_phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Phone Number *"
                                        className="w-full h-14 pl-12 pr-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all shadow-inner outline-none font-sans"
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        name="customer_email"
                                        value={formData.customer_email}
                                        onChange={handleInputChange}
                                        placeholder="Email Address (Optional)"
                                        className="w-full h-14 pl-12 pr-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all shadow-inner outline-none font-sans"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-5 w-4 h-4 text-gray-400" />
                                        <textarea
                                            name="shipping_address"
                                            value={formData.shipping_address}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Shipping Address *"
                                            className="w-full min-h-[100px] pl-12 pr-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all shadow-inner outline-none resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Delivery Zone</h4>
                                    <div className="flex flex-col gap-3">
                                        <label className={`flex items-center justify-between p-4 bg-gray-50 border-2 rounded-2xl cursor-pointer transition-all font-sans ${shippingZone === "inside" ? 'border-red-400 bg-white' : 'border-transparent hover:border-gray-200'}`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="area"
                                                    checked={shippingZone === "inside"}
                                                    onChange={() => setShippingZone("inside")}
                                                    className="w-4 h-4 accent-red-400"
                                                />
                                                <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">Inside Dhaka</span>
                                            </div>
                                            <span className="text-xs font-black text-slate-900">৳80</span>
                                        </label>
                                        <label className={`flex items-center justify-between p-4 bg-gray-50 border-2 rounded-2xl cursor-pointer transition-all font-sans ${shippingZone === "outside" ? 'border-red-400 bg-white' : 'border-transparent hover:border-gray-200'}`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="area"
                                                    checked={shippingZone === "outside"}
                                                    onChange={() => setShippingZone("outside")}
                                                    className="w-4 h-4 accent-red-400"
                                                />
                                                <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">Outside Dhaka</span>
                                            </div>
                                            <span className="text-xs font-black text-slate-900">৳120</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-100 space-y-3 font-sans">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-slate-900">৳ {cartTotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-slate-900">৳ {shippingCharge}</span>
                                </div>
                                <div className="pt-6 mt-4 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
                                    <span className="text-base font-black text-slate-900 uppercase tracking-tighter">Total Price</span>
                                    <span className="text-3xl font-black text-red-500 tracking-tighter">৳ {total}</span>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={cart.length === 0 || isSubmitting}
                                    className="w-full bg-slate-900 hover:bg-black disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-black h-16 rounded-3xl shadow-xl shadow-slate-200/50 transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 active:scale-95 group overflow-hidden relative"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <span className="relative z-10">Confirm Order (COD)</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                                        </>
                                    )}
                                </button>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center mt-6 flex items-center justify-center gap-2">
                                    <CreditCard className="w-3 h-3" />
                                    Security Verified Transaction
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
}
