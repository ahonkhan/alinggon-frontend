"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { Search, Send, User, Store, ArrowLeft, Paperclip, Image as ImageIcon, Check, CheckCheck, Loader2, FileText, Smile, Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { agoraCallService } from "@/utils/AgoraCallService";
import { API_URL } from "@/config/api";
import { format } from "date-fns";

export default function WhatsAppChat() {
    const { 
        messages, sendMessage, activeReceiver, setActiveReceiver, activeVendorId, setActiveVendorId,
        isCalling, incomingCall, startCall, acceptCall, rejectCall, endCall, isAccepted
    } = useChat();
    const { user, token } = useAuth();
    const searchParams = useSearchParams();
    const paramReceiverId = searchParams.get('receiver_id');
    const paramVendorId = searchParams.get('vendor_id');
    const paramName = searchParams.get('name');

    useEffect(() => {
        if (paramReceiverId) {
            setActiveReceiver(parseInt(paramReceiverId));
        }
        if (paramVendorId) {
            setActiveVendorId(parseInt(paramVendorId));
        }
    }, [paramReceiverId, paramVendorId]);
    const [input, setInput] = useState("");
    const [chatList, setChatList] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [globalVendors, setGlobalVendors] = useState<any[]>([]);
    const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);
    const [view, setView] = useState<'list' | 'chat'>('list');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);
    const [isLoadingChats, setIsLoadingChats] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const ringingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (token) {
            fetchChatList();
        }
    }, [token, messages]); // Refresh list when messages update

    useEffect(() => {
        if (activeReceiver) {
            setView('chat');
        } else if (window.innerWidth >= 768) {
            setView('chat'); // Keep chat view on desktop if possible
        } else {
            setView('list');
        }
    }, [activeReceiver]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim().length > 1) {
                searchGlobalVendors(searchQuery);
            } else {
                setGlobalVendors([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const searchGlobalVendors = async (query: string) => {
        setIsSearchingGlobal(true);
        try {
            const response = await fetch(`${API_URL}/chat/search-vendors?q=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                // Filter out vendors that are already in the chatList to avoid duplication
                const existingIds = chatList.map(c => c.id);
                const newVendors = data.filter((v: any) => !existingIds.includes(v.id));
                setGlobalVendors(newVendors);
            }
        } catch (error) {
            console.error("Failed to search global vendors", error);
        } finally {
            setIsSearchingGlobal(false);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Agora Call Effect
    useEffect(() => {
        if (isAccepted && token && activeReceiver) {
            initiateJoin();
        } else if (incomingCall && token) {
            startRingingTimeout();
        } else if (!isCalling && !incomingCall) {
            agoraCallService.leave();
            stopRingingTimeout();
            stopTimer();
        }
    }, [isAccepted, isCalling, incomingCall]);

    // When call is accepted or started, we join.
    // This is now triggered manually to avoid effect races.
    const handleStartCall = async () => {
        if (!activeReceiver) return;
        await startCall(activeReceiver);
        // Wait for accept signal before joining
    };

    const handleAcceptCall = async () => {
        await acceptCall();
        // Join immediately after sending accept signal
        await initiateJoin();
    };

    const initiateJoin = async () => {
        if (token && activeReceiver) {
            await handleJoinCall();
            startTimer();
        }
    };

    const startTimer = () => {
        stopTimer();
        setCallDuration(0);
        timerIntervalRef.current = setInterval(() => {
            setCallDuration(prev => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startRingingTimeout = () => {
        stopRingingTimeout();
        ringingTimeoutRef.current = setTimeout(() => {
            if (!isCalling && incomingCall) {
                console.log("Ringing timeout - rejecting call");
                rejectCall();
            }
        }, 10000); // 10 seconds
    };

    const stopRingingTimeout = () => {
        if (ringingTimeoutRef.current) {
            clearTimeout(ringingTimeoutRef.current);
            ringingTimeoutRef.current = null;
        }
    };

    const handleJoinCall = async () => {
        try {
            const channelName = incomingCall?.channel_name || `call_${Math.min(user.id, activeReceiver)}_${Math.max(user.id, activeReceiver)}`;
            
            const response = await fetch(`${API_URL}/agora/token?channelName=${channelName}`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Token fetch failed: ${response.status} ${errorText}`);
            }
            const { token: agoraToken, appId, uid } = await response.json();
            
            await agoraCallService.init(appId);
            await agoraCallService.join(channelName, agoraToken, uid);
        } catch (error) {
            console.error("Agora join failed", error);
            endCall();
        }
    };

    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        agoraCallService.toggleMute(newMuted);
    };

    const fetchChatList = async () => {
        setIsLoadingChats(true);
        try {
            const response = await fetch(`${API_URL}/chat/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setChatList(data);

                // If on desktop and no receiver selected, select the first chat automatically
                if (data.length > 0 && !activeReceiver && window.innerWidth >= 768) {
                    setActiveReceiver(data[0].id);
                    if (data[0].vendor) {
                        setActiveVendorId(data[0].vendor.id);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to fetch chat list", error);
        } finally {
            setIsLoadingChats(false);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((!input.trim() && !selectedFile) || !activeReceiver) return;

        setIsSending(true);
        try {
            await sendMessage(
                input.trim(),
                activeReceiver,
                activeVendorId || undefined,
                selectedFile || undefined
            );
            setInput("");
            setSelectedFile(null);
            if (filePreview) {
                URL.revokeObjectURL(filePreview);
                setFilePreview(null);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFilePreview(null); // Non-image files won't have a preview
        }
    };

    const cancelFileSelection = () => {
        setSelectedFile(null);
        if (filePreview) {
            URL.revokeObjectURL(filePreview);
            setFilePreview(null);
        }
    };

    const filteredChats = chatList.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeChat = chatList.find(chat => chat.id === activeReceiver) || (activeReceiver ? {
        id: activeReceiver,
        name: paramName || "Vendor",
        profile_photo: null,
        vendor: { id: paramVendorId ? parseInt(paramVendorId) : null }
    } : null);

    if (!user) return null;

    return (
        <>
        <div className="mt-6 md:mt-12 bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row h-[calc(100vh-150px)] md:h-[600px] lg:h-[700px] animate-in fade-in duration-500 relative">

            {/* Sidebar / Chat List */}
            <div className={`w-full md:w-[350px] border-r border-gray-100 flex flex-col bg-[#f0f2f5]/30 ${view === 'chat' ? 'hidden md:flex' : 'flex'}`}>
                {/* Search / Filter */}
                <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search or start new chat"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all text-slate-800 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* List of Chats */}
                <div className="flex-grow overflow-y-auto divide-y divide-gray-50">
                    {isLoadingChats && chatList.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
                        </div>
                    ) : (filteredChats.length === 0 && globalVendors.length === 0) ? (
                        <div className="text-center py-12 text-gray-400">
                            <Store className="w-12 h-12 mb-2 opacity-20 mx-auto" />
                            <p className="text-xs font-bold uppercase tracking-widest">No chats found</p>
                        </div>
                    ) : (
                        <div>
                            {filteredChats.map((chat) => {
                                const isSelected = activeReceiver === chat.id;
                                const time = chat.last_message?.created_at
                                    ? format(new Date(chat.last_message.created_at), 'hh:mm a')
                                    : '';

                                return (
                                    <button
                                        key={chat.id}
                                        onClick={() => {
                                            setActiveReceiver(chat.id);
                                            if (chat.vendor) {
                                                setActiveVendorId(chat.vendor.id);
                                            }
                                        }}
                                        className={`w-full flex items-center gap-4 p-4 transition-all text-left relative group ${isSelected
                                                ? 'bg-slate-100/80 border-l-4 border-l-slate-900'
                                                : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                                            }`}
                                    >
                                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white shadow-md overflow-hidden border-2 border-red-50 flex items-center justify-center font-black text-slate-800 text-lg relative">
                                            {chat.profile_photo ? (
                                                <img
                                                    src={chat.profile_photo.startsWith('http') ? chat.profile_photo : `https://alinggon-ap.rangpurit.com/storage/${chat.profile_photo}`}
                                                    alt={chat.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                chat.name.charAt(0)
                                            )}
                                            {chat.unread_count > 0 && (
                                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="font-black text-slate-900 text-sm truncate uppercase tracking-tight group-hover:text-red-500 transition-colors">
                                                    {chat.name}
                                                </h4>
                                                <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">
                                                    {time}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs text-gray-500 truncate font-medium">
                                                    {chat.last_message?.message || "Attachment"}
                                                </p>
                                                {chat.unread_count > 0 && (
                                                    <span className="bg-red-500 text-white text-[10px] font-black min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 shadow-md shadow-red-200">
                                                        {chat.unread_count}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}

                            {globalVendors.length > 0 && (
                                <div className="mt-4 border-t border-gray-100/50 pt-4 bg-white/40">
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-4">New Shops (Global Search)</h5>
                                    <div className="flex flex-col">
                                        {globalVendors.map((vendor) => {
                                            const isSelected = activeReceiver === vendor.id;
                                            return (
                                                <button
                                                    key={vendor.id}
                                                    onClick={() => {
                                                        setActiveReceiver(vendor.id);
                                                        setActiveVendorId(vendor.vendor_id);
                                                    }}
                                                    className={`w-full flex items-center gap-4 p-4 transition-all text-left relative group ${isSelected
                                                            ? 'bg-slate-100/80 border-l-4 border-l-slate-900'
                                                            : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                                                        }`}
                                                >
                                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white shadow-md overflow-hidden border-2 border-red-50 flex items-center justify-center font-black text-slate-800 text-lg">
                                                        {vendor.profile_photo ? (
                                                            <img
                                                                src={vendor.profile_photo.startsWith('http') ? vendor.profile_photo : `https://alinggon-ap.rangpurit.com/storage/${vendor.profile_photo}`}
                                                                alt={vendor.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            vendor.name.charAt(0)
                                                        )}
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <h4 className="font-black text-slate-900 text-sm truncate uppercase tracking-tight group-hover:text-red-500 transition-colors">
                                                            {vendor.name}
                                                        </h4>
                                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                                                            <Store className="w-3 h-3" /> Tap to chat
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Conversation Area */}
            <div className={`flex-grow flex flex-col bg-[#efeae2] relative ${view === 'list' ? 'hidden md:flex' : 'flex'}`}>
                {/* Background Pattern Overlay (WhatsApp Style) */}
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none bg-repeat"
                    style={{ backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')` }}
                />

                {activeReceiver ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm relative z-10">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setView('list')}
                                    className="md:hidden hover:bg-gray-100 p-2 rounded-xl text-gray-600 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <div className="w-10 h-10 rounded-xl bg-gray-50 shadow-sm overflow-hidden border border-gray-200 flex items-center justify-center font-bold text-slate-800 text-base">
                                    {activeChat?.profile_photo ? (
                                        <img
                                            src={activeChat.profile_photo.startsWith('http') ? activeChat.profile_photo : `https://alinggon-ap.rangpurit.com/storage/${activeChat.profile_photo}`}
                                            alt={activeChat?.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        activeChat?.name?.charAt(0)
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-black text-sm text-slate-900 uppercase tracking-tight">{activeChat?.name}</h3>
                                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                    <button 
                                        className="p-2 md:p-3 text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-95"
                                        onClick={handleStartCall}
                                        title="Voice Call"
                                    >
                                        <Phone className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                            </div>
                        </div>

                        {/* Messages Display */}
                        <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 relative z-10">
                            {messages.map((msg, index) => {
                                const isMe = String(msg.is_vendor_sender) === '0' || String(msg.is_vendor_sender) === 'false' || !msg.is_vendor_sender;

                                return (
                                    <div
                                        key={msg.id || index}
                                        className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                                    >
                                        <div
                                            className={`max-w-[75%] p-3.5 rounded-2xl text-sm shadow-sm relative ${isMe
                                                    ? 'bg-[#d9fdd3] text-slate-800 rounded-tr-none'
                                                    : 'bg-white text-slate-800 rounded-tl-none'
                                                }`}
                                        >
                                            {/* File/Image Attachment */}
                                            {msg.image && (
                                                <div className="mb-2 rounded-xl overflow-hidden border border-black/10">
                                                    {msg.file_type?.startsWith('image/') ? (
                                                        <a href={msg.image} target="_blank" rel="noreferrer">
                                                            <img src={msg.image} alt="Attachment" className="max-w-full max-h-[250px] object-cover hover:scale-105 transition-transform duration-300" />
                                                        </a>
                                                    ) : (
                                                        <a
                                                            href={msg.image}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex items-center gap-3 p-4 bg-black/5 hover:bg-black/10 transition-colors"
                                                        >
                                                            <div className="w-10 h-10 rounded-lg bg-white/80 shadow-sm flex items-center justify-center text-red-500">
                                                                <FileText className="w-5 h-5" />
                                                            </div>
                                                            <div className="min-w-0 flex-grow">
                                                                <p className="text-xs font-black truncate text-slate-800">{msg.file_name || "Download File"}</p>
                                                                <p className="text-[10px] text-gray-500 uppercase tracking-tight">Attachment</p>
                                                            </div>
                                                        </a>
                                                    )}
                                                </div>
                                            )}

                                            {msg.message && (
                                                <p className="leading-relaxed whitespace-pre-wrap font-sans text-slate-700 font-medium">{msg.message}</p>
                                            )}

                                            <div className="flex items-center justify-end gap-1.5 mt-1 opacity-60">
                                                <span className="text-[9px] font-sans text-gray-500">
                                                    {format(new Date(msg.created_at), 'hh:mm a')}
                                                </span>
                                                {isMe && (
                                                    msg.is_read ? (
                                                        <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                                                    ) : (
                                                        <Check className="w-3.5 h-3.5 text-gray-500" />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>


                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100 relative z-10 shadow-lg">
                            {/* File Upload Preview */}
                            {selectedFile && (
                                <div className="absolute bottom-full left-0 right-0 p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between animate-in slide-in-from-bottom-2">
                                    <div className="flex items-center gap-3">
                                        {filePreview ? (
                                            <div className="w-14 h-14 rounded-xl border-2 border-white shadow-md overflow-hidden bg-white">
                                                <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-500 border border-gray-200">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="text-xs font-black truncate text-slate-800 max-w-[200px] md:max-w-md">{selectedFile.name}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={cancelFileSelection}
                                        className="text-[11px] font-black text-red-500 hover:text-slate-900 uppercase tracking-widest p-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleSend} className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-all active:scale-95 flex items-center justify-center"
                                    title="Attach file"
                                >
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                                />

                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={selectedFile ? "Add a caption..." : "Type a message..."}
                                    className="flex-grow pl-4 pr-12 py-3 bg-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all text-slate-800 placeholder:text-gray-400 font-medium"
                                />

                                <button
                                    type="submit"
                                    disabled={(!input.trim() && !selectedFile) || isSending}
                                    className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSending ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                        <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-xl flex items-center justify-center mb-6 text-slate-800 border border-gray-100">
                            <Store className="w-10 h-10" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Your Vendor Messages</h3>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2 max-w-xs mx-auto px-4 leading-relaxed">
                            Select a vendor from the sidebar to view chat history and start messaging in real-time.
                        </p>
                    </div>
                )}
            </div>
        </div>

        {/* Full-Screen Call Modal */}
        {(isCalling || incomingCall) && (
            <div className="fixed inset-0 bg-slate-900/95 z-[9999] flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-500" style={{ background: 'radial-gradient(circle at top, #1c2833, #000000)', backdropFilter: 'blur(20px)' }}>
                <div className="relative mb-12">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] border-4 border-white/10 overflow-hidden">
                        {incomingCall?.from_user?.avatar || activeChat?.profile_photo ? (
                            <img 
                                src={incomingCall?.from_user?.avatar || (activeChat?.profile_photo?.startsWith('http') ? activeChat.profile_photo : `https://alinggon-ap.rangpurit.com/storage/${activeChat.profile_photo}`)} 
                                alt="Caller" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-16 h-16 md:w-20 md:h-20 text-white/90" />
                        )}
                    </div>
                    {(!isCalling || incomingCall) && (
                        <div className="absolute -inset-4 border-2 border-blue-500/30 rounded-full animate-ping pointer-events-none" />
                    )}
                </div>
                
                <h4 className="text-2xl md:text-3xl font-black mb-2 text-center uppercase tracking-tight text-white drop-shadow-lg">
                    {incomingCall ? incomingCall.from_user.name : (activeChat?.name || 'Voice Call')}
                </h4>
                
                <p className={`text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-20 ${isCalling && !incomingCall ? 'text-green-400' : 'text-blue-400 animate-pulse'}`}>
                    {incomingCall ? 'Incoming Call...' : (isCalling && !incomingCall ? `On Call • ${formatDuration(callDuration)}` : 'Connecting...')}
                </p>

                <div className="flex items-center gap-8 md:gap-12">
                    {incomingCall ? (
                        <>
                            <button 
                                onClick={rejectCall}
                                className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-2xl hover:scale-110 active:scale-95 ring-4 ring-red-500/20"
                            >
                                <PhoneOff className="w-9 h-9" />
                            </button>
                            <button 
                                onClick={acceptCall}
                                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-all shadow-2xl hover:scale-110 active:scale-95 ring-4 ring-green-500/20"
                            >
                                <Phone className="w-9 h-9" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={toggleMute}
                                className={`w-16 h-16 ${isMuted ? 'bg-orange-500 shadow-orange-500/20' : 'bg-white/10 hover:bg-white/20'} rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 border border-white/10`}
                            >
                                {isMuted ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                            </button>
                            <button 
                                onClick={endCall}
                                className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-2xl hover:scale-110 active:scale-95 ring-4 ring-red-500/20"
                            >
                                <PhoneOff className="w-10 h-10" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        )}
    </>
);
}
