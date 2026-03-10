"use client";

import React, { useEffect } from "react";
import { Lock, Eye } from "lucide-react";
import { PersonalPicture } from "@/store/api/frontendApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openPasswordModal, openViewer, setGalleryData } from "@/store/slices/gallerySlice";

interface AdminPersonalPicturesProps {
    pictures: PersonalPicture[];
}

export const AdminPersonalPictures: React.FC<AdminPersonalPicturesProps> = ({ pictures }) => {
    const dispatch = useDispatch();
    const { unlockedPictures } = useSelector((state: RootState) => state.gallery);

    useEffect(() => {
        dispatch(setGalleryData(pictures));
    }, [pictures, dispatch]);

    const openViewerTrigger = (index: number) => {
        const pic = pictures[index];
        if (pic.is_locked && !unlockedPictures[pic.id]) {
            dispatch(openPasswordModal(pic.id));
        } else {
            dispatch(openViewer(index));
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
                            onClick={() => openViewerTrigger(index)}
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
        </div>
    );
};
