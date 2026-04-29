'use client';

import React from 'react';
import AccountSidebar from '@/components/AccountSidebar';
import WhatsAppChat from '@/components/chat/WhatsAppChat';

export default function VendorChatPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-gray-50/30 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <AccountSidebar />
                <div className="lg:col-span-3">
                    <div className="mb-12">
                        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase">Vendor Live Chat</h1>
                        <p className="text-gray-800 font-bold uppercase text-[11px] tracking-[0.2em] mt-2">Chat with your favorite shops in real-time</p>
                    </div>

                    <WhatsAppChat />
                </div>
            </div>
        </main>
    );
}
