"use client";

import { X, ChevronRight, Smartphone, Utensils, Tablet, Shirt, Gem, Leaf, Sparkles, Watch, Home, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    if (!isOpen) return null;

    const categories = [
        { label: "Gadget", icon: Smartphone },
        { label: "Food", icon: Utensils },
        { label: "Mobile", icon: Tablet },
        { label: "Man", icon: Shirt },
        { label: "Women", icon: Gem },
        { label: "Organic", icon: Leaf },
        { label: "Kuri", icon: Sparkles },
        { label: "Accessories", icon: Watch },
    ];

    const quickLinks = [
        { label: "Home", href: "/", icon: Home },
        { label: "Shop", href: "/shop", icon: ShoppingBag },
        { label: "Track Order", href: "/track-order", icon: Truck },
    ];

    return (
        <div className="fixed inset-0 z-[110] lg:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-[280px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <Link href="/" onClick={onClose} className="flex items-center gap-2">
                        <div className="bg-red-400 text-white p-1 rounded">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Alinggon</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Links */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-6">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-2">Navigation</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {quickLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-bold text-slate-700 transition-all"
                                    >
                                        <link.icon className="w-4 h-4 text-red-400" />
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-2">Categories</h3>
                            <div className="grid grid-cols-1 gap-1">
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.label}
                                        href="/shop"
                                        onClick={onClose}
                                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-bold text-slate-600 group transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <cat.icon className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                                            <span>{cat.label}</span>
                                        </div>
                                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-400 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <Link href="/login" onClick={onClose} className="w-full bg-slate-900 text-white font-black h-12 rounded-xl flex items-center justify-center text-xs uppercase tracking-widest mb-3">
                        Log In
                    </Link>
                    <p className="text-[9px] text-gray-400 font-bold uppercase text-center tracking-tighter">
                        &copy; 2026 Alinggon. Premium Quality.
                    </p>
                </div>
            </div>
        </div>
    );
}
