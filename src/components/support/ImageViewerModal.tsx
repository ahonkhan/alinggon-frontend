'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { closeImageViewer } from '@/store/slices/supportSlice';
import { X, ZoomIn, Download } from 'lucide-react';

const ImageViewerModal: React.FC = () => {
    const dispatch = useDispatch();
    const { imageViewerUrl } = useSelector((state: RootState) => state.support);

    if (!imageViewerUrl) return null;

    return (
        <div 
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/95 backdrop-blur-md transition-all duration-300 animate-in fade-in"
            onClick={() => dispatch(closeImageViewer())}
        >
            <div className="absolute top-6 right-6 flex items-center gap-4 z-[1001]">
                <a 
                    href={imageViewerUrl} 
                    download 
                    className="p-3 bg-slate-800/50 text-white rounded-full hover:bg-slate-700 transition-colors shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Download className="w-5 h-5" />
                </a>
                <button 
                    onClick={() => dispatch(closeImageViewer())}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-xl active:scale-90"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div 
                className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={imageViewerUrl} 
                    alt="viewer" 
                    className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300"
                />
            </div>
        </div>
    );
};

export default ImageViewerModal;
