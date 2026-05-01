"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";
import { X, Send, User, Store, ArrowLeft, Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { API_URL } from "@/config/api";
import { agoraCallService } from "@/utils/AgoraCallService";

export default function ChatBox() {
    const { 
        isOpen, toggleChat, messages, sendMessage, 
        activeReceiver, setActiveReceiver, activeVendorId,
        isCalling, incomingCall, startCall, acceptCall, rejectCall, endCall
    } = useChat();
    const { user, token } = useAuth();
    const [input, setInput] = useState("");
    const [chatList, setChatList] = useState<any[]>([]);
    const [view, setView] = useState<'list' | 'chat'>('list');
    const [isMuted, setIsMuted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && token) {
            fetchChatList();
        }
    }, [isOpen, token]);

    useEffect(() => {
        if (activeReceiver) {
            setView('chat');
        } else {
            setView('list');
        }
    }, [activeReceiver]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Agora Call Effect
    useEffect(() => {
        if (isCalling && token && activeReceiver) {
            handleJoinCall();
        } else {
            agoraCallService.leave();
        }
    }, [isCalling]);

    const handleJoinCall = async () => {
        try {
            const channelName = incomingCall?.channel_name || `call_${Math.min(user.id, activeReceiver)}_${Math.max(user.id, activeReceiver)}`;
            
            const response = await fetch(`${API_URL}/agora/token?channelName=${channelName}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
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
            }
        } catch (error) {
            console.error("Failed to fetch chat list", error);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !activeReceiver) return;

        const currentInput = input;
        setInput("");
        await sendMessage(currentInput, activeReceiver, activeVendorId || undefined);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-4 left-4 md:left-auto md:right-6 lg:bottom-10 lg:right-10 z-[200] md:w-[400px] h-[500px] md:h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {view === 'chat' && (
                        <button onClick={() => setActiveReceiver(null)} className="hover:bg-white/10 p-1 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}
                    <div>
                        <h3 className="font-bold text-sm">
                            {view === 'list' ? 'My Conversations' : 'Vendor Chat'}
                        </h3>
                        <p className="text-[10px] text-gray-400">
                            {view === 'list' ? 'Select a shop to chat' : 'Direct Message'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {view === 'chat' && (
                        <button 
                            onClick={() => startCall(activeReceiver!)} 
                            className="hover:bg-white/10 p-2 rounded-full text-green-400"
                            title="Start Voice Call"
                        >
                            <Phone className="w-5 h-5" />
                        </button>
                    )}
                    <button onClick={toggleChat} className="hover:bg-white/10 p-1 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto bg-gray-50">
                {view === 'list' ? (
                    <div className="p-2 flex flex-col gap-1">
                        {chatList.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
                                <Store className="w-12 h-12 mb-2 opacity-20" />
                                <p className="text-sm">No conversations yet</p>
                            </div>
                        ) : (
                            chatList.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => setActiveReceiver(chat.id)}
                                    className="flex items-center gap-3 p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 group"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        {chat.name.charAt(0)}
                                    </div>
                                    <div className="flex-grow text-left">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm text-gray-800">{chat.name}</span>
                                            {chat.unread_count > 0 && (
                                                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                                    {chat.unread_count}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 truncate w-40">
                                            {chat.last_message?.message || "No messages yet"}
                                        </p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="p-4 flex flex-col gap-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                                        msg.sender_id === user?.id
                                            ? 'bg-slate-900 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                    }`}
                                >
                                    {msg.message}
                                    <div className={`text-[9px] mt-1 opacity-50 ${msg.sender_id === user?.id ? 'text-right' : 'text-left'}`}>
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* Call Overlay */}
                {(isCalling || incomingCall) && (
                    <div className="absolute inset-0 bg-slate-900/95 z-[250] flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-300">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse ring-4 ring-blue-500/20">
                            <User className="w-12 h-12 text-blue-400" />
                        </div>
                        
                        <h4 className="text-xl font-bold mb-1 text-center">
                            {incomingCall ? incomingCall.from_user.name : (chatList.find(c => c.id === activeReceiver)?.name || 'Calling...')}
                        </h4>
                        <p className="text-sm text-gray-400 mb-12">
                            {incomingCall ? 'Incoming Voice Call' : (isCalling ? 'On Call' : 'Connecting...')}
                        </p>

                        <div className="flex gap-6">
                            {incomingCall ? (
                                <>
                                    <button 
                                        onClick={rejectCall}
                                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
                                    >
                                        <PhoneOff className="w-8 h-8" />
                                    </button>
                                    <button 
                                        onClick={acceptCall}
                                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-all shadow-lg"
                                    >
                                        <Phone className="w-8 h-8" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={toggleMute}
                                        className={`w-14 h-14 ${isMuted ? 'bg-orange-500' : 'bg-slate-700'} rounded-full flex items-center justify-center hover:opacity-80 transition-all`}
                                    >
                                        {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                                    </button>
                                    <button 
                                        onClick={endCall}
                                        className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
                                    >
                                        <PhoneOff className="w-6 h-6" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            {view === 'chat' && (
                <div className="p-4 border-t border-gray-100 bg-white">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-grow bg-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
