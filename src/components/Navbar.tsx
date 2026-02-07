"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const navItems = [
        { label: "Home", href: "/" },
        { label: "About Admin", href: "/about" },
        { label: "Categories", href: "/categories" },
        { label: "Shop", href: "/shop" },
        { label: "Customer Review", href: "/reviews" },
    ];

    return (
        <nav className="bg-red-400 text-white shadow-sm hidden lg:block border-t border-white/10 uppercase tracking-[0.15em]">
            <div className="max-w-[1440px] mx-auto px-4">
                <ul className="flex items-center justify-center space-x-6 text-[10px] font-black py-3">
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
