import { ThumbsUp, MessageCircle } from 'lucide-react';

interface Interaction {
    id: string;
    user: string;
    action: string;
    time: string;
    type: 'like' | 'comment';
}

export function UserInteractions() {
    const interactions: Interaction[] = [
        {
            id: '1',
            user: 'User A',
            action: 'Liked your post',
            time: '1 hour ago',
            type: 'like'
        },
        {
            id: '2',
            user: 'User B',
            action: 'Commented on your post',
            time: '2 hours ago',
            type: 'comment'
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Interactions</h2>

            <div className="space-y-4">
                {interactions.map((interaction) => (
                    <div key={interaction.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                        <div className={`p-2 rounded-lg ${interaction.type === 'like' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                            {interaction.type === 'like' ? (
                                <ThumbsUp className="size-5 text-yellow-600" />
                            ) : (
                                <MessageCircle className="size-5 text-gray-600" />
                            )}
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{interaction.user}</p>
                            <p className="text-xs text-gray-500">{interaction.action}</p>
                        </div>

                        <span className="text-xs text-gray-400">{interaction.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
