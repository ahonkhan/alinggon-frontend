"use client";

import React from "react";

const HomeLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="relative w-32 h-32 mb-8">
        {/* Animated Outer Ring */}
        <div className="absolute inset-0 border-[6px] border-slate-50 rounded-[2.5rem] animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute inset-0 border-[6px] border-t-red-600 border-r-transparent border-b-transparent border-l-transparent rounded-[2.5rem] animate-[spin_1.5s_cubic-bezier(0.76, 0.35, 0.2, 0.7),_spin_1s_linear_infinite]"></div>

        {/* Middle Pulse Ring */}
        <div className="absolute inset-4 bg-red-50/50 rounded-[2rem] animate-pulse"></div>

        {/* Inner Glowing Core */}
        <div className="absolute inset-8 border-4 border-slate-900 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-red-500/20">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="flex flex-col items-center">
          <span className="text-red-600 text-[11px] font-black uppercase tracking-[0.6em] mb-2 animate-pulse">
            Alinggon Premium
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
            Elevating Reality
          </h2>
        </div>

        {/* Modern Progress Indicator */}
        <div className="relative w-48 h-[2px] bg-slate-100 rounded-full mx-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600 to-transparent w-full h-full animate-[loading-shimmer_1.5s_infinite]"></div>
        </div>

        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Curating Your Experience...
        </p>
      </div>

      <style jsx global>{`
        @keyframes loading-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default HomeLoader;
