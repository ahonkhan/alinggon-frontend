"use client";

import React, { useState } from "react";
import { Lock, Unlock, Eye, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import { PersonalPicture, useVerifyPersonalPicturePasswordMutation } from "@/store/api/frontendApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface AdminPersonalPicturesProps {
    pictures: PersonalPicture[];
}

export const AdminPersonalPictures: React.FC<AdminPersonalPicturesProps> = ({ pictures }) => {
    const [unlockedPictures, setUnlockedPictures] = useState<Record<number, string | undefined>>({});
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);
    const [passwordModal, setPasswordModal] = useState<{ id: number } | null>(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [verifyPassword, { isLoading: isVerifying }] = useVerifyPersonalPicturePasswordMutation();

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordModal) return;

        try {
            const result = await verifyPassword({ id: passwordModal.id, password }).unwrap();
            if (result.success && result.image_path) {
                setUnlockedPictures(prev => ({ ...prev, [passwordModal.id]: result.image_path }));
                setPasswordModal(null);
                setPassword("");
                setError("");
                // Automatically open viewer for this picture
                const index = pictures.findIndex(p => p.id === passwordModal.id);
                setViewerIndex(index);
            }
        } catch (err: any) {
            setError(err?.data?.message || "Incorrect password. Try again.");
        }
    };

    const openViewer = (index: number) => {
        const pic = pictures[index];
        if (pic.is_locked && !unlockedPictures[pic.id]) {
            setPasswordModal({ id: pic.id });
        } else {
            setViewerIndex(index);
        }
    };

    if (pictures.length === 0) return null;

    return (
        <div className="w-full mt-12">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
                    Personal <span className="text-red-600">Gallery</span>
                </h3>
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full">
                    <Lock className="w-4 h-4 text-red-500" />
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Private Content</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {pictures.map((pic, index) => {
                    const isUnlocked = unlockedPictures[pic.id];
                    const isActuallyLocked = pic.is_locked && !isUnlocked;

                    return (
                        <div
                            key={pic.id}
                            onClick={() => openViewer(index)}
                            className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 cursor-pointer border-2 border-transparent hover:border-red-500 transition-all duration-300"
                        >
                            <img
                                src={isActuallyLocked ? pic.image_path : (isUnlocked || pic.image_path)}
                                alt="Admin personal"
                                className={`w-full h-full object-cover transition-all duration-500 ${isActuallyLocked ? 'blur-xl scale-110 opacity-60' : 'group-hover:scale-110'}`}
                            />

                            {isActuallyLocked ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30 mb-2">
                                        <Lock className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Unlock to View</span>
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Eye className="w-8 h-8 text-white drop-shadow-lg" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Password Modal */}
            {passwordModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
                    <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 text-center space-y-6">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                                <Lock className="w-10 h-10 text-red-500" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Private Content</h4>
                                <p className="text-slate-500 font-medium">Please enter the password provided by the admin to unlock this picture.</p>
                            </div>

                            <form onSubmit={handleUnlock} className="space-y-4">
                                <div className="space-y-1">
                                    <input
                                        type="password"
                                        autoFocus
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl text-center text-xl font-bold tracking-widest focus:outline-none transition-all ${error ? 'border-red-300' : 'border-slate-100 focus:border-red-500'}`}
                                    />
                                    {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-2">{error}</p>}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => { setPasswordModal(null); setPassword(""); setError(""); }}
                                        className="flex-1 px-4 py-4 border-2 border-slate-100 text-slate-400 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isVerifying || !password}
                                        className="flex-[2] bg-red-500 text-white px-4 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-red-500/30 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Unlock Picture"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Viewer */}
            {viewerIndex !== null && (
                <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between p-6">
                        <span className="text-white/50 text-xs font-black tracking-widest">
                            {viewerIndex + 1} / {pictures.length}
                        </span>
                        <button
                            onClick={() => setViewerIndex(null)}
                            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 relative flex items-center justify-center overflow-hidden h-full">
                        <Swiper
                            initialSlide={viewerIndex}
                            onSlideChange={(swiper) => {
                                const newPic = pictures[swiper.activeIndex];
                                if (newPic.is_locked && !unlockedPictures[newPic.id]) {
                                    setViewerIndex(null); // Close viewer if next pic is locked
                                    setPasswordModal({ id: newPic.id });
                                } else {
                                    setViewerIndex(swiper.activeIndex);
                                }
                            }}
                            modules={[Navigation, Pagination, EffectFade]}
                            navigation={{
                                prevEl: '.prev-btn',
                                nextEl: '.next-btn',
                            }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {pictures.map((pic) => (
                                <SwiperSlide key={pic.id} className="flex items-center justify-center">
                                    <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
                                        <img
                                            src={unlockedPictures[pic.id] || pic.image_path}
                                            alt="Full size"
                                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation */}
                        <button className="prev-btn absolute left-4 md:left-8 z-10 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-0">
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button className="next-btn absolute right-4 md:right-8 z-10 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-0">
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
