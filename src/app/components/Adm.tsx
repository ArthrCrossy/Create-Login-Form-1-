import { useEffect, useState } from 'react';
import { MessageSquare, PenLine, BarChart3, Home, FileText, Settings, Heart, MessageCircle, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';
import { publishBroadcast, listBroadcasts, markBroadcastRead } from "../lib/apiAdm";


interface Message   {
    id: number;
    type: string;
    title: string;
    description: string;
    category: string;
    author: string;
    likes: number;
    comments: number;
}

interface UserInteraction {
    id: number;
    user: string;
    action: string;
    time: string;
    icon: 'like' | 'comment' | 'share';
}

export default function Adm() {
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




    const userInteractions: UserInteraction[] = [
        {
            id: 1,
            user: 'User A',
            action: 'Liked your post',
            time: '1 hour ago',
            icon: 'like'
        },
        {
            id: 2,
            user: 'User B',
            action: 'Commented on your post',
            time: '2 hours ago',
            icon: 'comment'
        },
        {
            id: 3,
            user: 'User C',
            action: 'Shared your announcement',
            time: '1 day ago',
            icon: 'share'
        }
    ];

    const handleSaveDraft = () => {
        console.log('Draft saved:', message);
    };

    const handlePreview = () => {
        console.log('Preview:', message);
    };

    const handlePublish = async () => {
        try {
            if (!message.trim()) return;

            await publishBroadcast({
                title: "Announcement",
                body: message,
            });

            setMessage("");

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
            alert("Erro ao publicar");
        }
    };


    const getInteractionIcon = (icon: string) => {
        switch (icon) {
            case 'like':
                return <ThumbsUp className="h-5 w-5 text-yellow-500" />;
            case 'comment':
                return <MessageCircle className="h-5 w-5 text-gray-400" />;
            case 'share':
                return <Share2 className="h-5 w-5 text-blue-400" />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-gray-800 text-white px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-xl font-semibold">Admin User</h1>
                    <p className="text-sm text-gray-400">Welcome to the Admin Panel</p>
                </div>
            </header>
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Link to="/adm/user-inbox" className="block">
                        <Card className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="bg-blue-100 p-4 rounded-lg mb-3">
                                    <MessageSquare className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="font-medium text-gray-900">
                                    Mensagens recebidas
                                </h3>
                            </div>
                        </Card>
                    </Link>

                    <Card className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="bg-gray-100 p-4 rounded-lg mb-3">
                                <PenLine className="h-8 w-8 text-gray-700" />
                            </div>
                            <h3 className="font-medium text-gray-900">New Post</h3>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="bg-green-100 p-4 rounded-lg mb-3">
                                <BarChart3 className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-medium text-gray-900">Statistics</h3>
                        </div>
                    </Card>
                </div>

                {/* Write Your Message Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Write Your Message</h2>
                    <Card className="p-6 bg-white">
                        <Textarea
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[200px] resize-none border-gray-200 focus:border-gray-300 mb-2"
                        />
                        <p className="text-xs text-gray-400 mb-6">
                            You can share announcements, updates, or important information.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <Button
                                variant="outline"
                                onClick={handleSaveDraft}
                                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Save Draft
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handlePreview}
                                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Preview
                            </Button>
                            <Button
                                onClick={handlePublish}
                                className="w-full bg-black text-white hover:bg-gray-900"
                            >
                                Publish Post
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Recent Messages Section */}
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

                {/* User Interactions Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">User Interactions</h2>
                    <Card className="bg-white divide-y divide-gray-100">
                        {userInteractions.map((interaction) => (
                            <div key={interaction.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        {getInteractionIcon(interaction.icon)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{interaction.user}</p>
                                        <p className="text-sm text-gray-500">{interaction.action}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">{interaction.time}</span>
                            </div>
                        ))}
                    </Card>
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => setActiveTab('home')}
                            className={`flex flex-col items-center justify-center py-3 ${
                                activeTab === 'home' ? 'text-green-600' : 'text-gray-500'
                            }`}
                        >
                            <Home className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Home</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('blog')}
                            className={`flex flex-col items-center justify-center py-3 ${
                                activeTab === 'blog' ? 'text-green-600' : 'text-gray-500'
                            }`}
                        >
                            <FileText className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Blog</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`flex flex-col items-center justify-center py-3 ${
                                activeTab === 'settings' ? 'text-green-600' : 'text-gray-500'
                            }`}
                        >
                            <Settings className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">Settings</span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
