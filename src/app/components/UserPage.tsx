import { Navbar } from './Navbar'
import { StatsCard } from './StatsCard';
import { MessageSection } from './MessageSection';
import { RecentMessages } from './RecentMessages';
import { UserInteractions } from './UserInteractions';
import {Inbox, Edit, BarChart3, Heart, MessageCircle} from 'lucide-react';
import {useEffect, useState} from "react";
import {listBroadcasts, publishBroadcast} from "../lib/apiAdm";
import {ScrollArea} from "./ui/scroll-area";
import {Card} from "./ui/card";



type Message = {
    id: number;
    type: string;
    title: string;
    description: string;
    category: string;
    author: string;
    likes: number;
    comments: number;
};

export default function UserPage() {
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('home');

    const [recentMessages, setRecentMessages] = useState<Message[]>([]);

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
                }));

                setRecentMessages(mapped);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);


    return (
        <div className="min-h-screen bg-gray-50">
            <   Navbar />

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
                        <MessageSection />
                        <RecentMessages />
                    </div>
                    <div className="lg:col-span-1">
                        <UserInteractions />
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
                                    className="flex-shrink-0 w-[200px] p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
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
                                            <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                                            <span>{msg.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageCircle className="h-3 w-3" />
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
