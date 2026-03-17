'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { closeCreateModal } from '@/store/slices/supportSlice';
import { useCreateTicketMutation } from '@/store/api/frontendApi';
import { X, Send, Paperclip, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const CreateTicketModal: React.FC = () => {
    const dispatch = useDispatch();
    const { isCreateModalOpen: isOpen } = useSelector((state: RootState) => state.support);
    
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState('medium');
    const [attachment, setAttachment] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [createTicket, { isLoading }] = useCreateTicketMutation();

    if (!isOpen) return null;

    const onClose = () => dispatch(closeCreateModal());

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAttachment(file);
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!subject.trim() || !message.trim()) {
            toast.error('Please fill in both subject and message.');
            return;
        }

        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('priority', priority);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            await createTicket(formData).unwrap();
            toast.success('Support ticket created successfully!');
            onClose();
            // Reset fields
            setSubject('');
            setMessage('');
            setAttachment(null);
            setPreviewUrl(null);
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create ticket. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg shadow-[0_20px_50px_rgba(15,23,42,0.15)] overflow-hidden animate-in fade-in zoom-in duration-300 border border-gray-100">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-slate-50/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 text-left">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Open New Ticket</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Briefly describe your request</p>
                    </div>
                    <button onClick={onClose} className="relative z-10 p-3 bg-white hover:bg-slate-900 hover:text-white rounded-2xl transition-all shadow-sm group">
                        <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject of inquiry</label>
                        <input 
                            type="text" 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="WHAT CAN WE HELP YOU WITH?"
                            className="w-full placeholder-gray-700 px-5 py-4 rounded-2xl border border-gray-200 focus:border-slate-900 focus:ring-0 transition-all outline-none font-bold text-slate-700 placeholder:text-gray-200"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Urgency Level</label>
                            <div className="relative">
                                <select 
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-slate-900 focus:ring-0 outline-none font-bold text-slate-700 bg-white appearance-none cursor-pointer"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <AlertCircle className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Description</label>
                        <textarea 
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="TELL US MORE ABOUT THE ISSUE..."
                            className="w-full px-5 placeholder-gray-700 py-4 rounded-2xl border border-gray-200 focus:border-slate-900 focus:ring-0 transition-all outline-none resize-none font-bold text-slate-700 placeholder:text-gray-200"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Relevant Screenshots</label>
                        <div className="flex flex-wrap items-center gap-4">
                            <label className="cursor-pointer flex items-center gap-3 px-6 py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200 active:scale-95">
                                <Paperclip className="w-4 h-4 text-slate-900" />
                                {attachment ? 'Change Image' : 'Attach Photo'}
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            </label>
                            {attachment && (
                                <span className="text-[9px] font-bold text-gray-400 truncate max-w-[150px] uppercase tracking-widest">{attachment.name}</span>
                            )}
                        </div>
                        {previewUrl && (
                            <div className="mt-4 relative inline-block group">
                                <div className="absolute inset-0 bg-slate-900/5 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <img src={previewUrl} alt="preview" className="relative w-24 h-24 object-cover rounded-2xl border-4 border-white shadow-xl" />
                                <button 
                                    type="button"
                                    onClick={() => {setAttachment(null); setPreviewUrl(null);}}
                                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 px-8 py-4 rounded-2xl border border-gray-200 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:bg-gray-50 transition-colors"
                        >
                            Dismiss
                        </button>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="flex-[2] bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 disabled:opacity-50 active:scale-95"
                        >
                            {isLoading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                            ) : (
                                <><Send className="w-4 h-4" /> Submit Ticket</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicketModal;
