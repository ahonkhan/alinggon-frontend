"use client";

import { usePathname } from "next/navigation";
import {
    User,
    Package,
    MapPin,
    CreditCard,
    Settings,
    LogOut,
    Headset,
    Heart,
    ShieldCheck,
    LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AccountSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const menuItems = [
        { label: "Dashboard", href: "/profile", icon: LayoutDashboard },
        { label: "My Orders", href: "/orders", icon: Package },
        { label: "Wishlist", href: "/wishlist", icon: Heart },
        { label: "Support Tickets", href: "/support", icon: Headset },
    ];

    if (!user) return null;

    return (
        <aside className="lg:col-span-1 h-fit lg:sticky lg:top-32">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-slate-200/50 overflow-hidden transform transition-all hover:shadow-slate-300/60">
                <div className="p-8 text-center bg-gray-50/50 border-b border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl rotate-3 hover:rotate-0 transition-transform mb-4 overflow-hidden border-2 border-white">
                        {user.profile_photo ? (
                            <img
                                src={user.profile_photo.startsWith('http') ? user.profile_photo : `${(process.env.NEXT_PUBLIC_API_URL || 'https://alinggon-admin.rangpurit.com/api').replace('/api', '')}/storage/${user.profile_photo}`}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="bg-red-400 w-full h-full flex items-center justify-center">
                                <User className="w-10 h-10" />
                            </div>
                        )}
                    </div>
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter">{user.name}</h2>
                    <p className="text-[9px] font-black text-gray-800 uppercase tracking-widest mt-1">Verified Member</p>
                </div>

                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black transition-all group ${isActive
                                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                    : "text-slate-700 hover:bg-red-50 hover:text-red-500"
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="uppercase tracking-widest">{item.label}</span>
                            </Link>
                        );
                    })}

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black text-red-400 hover:bg-red-50 transition-all group mt-2"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="uppercase tracking-widest">Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}
