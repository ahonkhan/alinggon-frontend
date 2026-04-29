'use client';

import React from 'react';
import TicketList from '@/components/support/TicketList';
import AccountSidebar from '@/components/AccountSidebar';

export default function SupportPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-gray-50/30 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <AccountSidebar />
                <div className="lg:col-span-3">
                    <div className="mb-12">
                        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase">Support Help Center</h1>
                        <p className="text-gray-800 font-bold uppercase text-[11px] tracking-[0.2em] mt-2">Professional assistance for your inquiries</p>
                    </div>

                    <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                        <TicketList />
                    </div>
                </div>
            </div>
        </main>
    );
}
