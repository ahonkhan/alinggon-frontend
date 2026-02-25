"use client";

import { X, ChevronRight, Home, ShoppingBag, Truck, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetCategoriesQuery, CategoryData } from "@/store/api/frontendApi";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    if (!isOpen) return null;

    const { data: catData } = useGetCategoriesQuery();
    const categories: CategoryData[] = catData?.data || [];

    // Track which categories/subcategories are expanded in the accordion
    const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});

    const toggleExpand = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandedIds((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const quickLinks = [
        { label: "Home", href: "/", icon: Home },
        { label: "Shop", href: "/shop", icon: ShoppingBag },
        { label: "Flash Sale", href: "/flash-sale", icon: Zap },
        { label: "Track Order", href: "/track-order", icon: Truck },
    ];

    return (
        <div className="fixed inset-0 z-[500] lg:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60  transition-opacity"
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
                                {categories.map((cat: CategoryData) => (
                                    <div key={cat.id} className="flex flex-col">
                                        <Link
                                            href={`/shop?category=${cat.slug}`}
                                            onClick={(e) => {
                                                if (cat.children && cat.children.length > 0) {
                                                    toggleExpand(e, cat.id);
                                                } else {
                                                    onClose();
                                                }
                                            }}
                                            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-bold text-slate-600 group transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                {cat.image ? (
                                                    <img src={cat.image} alt={cat.name} className="w-5 h-5 rounded-md object-cover" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center text-[8px] font-black">{cat.name.charAt(0)}</div>
                                                )}
                                                <span>{cat.name}</span>
                                            </div>
                                            {cat.children && cat.children.length > 0 && (
                                                <ChevronRight className={`w-3.5 h-3.5 text-gray-300 group-hover:text-red-400 transition-all ${expandedIds[cat.id] ? "rotate-90" : ""}`} />
                                            )}
                                        </Link>

                                        {/* Subcategories Level 2 */}
                                        {cat.children && cat.children.length > 0 && expandedIds[cat.id] && (
                                            <div className="ml-6 border-l border-gray-100 pl-2 mt-1 space-y-1">
                                                {cat.children.map((sub: CategoryData) => (
                                                    <div key={sub.id} className="flex flex-col">
                                                        <Link
                                                            href={`/shop?category=${sub.slug}`}
                                                            onClick={(e) => {
                                                                if (sub.children && sub.children.length > 0) {
                                                                    toggleExpand(e, sub.id);
                                                                } else {
                                                                    onClose();
                                                                }
                                                            }}
                                                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-xs font-bold text-slate-500 group transition-all"
                                                        >
                                                            <span>{sub.name}</span>
                                                            {sub.children && sub.children.length > 0 && (
                                                                <ChevronRight className={`w-3 h-3 text-gray-300 group-hover:text-red-400 transition-all ${expandedIds[sub.id] ? "rotate-90" : ""}`} />
                                                            )}
                                                        </Link>

                                                        {/* Sub-subcategories Level 3 */}
                                                        {sub.children && sub.children.length > 0 && expandedIds[sub.id] && (
                                                            <div className="ml-4 border-l border-gray-100 pl-2 mt-1 space-y-1">
                                                                {sub.children.map((child: CategoryData) => (
                                                                    <Link
                                                                        key={child.id}
                                                                        href={`/shop?category=${child.slug}`}
                                                                        onClick={onClose}
                                                                        className="flex items-center px-3 py-1.5 rounded-lg hover:bg-gray-50 text-[11px] font-medium text-slate-400 hover:text-red-400 transition-all"
                                                                    >
                                                                        {child.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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
