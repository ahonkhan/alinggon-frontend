"use client";

import { Camera, Edit3, Lock, MapPin, ShoppingBag, User as UserIcon, Phone, Mail, ChevronRight, Package, CreditCard, LogOut, Headset, Loader2, Heart } from "lucide-react";
import Link from "next/link";
import AccountSidebar from "@/components/AccountSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useGetProfileStatsQuery, useUpdateProfilePhotoMutation } from "@/store/api/frontendApi";
import EditProfileModal from "@/components/profile/EditProfileModal";
import AddressBook from "@/components/profile/AddressBook";
import SecuritySettings from "@/components/profile/SecuritySettings";
import PreferenceSettings from "@/components/profile/PreferenceSettings";
import { toast } from "react-hot-toast";

export default function Profile() {
    const { user, logout, updateUser } = useAuth();
    const router = useRouter();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<'overview' | 'addresses' | 'security' | 'preferences'>('overview');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: statsData, isLoading: statsLoading } = useGetProfileStatsQuery(undefined, {
        skip: !user
    });
    const [updatePhoto, { isLoading: isUpdatingPhoto }] = useUpdateProfilePhotoMutation();

    const stats = statsData?.data;

    // Redirect to login if not logged in
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("photo", file);

        try {
            const response = await updatePhoto(formData).unwrap();
            if (response.success) {
                updateUser(response.user);
            }
            toast.success("Profile photo updated");
        } catch (error) {
            toast.error("Failed to update photo");
        }
    };

    if (!user) return null;

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-gray-50/30">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <AccountSidebar />

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-10">

                    {/* Header Card */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-slate-200/50 p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50/30 rounded-full blur-2xl -ml-16 -mb-16"></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                            <div className="relative group">
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden relative">
                                    {user.profile_photo ? (
                                        <img
                                            src={user.profile_photo.startsWith('http') ? user.profile_photo : `${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace('/api', '')}/storage/${user.profile_photo}`}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <UserIcon className="w-16 h-16 text-gray-300" />
                                    )}
                                    {isUpdatingPhoto && (
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-2 -right-2 bg-red-400 p-3 rounded-2xl text-white shadow-lg hover:bg-slate-900 hover:scale-110 transition-all active:scale-95"
                                >
                                    <Camera className="w-5 h-5" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{user.name}</h1>
                                    <p className="text-gray-800 font-bold uppercase text-[12px] tracking-[0.2em]">{user.email}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                                            <Phone className="w-3 h-3 text-red-400" /> Phone Number
                                        </label>
                                        <p className="text-lg font-black text-slate-700 font-sans tracking-tight">{user.phone || 'N/A'}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                                            <MapPin className="w-3 h-3 text-red-400" /> Quick Access
                                        </label>
                                        <div className="flex justify-center md:justify-start gap-3">
                                            <button
                                                onClick={() => setActiveSection('addresses')}
                                                className="text-[12px] font-black text-red-400 hover:text-slate-900 flex items-center gap-1 group transition-colors uppercase tracking-[0.1em]"
                                            >
                                                My Addresses <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <Link
                                                href="/wishlist"
                                                className="text-[12px] font-black text-red-400 hover:text-slate-900 flex items-center gap-1 group transition-colors uppercase tracking-[0.1em]"
                                            >
                                                Wishlist <Heart className="w-3 h-3 group-hover:scale-110 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="bg-red-400 hover:bg-slate-900 text-white font-black px-8 py-3.5 rounded-2xl text-[12px] uppercase tracking-widest transition-all shadow-xl shadow-red-200/50 flex items-center gap-2 active:scale-95"
                                    >
                                        <Edit3 className="w-4 h-4" /> Edit Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            logout();
                                            router.push("/");
                                        }}
                                        className="bg-white border-2 border-slate-100 hover:border-red-400 hover:text-red-400 text-slate-800 font-black px-8 py-3.5 rounded-2xl text-[12px] uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 active:scale-95"
                                    >
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            </div>

                            {/* Metrics Mini Box */}
                            <div className="hidden md:block w-px h-48 bg-gray-100 self-center"></div>

                            <div className="w-full md:w-56 space-y-4">
                                <h3 className="text-[13px] font-black text-slate-800 mb-6 uppercase tracking-widest text-center">Platform Status</h3>
                                <MetricCard icon={Package} label="Total Orders" value={statsLoading ? "..." : stats?.total_orders || 0} color="bg-blue-50 text-blue-500" />
                                <MetricCard icon={CreditCard} label="Spent Amount" value={statsLoading ? "..." : `\u09F3 ${stats?.spent_amount?.toLocaleString() || 0}`} color="bg-green-50 text-green-500" />
                                <MetricCard icon={Headset} label="Active Tickets" value={statsLoading ? "..." : stats?.active_tickets || 0} color="bg-orange-50 text-orange-500" />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Section Viewer */}
                    <div className="space-y-10">
                        <div className="flex gap-4 p-2 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-slate-200/20 overflow-x-auto scrollbar-hide">
                            <TabButton active={activeSection === 'overview'} onClick={() => setActiveSection('overview')} label="Overview" icon={UserIcon} />
                            <TabButton active={activeSection === 'addresses'} onClick={() => setActiveSection('addresses')} label="Addresses" icon={MapPin} />
                            <TabButton active={activeSection === 'security'} onClick={() => setActiveSection('security')} label="Security" icon={Lock} />
                            <TabButton active={activeSection === 'preferences'} onClick={() => setActiveSection('preferences')} label="Preferences" icon={ShoppingBag} />
                        </div>

                        {activeSection === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Link href="/wishlist" className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-xl shadow-slate-200/30 group hover:border-red-400 transition-colors">
                                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                                        <Heart className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">My Wishlist</h3>
                                    <p className="text-[12px] font-bold text-gray-800 uppercase tracking-widest mt-1">Saved products for later</p>
                                </Link>

                                <div onClick={() => setActiveSection('addresses')} className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-xl shadow-slate-200/30 group hover:border-red-400 transition-colors cursor-pointer">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Saved Addresses</h3>
                                    <p className="text-[12px] font-bold text-gray-800 uppercase tracking-widest mt-1">Manage delivery locations</p>
                                </div>

                                <Link href="/support" className="bg-slate-900 rounded-[2rem] p-8 shadow-xl shadow-slate-400/20 group hover:bg-slate-800 transition-colors">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                            <Headset className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xs font-black text-white uppercase tracking-widest">Support</h3>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 rounded-2xl p-4">
                                        <span className="text-[12px] font-black text-white/50 uppercase tracking-widest">Open Tickets</span>
                                        <span className="text-lg font-black text-red-400">{statsLoading ? "..." : stats?.active_tickets || 0}</span>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {activeSection === 'addresses' && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><AddressBook /></div>}
                        {activeSection === 'security' && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><SecuritySettings /></div>}
                        {activeSection === 'preferences' && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><PreferenceSettings /></div>}
                    </div>
                </div>
            </div>

            <EditProfileModal user={user} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
        </main>
    );
}

function MetricCard({ icon: Icon, label, value, color }: any) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between group hover:border-red-100 transition-colors">
            <div className={`p-2 rounded-xl scale-90 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-right">
                <p className="text-[9px] font-bold text-gray-800 uppercase tracking-tighter leading-none mb-1">{label}</p>
                <p className="text-base font-black text-slate-700 tracking-tighter">{value}</p>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, label, icon: Icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-[12px] font-black uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 ${active ? 'bg-slate-900 text-white shadow-xl shadow-slate-300' : 'bg-transparent text-slate-800 hover:bg-gray-50'}`}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-red-400' : 'text-gray-300'}`} />
            {label}
        </button>
    );
}
