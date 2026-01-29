"use client";

import { Trash2, Minus, Plus, Phone, Gift, ShoppingBag, CreditCard, MessageCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const shippingCharge = cart.length > 0 ? 80 : 0;
    const total = cartTotal + shippingCharge;

    const handleConfirmOrder = async () => {
        if (cart.length === 0) return;

        setIsSubmitting(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate a mock order ID
        const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Clear cart and redirect
        clearCart();
        setIsSubmitting(false);
        router.push(`/order-success?id=${orderId}`);
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 bg-gray-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-4">
                    <Link href="/shop" className="p-2 bg-white rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tighter">
                        Checkout <span className="text-red-400 block text-xs tracking-widest mt-1 font-bold">Secure Payment Pathway</span>
                    </h1>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Online</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Side: Order Review & Payment */}
                <div className="lg:col-span-7 space-y-8">

                    {/* Shopping Bag Section */}
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
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ShoppingBag className="w-10 h-10 text-gray-200" />
                                    </div>
                                    <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-6">Your bag is currently empty</p>
                                    <Link href="/shop" className="inline-block bg-red-400 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 transition-all shadow-lg active:scale-95">
                                        Browse Shop
                                    </Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-50">
                                    {cart.map((item) => (
                                        <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex gap-6 group">
                                            <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-inner group-hover:scale-105 transition-transform">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col min-w-0">
                                                <div className="flex justify-between items-start gap-4">
                                                    <h4 className="text-sm md:text-base font-black text-slate-800 line-clamp-1 leading-tight group-hover:text-red-500 transition-colors">
                                                        {item.name}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors p-2 bg-gray-50 rounded-xl hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-gray-500 mt-1 uppercase font-black tracking-widest">
                                                    Price: {item.price}৳ each
                                                </p>

                                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                                    <div className="flex border-2 border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm font-sans">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 border-r-2 border-gray-100 flex items-center active:scale-90 transition-all">
                                                            <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                                                        </button>
                                                        <input type="text" value={item.quantity} className="w-10 text-center text-xs font-black text-slate-900 focus:outline-none bg-white" readOnly />
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
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

                        {cart.length > 0 && (
                            <div className="bg-slate-50/50 p-6 border-t border-gray-100 italic text-[10px] text-gray-400 font-medium text-center">
                                Taxes and discounts are calculated at the next step if applicable.
                            </div>
                        )}
                    </div>

                    {/* Payment Methods */}
                    {cart.length > 0 && (
                        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-slate-100/50 overflow-hidden">
                            <div className="bg-gray-50 px-8 py-5 border-b border-gray-100">
                                <h3 className="font-black text-gray-800 text-sm uppercase tracking-widest">Select Payment Method</h3>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="relative">
                                    <input type="radio" id="cod" name="payment" value="cod" className="peer hidden" defaultChecked />
                                    <label htmlFor="cod" className="flex items-center gap-4 p-5 border-2 border-gray-100 rounded-3xl cursor-pointer peer-checked:border-red-400 peer-checked:bg-red-50/50 hover:border-red-200 transition-all shadow-sm">
                                        <div className="w-6 h-6 rounded-full border-4 border-white ring-2 ring-gray-200 flex items-center justify-center peer-checked:ring-red-400 bg-white shadow-inner">
                                            <div className="w-2.5 h-2.5 bg-red-400 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                                        </div>
                                        <div>
                                            <span className="text-sm font-black text-slate-800 uppercase tracking-tighter">Cash on Delivery</span>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Pay after you receive your items</p>
                                        </div>
                                    </label>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Digital Wallets</h4>
                                    <div className="grid grid-cols-3 gap-4 font-sans">
                                        {['bkash', 'nagad', 'rocket'].map((wallet) => (
                                            <div key={wallet} className="relative">
                                                <input type="radio" id={wallet} name="payment" value={wallet} className="peer hidden" />
                                                <label htmlFor={wallet} className="flex flex-col items-center justify-center gap-2 p-4 h-24 border-2 border-gray-100 rounded-3xl cursor-pointer peer-checked:border-red-400 peer-checked:bg-red-50/50 hover:border-red-200 transition-all group active:scale-95 shadow-sm">
                                                    <div className="w-10 h-10 rounded-full border border-gray-100 bg-white p-2 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                        <img src={`https://www.google.com/s2/favicons?domain=${wallet === 'bkash' ? 'bkash.com' : wallet === 'nagad' ? 'nagad.com.bd' : 'dutchbanglabank.com'}&sz=128`} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 peer-checked:grayscale-0 transition-all" alt={wallet} />
                                                    </div>
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-400 peer-checked:text-red-500">{wallet}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-[10px] text-gray-400 font-medium italic leading-relaxed text-center px-4">
                                    Your personal data will be used to process your order, support your experience throughout this website.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Shipping Details */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-slate-100/50 overflow-hidden sticky top-32">
                        <div className="bg-slate-900 px-8 py-5 border-b border-gray-100">
                            <h3 className="font-black text-white text-sm uppercase tracking-widest">Order Summary</h3>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="space-y-3 font-sans">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <span>Items Subtotal</span>
                                    <span className="text-slate-900">৳ {cartTotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <span>Shipping (Flat Rate)</span>
                                    <span className="text-slate-900">৳ {shippingCharge}</span>
                                </div>
                                <div className="pt-6 mt-4 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
                                    <span className="text-base font-black text-slate-900 uppercase tracking-tighter">Total Price</span>
                                    <span className="text-3xl font-black text-red-500 tracking-tighter">৳ {total}</span>
                                </div>
                            </div>

                            <div className="pt-8 space-y-5 border-t border-gray-100">
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Shipping Details</label>
                                    <input type="text" placeholder="Full Name" className="w-full h-14 px-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all shadow-inner outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <input type="text" placeholder="Street Address / Area" className="w-full h-14 px-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all shadow-inner outline-none" />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" placeholder="Phone Number" className="w-full h-14 pl-12 pr-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all shadow-inner outline-none font-sans" />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Select Delivery Zone</h4>
                                    <div className="flex flex-col gap-3">
                                        <label className="flex items-center justify-between p-4 bg-gray-50 border-2 border-transparent rounded-2xl cursor-pointer hover:border-gray-200 transition-all font-sans group has-[:checked]:border-red-400 has-[:checked]:bg-white shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="area" value="inside" className="w-4 h-4 accent-red-400" defaultChecked />
                                                <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">Inside Dhaka</span>
                                            </div>
                                            <span className="text-xs font-black text-slate-900">৳80</span>
                                        </label>
                                        <label className="flex items-center justify-between p-4 bg-gray-50 border-2 border-transparent rounded-2xl cursor-pointer hover:border-gray-200 transition-all font-sans group has-[:checked]:border-red-400 has-[:checked]:bg-white shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="area" value="outside" className="w-4 h-4 accent-red-400" />
                                                <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">Outside Dhaka</span>
                                            </div>
                                            <span className="text-xs font-black text-slate-900">৳120</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    onClick={handleConfirmOrder}
                                    disabled={cart.length === 0 || isSubmitting}
                                    className="w-full bg-red-400 hover:bg-red-500 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-black h-16 rounded-3xl shadow-xl shadow-red-200/50 transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 active:scale-95 group overflow-hidden relative"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <span className="relative z-10">Confirm Order Now</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                                        </>
                                    )}
                                </button>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center mt-6 flex items-center justify-center gap-2">
                                    <CreditCard className="w-3 h-3" />
                                    Safe & Encrypted Checkout
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-3xl p-8 text-white shadow-2xl flex items-center gap-6 group overflow-hidden relative">
                        <div className="absolute -right-4 -bottom-4 opacity-10 transform scale-150 rotate-12 group-hover:scale-175 transition-transform">
                            <Gift className="w-32 h-32" />
                        </div>
                        <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white/30 transition-colors shadow-xl">
                            <Gift className="w-10 h-10" />
                        </div>
                        <div>
                            <h4 className="font-black text-lg tracking-tighter uppercase leading-none mb-1">Flash Promo!</h4>
                            <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Free delivery on orders above ৳2000</p>
                            <div className="w-48 bg-white/20 h-2 rounded-full mt-4 overflow-hidden border border-white/10 shadow-inner">
                                <div className="h-full bg-white w-[60%] animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
