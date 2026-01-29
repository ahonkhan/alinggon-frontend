"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CheckCircle, XCircle, Info, Loader2 } from "lucide-react";

type ToastType = "success" | "error" | "info" | "loading";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        if (type !== "loading") {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3000);
        }
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-4 right-4 z-[200] space-y-4 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all animate-in slide-in-from-right duration-300 ${toast.type === "success" ? "bg-white border-green-100 text-green-600" :
                                toast.type === "error" ? "bg-white border-red-100 text-red-600" :
                                    "bg-slate-900 border-slate-800 text-white"
                            }`}
                    >
                        {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
                        {toast.type === "error" && <XCircle className="w-5 h-5" />}
                        {toast.type === "info" && <Info className="w-5 h-5" />}
                        {toast.type === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                        <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
