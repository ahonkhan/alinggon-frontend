"use client";

import { Heart, Mail, Phone, Search, ShoppingBag, ShoppingCart, Truck, User, Menu, LogOut, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";
import { products } from "@/data/dummyData";

export default function Header() {
    const { openCart, cartCount } = useCart();
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowSuggestions(false);
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const suggestions = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return products
            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 5);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full">
            {/* Main Header */}
            <header className="bg-white border-b border-gray-100 z-50">
                <div className="max-w-[1600px] mx-auto px-4 py-4 md:py-6 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                            className="p-2 -ml-2 text-slate-900 lg:hidden hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                            <div className="bg-red-600 text-white p-2 rounded-xl shadow-lg shadow-red-100 group-hover:rotate-6 transition-transform">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-red-600 transition-colors">Alinggon</span>
                        </Link>
                    </div>

                    {/* Search Bar with Suggestions */}
                    <div ref={searchRef} className="flex-1 max-w-2xl mx-auto relative hidden md:block">
                        <form onSubmit={handleSearch} className="flex items-center w-full">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Search your desire object..."
                                    className="w-full h-12 pl-6 pr-12 rounded-2xl bg-gray-50 border-2 border-red-600 focus:bg-white focus:outline-none focus:border-red-600 text-sm font-black text-slate-800 transition-all shadow-inner"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        aria-label="Clear search"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <button
                                type="submit"
                                aria-label="Search"
                                className="ml-3 h-12 px-6 bg-slate-900 hover:bg-red-600 text-white rounded-2xl transition-all shadow-xl shadow-slate-100 flex items-center justify-center group active:scale-95"
                            >
                                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </form>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-14 left-0 w-full bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-[60] animate-in slide-in-from-top-2 duration-200">
                                <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recommended Match</span>
                                </div>
                                <div>
                                    {suggestions.map(p => (
                                        <Link
                                            key={p.id}
                                            href={`/product/${p.id}`}
                                            onClick={() => setShowSuggestions(false)}
                                            className="flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition-colors group"
                                        >
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                                <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xs font-black text-slate-800 line-clamp-1 group-hover:text-red-500 transition-colors">{p.name}</h4>
                                                <p className="text-[10px] font-black text-red-600 mt-1 font-sans">৳ {p.price}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href={`/search?q=${searchQuery}`}
                                    onClick={() => setShowSuggestions(false)}
                                    className="block w-full text-center py-4 bg-gray-50 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-600 transition-all font-sans"
                                >
                                    View all search results
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="hidden lg:flex flex-col items-end leading-tight text-right text-slate-900 mr-2">
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Global Support</span>
                            <span className="text-sm font-black tracking-tighter">+97336781645</span>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <Link href="/wishlist" aria-label="Wishlist" className="relative p-2.5 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all hidden sm:block">
                                <Heart className="w-6 h-6 stroke-[1.8]" />
                            </Link>

                            <button onClick={openCart}
                                aria-label="Cart"
                                className="relative p-2.5 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all flex flex-col items-center group"
                            >
                                <div className="relative">
                                    <ShoppingCart className="w-6 h-6 stroke-[1.8]" />
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-xl animate-pulse">
                                        {cartCount}
                                    </span>
                                </div>
                            </button>

                            {user ? (
                                <div className="hidden md:flex items-center gap-4 ml-2">
                                    <Link href="/profile" aria-label="Profile" className="flex items-center gap-3 group bg-gray-50 pl-4 pr-1.5 py-1.5 rounded-2xl border border-gray-100 hover:bg-white hover:border-red-100 transition-all shadow-sm">
                                        <div className="text-right leading-none">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Access Granted</p>
                                            <p className="text-xs font-black text-slate-900 group-hover:text-red-500 transition-colors uppercase tracking-tight">{user.name.split(' ')[0]}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors shadow-lg">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            router.push("/");
                                        }}
                                        aria-label="Sign out"
                                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                        title="Sign Out"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-3 ml-2">
                                    <Link href="/login" className="text-[10px] font-black text-slate-900 uppercase tracking-widest hover:text-red-600 transition-colors">
                                        Log In
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-6 py-3 bg-red-600 hover:bg-slate-900 text-white text-[10px] font-black rounded-xl shadow-xl shadow-red-100/50 transition-all uppercase tracking-widest active:scale-95"
                                    >
                                        Establish Account
                                    </Link>
                                </div>
                            )}

                            <Link href="/profile" aria-label="Profile" className="md:hidden p-2.5 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
                                <User className="w-6 h-6 stroke-[1.8]" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden px-4 pb-5 pt-1">
                    <form onSubmit={handleSearch} className="flex items-center w-full group relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full h-12 pl-6 pr-12 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:outline-none focus:border-red-600 text-sm font-black transition-all shadow-inner"
                        />
                        <button
                            type="submit"
                            aria-label="Search"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </header >

            {/* Mobile Menu Component */}
            < MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)
                }
            />
        </div >
    );
}
