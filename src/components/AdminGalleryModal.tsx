"use client";

import React, { useState } from "react";
import { Lock, Eye, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import { useVerifyPersonalPicturePasswordMutation, useVerifyBulkPersonalPicturesPasswordMutation } from "@/store/api/frontendApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closePasswordModal, closeViewer, openBulkPasswordModal, openPasswordModal, openViewer, unlockAllPictures, unlockPicture } from "@/store/slices/gallerySlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export const AdminGalleryModal: React.FC = () => {
    const dispatch = useDispatch();
    const { pictures, viewerIndex, passwordModalId, unlockedPictures, isBulkUnlockMode } = useSelector((state: RootState) => state.gallery);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [verifyPassword, { isLoading: isVerifying }] = useVerifyPersonalPicturePasswordMutation();
    const [verifyBulkPassword, { isLoading: isBulkVerifying }] = useVerifyBulkPersonalPicturesPasswordMutation();

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordModalId === null) return;

        try {
            if (isBulkUnlockMode) {
                const result = await verifyBulkPassword({ password }).unwrap();
                if (result.success && result.unlocked_pictures) {
                    dispatch(unlockAllPictures(result.unlocked_pictures));
                    setPassword("");
                    setError("");
                    // Automatically open viewer for the first picture if not already viewing
                    if (viewerIndex === null) {
                        dispatch(openViewer(0));
                    }
                }
            } else {
                const result = await verifyPassword({ id: passwordModalId, password }).unwrap();
                if (result.success && result.image_path) {
                    dispatch(unlockPicture({ id: passwordModalId, imagePath: result.image_path }));
                    dispatch(closePasswordModal());
                    setPassword("");
                    setError("");
                    // Automatically open viewer for this picture
                    const index = pictures.findIndex(p => p.id === passwordModalId);
                    if (index !== -1) {
                        dispatch(openViewer(index));
                    }
                }
            }
        } catch (err: any) {
            setError(err?.data?.message || "Incorrect password. Try again.");
        }
    };

    if (passwordModalId === null && viewerIndex === null) return null;

    return (
        <div id="admin-gallery-root" className="fixed inset-0 z-[99999] pointer-events-none">
            {/* Password Modal */}
            {passwordModalId !== null && (
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md pointer-events-auto">
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
                                        onClick={() => { dispatch(closePasswordModal()); setPassword(""); setError(""); }}
                                        className="flex-1 px-4 py-4 border-2 border-slate-100 text-slate-800 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isVerifying || isBulkVerifying || !password}
                                        className="flex-[2] bg-red-500 text-white px-4 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-red-500/30 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {(isVerifying || isBulkVerifying) ? <Loader2 className="w-4 h-4 animate-spin" /> : (isBulkUnlockMode ? "Unlock All" : "Unlock Picture")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Viewer */}
            {viewerIndex !== null && (
                <div className="fixed inset-0 flex flex-col bg-black/95 animate-in fade-in duration-300 pointer-events-auto">
                    <div className="flex items-center justify-between p-6">
                        <span className="text-white/50 text-xs font-black tracking-widest">
                            {viewerIndex + 1} / {pictures.length}
                        </span>
                        <button
                            onClick={() => dispatch(closeViewer())}
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
                                    dispatch(closeViewer());
                                    dispatch(openBulkPasswordModal());
                                } else {
                                    dispatch(openViewer(swiper.activeIndex));
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
