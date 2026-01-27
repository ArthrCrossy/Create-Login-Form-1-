import { Navbar } from './Navbar'
import { StatsCard } from './StatsCard';
import { MessageSection } from './MessageSection';
import { RecentMessages } from './RecentMessages';
import { UserInteractions } from './UserInteractions';
import { Inbox, Edit, BarChart3 } from 'lucide-react';

export default function UserPage() {
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
            </div>
        </div>
    );
}
