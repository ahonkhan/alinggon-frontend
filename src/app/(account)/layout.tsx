"use client";

import AccountSidebar from "@/components/AccountSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-gray-50/30">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <AccountSidebar />
                <div className="lg:col-span-3">
                    {children}
                </div>
            </div>
        </main>
    );
}
