import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
    id: string;
    title: string;
    content: string;
    timestamp: Date;
    isRead: boolean;
    sender: string;
}

interface MessageContextType {
    messages: Message[];
    sendMessage: (title: string, content: string) => void;
    markAsRead: (id: string) => void;
    unreadCount: number;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = (title: string, content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            title,
            content,
            timestamp: new Date(),
            isRead: false,
            sender: 'Admin',
        };
        setMessages((prev) => [newMessage, ...prev]);
    };

    const markAsRead = (id: string) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id ? { ...msg, isRead: true } : msg
            )
        );
    };

    const unreadCount = messages.filter((msg) => !msg.isRead).length;

    return (
        <MessageContext.Provider value={{ messages, sendMessage, markAsRead, unreadCount }}>
            {children}
        </MessageContext.Provider>
    );
}

export function useMessages() {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessageProvider');
    }
    return context;
}
