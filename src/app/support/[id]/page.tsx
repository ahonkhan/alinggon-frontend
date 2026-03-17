'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ChatInterface from '@/components/support/ChatInterface';
import { ChevronLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function TicketDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    return (
        <div className="min-h-screen bg-gray-50/50 pt-8 pb-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-12">
                    <Link href="/support" className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors mb-6 inline-flex group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Support Center
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
                            <MessageCircle className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase">Support Conversation</h1>
                            <p className="text-gray-400 font-bold uppercase text-[11px] tracking-[0.2em] mt-1">Ticket ID: #{id.slice(-8).toUpperCase()}</p>
                        </div>
                    </div>
                </div>

                <ChatInterface ticketId={id} />
                
                <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] flex gap-6 items-center border border-slate-800 shadow-2xl shadow-slate-200">
                    <div className="bg-red-500 text-white p-4 rounded-2xl shrink-0 shadow-lg shadow-red-500/20">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-extrabold text-white text-lg tracking-tight">Need immediate priority help?</h4>
                        <p className="text-slate-400 font-medium mt-1">Our specialist team typical response time is under 12 hours. For 24/7 urgent matters, please use our priority helpline.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
