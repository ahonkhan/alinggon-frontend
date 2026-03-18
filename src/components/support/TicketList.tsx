'use client';

import React from 'react';
import { useGetTicketsQuery, Ticket } from '@/store/api/frontendApi';
import Link from 'next/link';
import { format } from 'date-fns';
import { MessageSquare, Clock, AlertCircle, ChevronRight, Plus } from 'lucide-react';

import { useDispatch } from 'react-redux';
import { openCreateModal } from '@/store/slices/supportSlice';

const TicketList: React.FC = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useGetTicketsQuery();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-green-100 text-green-700 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'medium': return <Clock className="w-4 h-4 text-orange-500" />;
            case 'low': return <Clock className="w-4 h-4 text-blue-500" />;
            default: return null;
        }
    };

    if (isLoading) return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

    if (error) return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Failed to load tickets. Please try again.</div>;

    const tickets = data?.data || [];

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">My Support Tickets</h2>
                    <p className="text-xs font-bold text-gray-800 uppercase tracking-widest mt-1">Manage your inquiries and help requests</p>
                </div>
                <button
                    onClick={() => dispatch(openCreateModal())}
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200"
                >
                    <Plus className="w-4 h-4" /> Open New Ticket
                </button>
            </div>

            {tickets.length === 0 ? (
                <div className="text-center py-4 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">No tickets yet</h3>
                    <p className="text-xs font-bold text-gray-800 uppercase tracking-widest mt-2 max-w-xs mx-auto px-4">You haven't opened any support tickets. If you need help, feel free to open one!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {tickets.map((ticket: Ticket) => (
                        <Link
                            key={ticket.id}
                            href={`/support/${ticket.id}`}
                            className="bg-white p-2 rounded-[2rem] border border-gray-200 hover:border-slate-900 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex items-center justify-between group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-0 group-hover:opacity-100 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity"></div>

                            <div className="flex items-center gap-5 relative z-10">
                                <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center ${getStatusColor(ticket.status)} border shadow-sm`}>
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div className='ml-2'>
                                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-red-500 transition-colors">
                                        {ticket.subject}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] font-black uppercase tracking-widest">
                                        <span className={`px-3 py-1  rounded-lg border shadow-sm ${getStatusColor(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                                            {getPriorityIcon(ticket.priority)}
                                            {ticket.priority}
                                        </span>
                                        <span className="text-gray-800 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                            {format(new Date(ticket.created_at), 'MMM dd, h:mm a')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TicketList;
