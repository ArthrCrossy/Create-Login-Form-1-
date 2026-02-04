import { Navbar } from './Navbar'
import { StatsCard } from './StatsCard';
import { MessageSection } from './MessageSection';
import { RecentMessages } from './RecentMessages';
import { UserInteractions } from './UserInteractions';
import {Inbox, Edit, BarChart3, Heart, MessageCircle} from 'lucide-react';
import {useEffect, useMemo, useState} from "react";
import {listBroadcasts, publishBroadcast} from "../lib/apiAdm";
import {ScrollArea} from "./ui/scroll-area";
import {Card} from "./ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../components/ui/dialog";

import {
    likeBroadcast,
    unlikeBroadcast,
    getMyLikeStatus,
} from "../lib/apiLikes";

import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { markBroadcastRead, replyToMessage } from "../lib/apiAdm";

type Message = {
    id: number;
    type: string;
    title: string;
    description: string;
    category: string;
    author: string;
    likes: number;
    comments: number;
    isRead: boolean;
};

function handleOpenComments(messageId: number) {
    console.log("abrir comentários de:", messageId);
}

type Props = { messageId: number; initialLikes?: number };

export function BroadcastLike({ messageId, initialLikes = 0 }: Props) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);
    const isAuthed = Boolean(localStorage.getItem("token"));

    useEffect(() => {
        if (!isAuthed) return;
        (async () => {
            try {
                const r = await getMyLikeStatus(messageId);
                setLiked(Boolean(r.liked));
                setLikes(Number(r.likes ?? 0));
            } catch {
            }
        })();
    }, [messageId, isAuthed]);
}

export default function UserPage() {
    const [selected, setSelected] = useState<Message | null>(null);
    const [replyText, setReplyText] = useState("");
    const [open, setOpen] = useState(false);
    const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

    const toggleLike = async (messageId: number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Você precisa estar logado para curtir.");
            return;
        }

        const wasLiked = likedIds.has(messageId);

        setLikedIds((prev) => {
            const next = new Set(prev);
            if (wasLiked) next.delete(messageId);
            else next.add(messageId);
            return next;
        });

        setRecentMessages((prev) =>
            prev.map((m) =>
                m.id === messageId
                    ? { ...m, likes: Math.max(0, m.likes + (wasLiked ? -1 : 1)) }
                    : m
            )
        );

        try {
            if (wasLiked) await unlikeBroadcast(messageId);
            else await likeBroadcast(messageId);
        } catch (err) {
            setLikedIds((prev) => {
                const next = new Set(prev);
                if (wasLiked) next.add(messageId);
                else next.delete(messageId);
                return next;
            });

            setRecentMessages((prev) =>
                prev.map((m) =>
                    m.id === messageId
                        ? { ...m, likes: Math.max(0, m.likes + (wasLiked ? +1 : -1)) }
                        : m
                )
            );

            console.error(err);
            alert("Erro ao curtir/descurtir.");
        }
    };
    const [recentMessages, setRecentMessages] = useState<Message[]>([]);

        async function handleOpenMessage(msg: Message) {
            setSelected(msg);
            setOpen(true);

            if (!msg.isRead) {
                try {
                    await markBroadcastRead(msg.id);

                    setRecentMessages((prev) =>
                        prev.map((m) => (m.id === msg.id ? {...m, isRead: true} : m))
                    );
                } catch (e) {
                    console.error(e);
                }
            }
        }
        useEffect(() => {
            (async () => {
                try {
                    const data = await listBroadcasts(50, 0);
                    const mapped: Message[] = data.items.map((row: any) => ({
                        id: row.id,
                        type: "Broadcast",
                        title: row.title,
                        description: row.body,
                        category: "update",
                        author: "Admin",
                        likes: 0,
                        comments: 0,
                        isRead: Boolean(row.is_read ?? row.isRead ?? 0),
                    }));
                    setRecentMessages(mapped);
                } catch (e) {
                    console.error(e);
                }
            })();
        }, []);

        async function handleReply() {
            if (!selected) return;
            if (!replyText.trim()) return;
            try {
                await replyToMessage({
                    messageId: selected.id,
                    body: replyText,
                });
                setReplyText("");
                setOpen(false);
            } catch (e) {
                console.error(e);
                alert("Erro ao responder");
            }
        }
        return (
            <div className="min-h-screen bg-gray-50">
                <   Navbar/>
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatsCard
                            icon={Inbox}
                            title="Mensagens recebidas"
                            iconBgColor="bg-blue-50"
                            iconColor="text-blue-600"
                        />
                        <StatsCard
                            icon={Edit}
                            title="New Post"
                            iconBgColor="bg-gray-50"
                            iconColor="text-gray-600"
                        />
                        <StatsCard
                            icon={BarChart3}
                            title="Statistics"
                            iconBgColor="bg-green-50"
                            iconColor="text-green-600"
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <MessageSection/>
                            <RecentMessages/>
                        </div>
                        <div className="lg:col-span-1">
                            <UserInteractions/>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Recent Messages</h2>
                        <p className="text-sm text-gray-500 mb-4">From the latest messages for users</p>

                        <ScrollArea className="w-full">
                            <div className="flex gap-3 pb-4">
                                {recentMessages.map((msg) => (
                                    <Card
                                        key={msg.id}
                                        onClick={() => handleOpenMessage(msg)} // 👈
                                        className={[
                                            "flex-shrink-0 w-[200px] p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer",
                                            msg.isRead ? "opacity-70" : "ring-1 ring-blue-200" // 👈 destaque se não lida
                                        ].join(" ")}
                                    ><Dialog open={open} onOpenChange={setOpen}>
                                        <DialogContent className="max-w-lg">
                                            <DialogHeader>
                                                <DialogTitle>{selected?.title}</DialogTitle>
                                                <DialogDescription>
                                                    {selected?.description}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-500">
                                                    Responder:
                                                </p>
                                                <Textarea
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Digite sua resposta..."
                                                    className="min-h-[120px]"
                                                />
                                            </div>
                                            <DialogFooter className="gap-2">
                                                <Button variant="outline" onClick={() => setOpen(false)}>
                                                    Fechar
                                                </Button>
                                                <Button onClick={handleReply}>
                                                    Responder
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                        <div
                                            className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                                            <div className="text-center px-2">
                                                <p className="text-sm font-medium text-gray-600 mb-1">{msg.type}</p>
                                                <div className="flex justify-center gap-1 mb-2">
                                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                                            {msg.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{msg.description}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                            <span className="bg-gray-100 px-2 py-0.5 rounded">{msg.category}</span>
                                            <span>{msg.author}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        toggleLike(msg.id);
                                                    }}
                                                >
                                                    <Heart className="h-7 w-7 fill-red-500 text-red-500"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation();          // também impede abrir
                                                        handleOpenComments(msg.id);   // se tiver
                                                    }}
                                                >
                                                    <MessageCircle className="h-3 w-3"/>
                                                    <span>{msg.comments}</span>
                                                </button>
                                                <span>{msg.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="h-3 w-3"/>
                                                <span>{msg.comments}</span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        );
    }
