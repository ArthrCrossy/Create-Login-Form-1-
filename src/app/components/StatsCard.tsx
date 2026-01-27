import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    icon: LucideIcon;
    title: string;
    iconBgColor: string;
    iconColor: string;
}

export function StatsCard({ icon: Icon, title, iconBgColor, iconColor }: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`${iconBgColor} p-4 rounded-lg`}>
                <Icon className={`size-6 ${iconColor}`} />
            </div>
            <p className="text-sm text-gray-700 font-medium">{title}</p>
        </div>
    );
}
