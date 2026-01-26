// src/components/UseMessage.tsx
import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { listBroadcasts, markBroadcastRead as apiMarkRead } from "../lib/apiAdm"; // ajuste o path

export interface Message {
    id: string;          // no back vem number -> aqui vira string
    title: string;
    content: string;
    timestamp: Date;
    isRead: boolean;
    sender: string;
}

interface MessageContextType {
    messages: Message[];
    refresh: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    unreadCount: number;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

function mapRowToMessage(row: any): Message {
    return {
        id: String(row.id),
        title: row.title ?? "",
        content: row.body ?? "",
        timestamp: new Date(row.created_at),
        isRead: Boolean(row.is_read),
        sender: "Admin",
    };
}

export function MessageProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);

    const refresh = async () => {
        const data = await listBroadcasts(50, 0); // { items, limit, offset }
        const items = Array.isArray(data?.items) ? data.items : [];
        setMessages(items.map(mapRowToMessage));
    };

    useEffect(() => {
        refresh().catch(console.error);
    }, []);

    const markAsRead = async (id: string) => {
        const messageId = Number(id);
        if (!Number.isFinite(messageId)) return;
        await apiMarkRead(messageId);
        // atualiza UI local
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
        );
    };

    const unreadCount = useMemo(
        () => messages.filter((m) => !m.isRead).length,
        [messages]
    );

    return (
        <MessageContext.Provider value={{ messages, refresh, markAsRead, unreadCount }}>
            {children}
        </MessageContext.Provider>
    );
}

export function useMessages() {
    const context = useContext(MessageContext);
    if (!context) throw new Error("useMessages must be used within a MessageProvider");
    return context;
}
