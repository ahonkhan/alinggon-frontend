"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const navItems = [
        { label: "Home", href: "/" },
        { label: "Watches", href: "/shop?category=Accessories" },
        { label: "Belt", href: "/shop?category=Accessories" },
        { label: "Wallet", href: "/shop?category=Man" },
        { label: "Sunglass", href: "/shop?category=Accessories" },
        { label: "Shop", href: "/shop" },
        { label: "Man", href: "/shop?category=Man" },
        { label: "Women", href: "/shop?category=Women" },
        { label: "Electronics", href: "/shop?category=Gadget" },
        { label: "Gadgets", href: "/shop?category=Gadget" },
        { label: "Track Order", href: "/track-order" },
    ];

    return (
        <nav className="bg-red-400 text-white shadow-sm hidden lg:block border-t border-white/10 uppercase tracking-[0.15em]">
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex items-center space-x-6 text-[10px] font-black py-3">
                    {navItems.map((item) => (
                        <li key={item.label} className="flex items-center gap-1 cursor-pointer text-white hover:text-red-50 transition-colors">
                            <Link href={item.href} className="flex items-center gap-1">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
