'use client';

import React from 'react';
import TicketList from '@/components/support/TicketList';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 pt-8 pb-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-12">
                    <Link href="/profile" className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors mb-6 inline-flex group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase">Support Help Center</h1>
                    <p className="text-gray-400 font-bold uppercase text-[11px] tracking-[0.2em] mt-2">Professional assistance for your inquiries</p>
                </div>

                <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                    <TicketList />
                </div>
            </div>
        </div>
    );
}
