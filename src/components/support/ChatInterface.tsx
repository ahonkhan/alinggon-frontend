'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGetTicketDetailsQuery, useSubmitTicketReplyMutation, TicketMessage } from '@/store/api/frontendApi';
import { useDispatch } from 'react-redux';
import { openImageViewer } from '@/store/slices/supportSlice';
import { Send, Paperclip, X, Image as ImageIcon, Loader2, User, UserCheck } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

interface ChatInterfaceProps {
    ticketId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ ticketId }) => {
    const dispatch = useDispatch();
    const { data: ticketData, isLoading: isTicketLoading, refetch } = useGetTicketDetailsQuery(ticketId);
    const [submitReply, { isLoading: isReplying }] = useSubmitTicketReplyMutation();

    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [ticketData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAttachment(file);
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() && !attachment) return;

        const formData = new FormData();
        if (message.trim()) formData.append('message', message);
        if (attachment) formData.append('attachment', attachment);

        try {
            await submitReply({ id: ticketId, body: formData }).unwrap();
            setMessage('');
            setAttachment(null);
            setPreviewUrl(null);
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to send message.');
        }
    };

    if (isTicketLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;

    const ticket = ticketData?.data;
    const messages = ticket?.messages || [];

    return (
        <div className="flex flex-col h-[70vh] bg-white rounded-[2rem] border border-gray-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-slate-50 border-b border-gray-100 flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/5 rounded-full blur-2xl -mr-16 -mt-16"></div>

                <div className="flex items-center gap-4 relative z-10">
                    <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg">
                        <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight uppercase tracking-tight">{ticket?.subject}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest leading-none">Live Help Active</span>
                        </div>
                    </div>
                </div>
                <div className="relative z-10">
                    <span className={`px-4 py-1.5 rounded-xl border-2 text-[12px] font-black uppercase tracking-widest shadow-sm ${ticket?.status === 'closed'
                        ? 'bg-gray-100 text-gray-500 border-gray-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                        }`}>
                        {ticket?.status}
                    </span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth bg-white">
                {messages.map((msg: TicketMessage, index: number) => {
                    const isAdmin = msg.is_admin_reply;
                    return (
                        <div key={msg.id} className={`flex ${isAdmin ? 'justify-start' : 'justify-end'}`}>
                            <div className={`flex flex-col max-w-[85%] ${isAdmin ? 'items-start' : 'items-end'}`}>
                                <div className={`flex items-center gap-3 mb-2 px-2`}>
                                    {!!isAdmin && <span className="text-[12px] font-black text-red-500 uppercase tracking-widest">Support Expert</span>}
                                    <span className="text-[12px] font-bold text-gray-800 uppercase tracking-widest">{format(new Date(msg.created_at), 'hh:mm a')}</span>
                                </div>
                                <div className={`relative px-5 py-4 rounded-[1.5rem] shadow-md border ${isAdmin
                                    ? 'bg-slate-50 text-slate-800 rounded-tl-none border-slate-100'
                                    : 'bg-slate-900 text-white rounded-tr-none border-slate-950 shadow-slate-200'
                                    }`}>
                                    {msg.message && <p className="text-sm font-medium leading-relaxed">{msg.message}</p>}
                                    {msg.attachment && (
                                        <div className={`mt-3 ${msg.message ? 'border-t border-current/10 pt-3 group' : ''}`}>
                                            <img
                                                src={msg.attachment}
                                                alt="attachment"
                                                className="rounded-xl max-w-[280px] w-full border-2 border-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
                                                onClick={() => dispatch(openImageViewer(msg.attachment!))}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {ticket?.status !== 'closed' ? (
                <div className="p-6 bg-slate-50 border-t border-gray-100">
                    {previewUrl && (
                        <div className="mb-4 relative inline-block">
                            <div className="absolute inset-0 bg-slate-900/10 rounded-2xl blur-lg"></div>
                            <img src={previewUrl} alt="preview" className="relative w-24 h-24 object-cover rounded-2xl border-4 border-white shadow-xl" />
                            <button
                                onClick={() => { setAttachment(null); setPreviewUrl(null); }}
                                className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleSend} className="flex items-center gap-3 bg-white p-2 rounded-[1.5rem] border border-gray-200 shadow-sm focus-within:border-slate-900 transition-all">
                        <label className="p-3 text-gray-800 hover:text-slate-900 cursor-pointer transition-colors hover:bg-slate-50 rounded-2xl">
                            <Paperclip className="w-5 h-5" />
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Describe your issue here..."
                            className="flex-1 bg-transparent border-none outline-none text-sm font-bold py-2 px-1 text-slate-700 placeholder:text-gray-300 placeholder:font-black placeholder:uppercase placeholder:tracking-widest placeholder:text-[12px]"
                        />
                        <button
                            type="submit"
                            disabled={isReplying || (!message.trim() && !attachment)}
                            className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 active:scale-95"
                        >
                            {isReplying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="p-8 bg-slate-100/50 text-center">
                    <p className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">This conversation has been concluded</p>
                </div>
            )}
        </div>
    );
};

export default ChatInterface;
