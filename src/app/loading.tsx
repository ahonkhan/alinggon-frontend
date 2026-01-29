"use client";

export default function Loading() {
    return (
        <main className="min-h-[70vh] flex flex-col items-center justify-center p-4">
            <div className="relative w-24 h-24 mb-8">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-slate-100 rounded-[2rem] animate-[spin_3s_linear_infinite]"></div>
                {/* Inner Ring */}
                <div className="absolute inset-2 border-4 border-t-red-400 border-r-transparent border-b-transparent border-l-transparent rounded-[1.5rem] animate-[spin_1s_linear_infinite]"></div>
                {/* Center Dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                </div>
            </div>
            <div className="text-center space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Syncing Reality...</p>
                <div className="h-1 w-32 bg-slate-100 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-red-400 w-1/2 animate-[loading-bar_1.5s_ease-in-out_infinite]"></div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 60%; }
          100% { transform: translateX(330%); width: 30%; }
        }
      `}</style>
        </main>
    );
}
