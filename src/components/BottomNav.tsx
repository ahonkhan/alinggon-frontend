"use client";

import React, { useState, useEffect } from "react";
import { Home, Grid, ShoppingCart, User, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function BottomNav() {
    const pathname = usePathname();
    const { cartCount, openCart } = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const navItems = [
        { label: "Home", icon: Home, href: "/" },
        { label: "Categories", icon: Grid, href: "/categories" },
        { label: "Search", icon: Search, href: "/shop" }, // Linking search to shop for now
        { label: "Cart", icon: ShoppingCart, onClick: openCart, badge: cartCount },
        { label: "Account", icon: User, href: "/profile" },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 w-full z-[100]">
            <div className="bg-slate-900/95 backdrop-blur-xl border-t border-white/10 rounded-t-[2rem] p-3 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] flex items-center justify-between gap-2 px-8 pb-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    if (item.onClick) {
                        return (
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                aria-label={item.label}
                                className="relative flex flex-col items-center gap-1 group transition-all"
                            >
                                <div className={`p-2.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-red-600 text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                {isMounted && item.badge > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-slate-900 animate-pulse">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.label}
                            href={item.href || "#"}
                            aria-label={item.label}
                            className="relative flex flex-col items-center gap-1 group transition-all"
                        >
                            <div className={`p-2.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-red-600 text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            {isActive && (
                                <div className="absolute -bottom-1 w-1 h-1 bg-red-600 rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
