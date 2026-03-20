"use client";

import React, { useEffect } from "react";
import { Lock, Eye } from "lucide-react";
import { PersonalPicture } from "@/store/api/frontendApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openBulkPasswordModal, openPasswordModal, openViewer, setGalleryData } from "@/store/slices/gallerySlice";

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
            dispatch(openBulkPasswordModal());
        } else {
            dispatch(openViewer(index));
        }
    };

    if (pictures.length === 0) return null;

    return (
        <div className="w-full mt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="space-y-1">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
                        Personal <span className="text-red-600">Gallery</span>
                    </h3>
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full w-fit">
                        <Lock className="w-3 h-3 text-red-500" />
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Private Content</span>
                    </div>
                </div>

                <button
                    onClick={() => dispatch(openBulkPasswordModal())}
                    className="group bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-slate-900/10"
                >
                    <Eye className="w-4 h-4" />
                    View Personal Photos
                </button>
            </div>
        </div>
    );
};
