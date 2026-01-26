import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
} from "react";
import { listBroadcasts, markBroadcastRead as apiMarkRead } from "../lib/apiAdm";

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
    refresh: (limit?: number, offset?: number) => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    unreadCount: number;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

function safeDate(value: any): Date {
    const d = value instanceof Date ? value : new Date(value);
    return Number.isFinite(d.getTime()) ? d : new Date();
}

function normalizeListResponse(data: any): any[] {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
}

function mapRowToMessage(row: any, prev?: Message): Message {
    const id = String(row?.id ?? "");

    const isReadFromApi =
        row?.is_read !== undefined && row?.is_read !== null
            ? Boolean(Number(row.is_read))
            : undefined;

    return {
        id,
        title: row?.title ?? "",
        content: row?.body ?? row?.content ?? "",
        timestamp: safeDate(row?.created_at ?? row?.createdAt ?? row?.timestamp),
        isRead: isReadFromApi ?? prev?.isRead ?? false,
        sender: row?.sender ?? "Admin",
    };
}

export function MessageProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);

    const refresh = useCallback(async (limit = 50, offset = 0) => {
        const data = await listBroadcasts(limit, offset);
        const items = normalizeListResponse(data);

        setMessages((prev) => {
            const prevById = new Map(prev.map((m) => [m.id, m]));
            return items.map((row) =>
                mapRowToMessage(row, prevById.get(String(row?.id)))
            );
        });
    }, []);

    useEffect(() => {
        refresh().catch(console.error);
    }, [refresh]);

    const markAsRead = useCallback(
        async (id: string) => {
            const messageId = Number(id);
            if (!Number.isFinite(messageId)) return;

            setMessages((prev) =>
                prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
            );

            try {
                await apiMarkRead(messageId);
                await refresh();
            } catch (err) {
                setMessages((prev) =>
                    prev.map((m) => (m.id === id ? { ...m, isRead: false } : m))
                );
                throw err;
            }
        },
        [refresh]
    );

    const unreadCount = useMemo(
        () => messages.filter((m) => !m.isRead).length,
        [messages]
    );

    const value = useMemo(
        () => ({ messages, refresh, markAsRead, unreadCount }),
        [messages, refresh, markAsRead, unreadCount]
    );

    return (
        <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
    );
}

export function useMessages() {
    const context = useContext(MessageContext);
    if (!context)
        throw new Error("useMessages must be used within a MessageProvider");
    return context;
}
