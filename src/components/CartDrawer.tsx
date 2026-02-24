"use client";

import { X, ShoppingBag, Trash2, Minus, Plus, ArrowRight, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
    const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[500] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 transition-opacity"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-red-400" />
                        <span className="font-bold text-slate-800 uppercase text-[10px] tracking-widest leading-none mt-1">Shopping Bag</span>
                        <span className="bg-red-50 text-red-500 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                            {cart.length} Objects
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {cart.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="p-2 text-gray-300 hover:text-red-400 transition-colors group"
                                title="Clear All Items"
                            >
                                <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            </button>
                        )}
                        <button
                            onClick={closeCart}
                            className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-xl transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-100">
                            <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl shadow-slate-100 mb-4 scale-110">
                                <ShoppingBag className="w-10 h-10 text-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Bag is Empty</p>
                                <button
                                    onClick={closeCart}
                                    className="text-red-400 text-xs font-black uppercase hover:text-slate-900 transition-colors tracking-tighter"
                                >
                                    Explore Catalog
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.cartItemId} className="flex gap-4 group bg-white p-3 rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-xl hover:shadow-slate-100/50 transition-all">
                                    <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0 p-1">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <h4 className="text-[11px] font-black text-slate-800 truncate leading-tight hover:text-red-400">
                                                    {item.name}
                                                </h4>
                                                {item.variation_details && (
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {Object.entries(item.variation_details).map(([key, val]) => (
                                                            <span key={key} className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
                                                                {key}: {val}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.cartItemId)}
                                                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-widest font-sans">Unit: ৳ {item.price}</p>
                                        <div className="mt-auto flex items-center justify-between pt-2">
                                            <div className="flex border-2 border-gray-50 rounded-lg bg-gray-50/50 overflow-hidden origin-left">
                                                <button
                                                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                    className="px-2 py-1 hover:bg-white text-gray-400 hover:text-red-400 transition-colors flex items-center"
                                                >
                                                    <Minus className="w-3 h-3" strokeWidth={3} />
                                                </button>
                                                <span className="w-8 text-center text-[11px] font-black text-slate-900 flex items-center justify-center font-sans">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-white text-gray-400 hover:text-red-400 transition-colors flex items-center"
                                                >
                                                    <Plus className="w-3 h-3" strokeWidth={3} />
                                                </button>
                                            </div>
                                            <span className="text-sm font-black text-red-500 font-sans tracking-tight">৳ {item.price * item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-white space-y-6">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <span>Bag Subtotal</span>
                            <span className="text-2xl font-black text-slate-900 font-sans tracking-tighter">৳ {cartTotal}</span>
                        </div>
                        <div className="space-y-3">
                            <Link
                                href="/checkout"
                                onClick={closeCart}
                                className="w-full bg-slate-900 hover:bg-red-400 text-white font-black h-14 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs group"
                            >
                                Procedural Checkout
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <button
                                onClick={closeCart}
                                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-400 font-black h-12 rounded-xl transition-all text-[9px] uppercase tracking-widest"
                            >
                                Continue Discovery
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
