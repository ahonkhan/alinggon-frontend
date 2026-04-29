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
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const { user, token } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeReceiver, setActiveReceiver] = useState<number | null>(null);
    const [activeVendorId, setActiveVendorId] = useState<number | null>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    // Handle Real-time Echo Listeners
    useEffect(() => {
        if (token && user) {
            const echo = initEcho(token);

            // FIX: Guard clause to prevent "possibly undefined" error
            if (!echo) return;

            const channelName = `chat.${user.id}`;
            const channel = echo.private(channelName);

            channel.listen('.message.sent', (data: { message: Message }) => {
                // Update messages state if the sender is the one we are currently viewing
                if (Number(data.message.sender_id) === Number(activeReceiver)) {
                    setMessages((prev) => [...prev, data.message]);
                }
            });

            return () => {
                // Cleanup listeners and leave the channel to prevent memory leaks/duplicate listeners
                channel.stopListening('.message.sent');
                echo.leave(channelName);
            };
        }
    }, [token, user, activeReceiver]);

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