"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { initEcho } from "@/utils/echo";
import { API_URL } from "@/config/api";

interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    is_read: boolean;
    is_vendor_sender: boolean;
    image?: string;
    file_type?: string;
    file_name?: string;
    created_at: string;
}

interface ChatContextType {
    isOpen: boolean;
    toggleChat: () => void;
    messages: Message[];
    sendMessage: (message: string, receiverId: number, vendorId?: number, file?: File) => Promise<void>;
    activeReceiver: number | null;
    setActiveReceiver: (id: number | null) => void;
    activeVendorId: number | null;
    setActiveVendorId: (id: number | null) => void;
    
    // Call related
    isCalling: boolean;
    incomingCall: any | null;
    startCall: (receiverId: number) => Promise<void>;
    acceptCall: () => Promise<void>;
    rejectCall: () => Promise<void>;
    endCall: () => Promise<void>;
    isAccepted: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const { user, token } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeReceiver, setActiveReceiver] = useState<number | null>(null);
    const [activeVendorId, setActiveVendorId] = useState<number | null>(null);

    // Call state
    const [isCalling, setIsCalling] = useState(false);
    const [incomingCall, setIncomingCall] = useState<any | null>(null);
    const [currentCallData, setCurrentCallData] = useState<any | null>(null);
    const [isAccepted, setIsAccepted] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    // Handle Real-time Echo Listeners
    useEffect(() => {
        if (token && user) {
            const echo = initEcho(token);

            if (!echo) return;

            const channelName = `chat.${user.id}`;
            const channel = echo.private(channelName);

            channel.listen('.message.sent', (data: { message: Message }) => {
                if (Number(data.message.sender_id) === Number(activeReceiver) || Number(data.message.receiver_id) === Number(user.id)) {
                    setMessages((prev) => {
                        // Avoid duplicates
                        if (prev.some(m => m.id === data.message.id)) return prev;
                        return [...prev, data.message];
                    });
                }
            });

            channel.listen('.call-signal', (data: any) => {
                console.log("Call Signal Received:", data);
                if (data.type === 'incoming') {
                    setIncomingCall(data);
                } else if (data.type === 'accept') {
                    setIsCalling(true);
                    setIsAccepted(true);
                    setIncomingCall(null);
                    setCurrentCallData(data);
                } else if (data.type === 'reject' || data.type === 'end') {
                    setIsCalling(false);
                    setIsAccepted(false);
                    setIncomingCall(null);
                    setCurrentCallData(null);
                }
            });

            return () => {
                channel.stopListening('.message.sent');
                channel.stopListening('.call-signal');
                echo.leave(channelName);
            };
        }
    }, [token, user, activeReceiver]);

    // Check for active calls on mount
    useEffect(() => {
        if (token) {
            fetch(`${API_URL}/agora/active-call`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }).then(res => res.json()).then(data => {
                if (data.active) {
                    setIncomingCall(data.call);
                }
            });
        }
    }, [token]);

    const startCall = async (receiverId: number) => {
        if (!token) return;
        try {
            const channelName = `call_${Date.now()}_${user.id}`;
            const res = await fetch(`${API_URL}/agora/signal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    to_user_id: receiverId,
                    type: 'incoming',
                    channel_name: channelName
                })
            });
            if (res.ok) {
                const data = await res.json();
                setCurrentCallData(data.data);
                setIsCalling(true);
                setIsAccepted(false); // Wait for receiver to accept
            }
        } catch (error) {
            console.error("Failed to start call", error);
        }
    };

    const acceptCall = async () => {
        if (!token || !incomingCall) return;
        try {
            await fetch(`${API_URL}/agora/signal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    to_user_id: incomingCall.from_user.id,
                    type: 'accept',
                    channel_name: incomingCall.channel_name
                })
            });
            setIsCalling(true);
            setIsAccepted(true);
            setCurrentCallData(incomingCall);
            setIncomingCall(null);
        } catch (error) {
            console.error("Failed to accept call", error);
        }
    };

    const rejectCall = async () => {
        if (!token || !incomingCall) return;
        try {
            await fetch(`${API_URL}/agora/signal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    to_user_id: incomingCall.from_user.id,
                    type: 'reject',
                    channel_name: incomingCall.channel_name
                })
            });
            setIncomingCall(null);
        } catch (error) {
            console.error("Failed to reject call", error);
        }
    };

    const endCall = async () => {
        const targetId = currentCallData?.from_user?.id === user?.id 
            ? activeReceiver 
            : currentCallData?.from_user?.id;
            
        if (!token || !targetId) {
            setIsCalling(false);
            setCurrentCallData(null);
            return;
        }

        try {
            await fetch(`${API_URL}/agora/signal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    to_user_id: targetId,
                    type: 'end',
                    channel_name: currentCallData?.channel_name
                })
            });
            setIsCalling(false);
            setCurrentCallData(null);
        } catch (error) {
            console.error("Failed to end call", error);
            setIsCalling(false);
            setCurrentCallData(null);
        }
    };

    // Fetch message history when active receiver changes
    useEffect(() => {
        if (activeReceiver && token) {
            fetchMessages(activeReceiver);
        }
    }, [activeReceiver, token]);

    const fetchMessages = async (receiverId: number) => {
        try {
            const response = await fetch(`${API_URL}/chat/messages/${receiverId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const sendMessage = async (message: string, receiverId: number, vendorId?: number, file?: File) => {
        try {
            const formData = new FormData();
            formData.append('receiver_id', receiverId.toString());
            if (message) formData.append('message', message);
            if (vendorId) formData.append('vendor_id', vendorId.toString());
            if (file) formData.append('image', file);

            const response = await fetch(`${API_URL}/chat/send`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                body: formData,
            });
            
            if (response.ok) {
                const newMessage = await response.json();
                setMessages((prev) => [...prev, newMessage]);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <ChatContext.Provider
            value={{
                isOpen,
                toggleChat,
                messages,
                sendMessage,
                activeReceiver,
                setActiveReceiver,
                activeVendorId,
                setActiveVendorId,
                isCalling,
                incomingCall,
                startCall,
                acceptCall,
                rejectCall,
                endCall,
                isAccepted,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}