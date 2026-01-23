import { useMessages } from '../components/UseMessage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Inbox, Mail, MailOpen, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function UserInbox() {
    const { messages, markAsRead, unreadCount } = useMessages();

    const formatDate = (date: Date) => {
        return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <Inbox className="h-12 w-12 mb-4 text-gray-400" />
            <p className="text-sm text-gray-500">Nenhuma mensagem recebida</p>
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Inbox className="size-5" />
                            Caixa de Mensagens
                        </CardTitle>
                        {unreadCount > 0 && (
                            <Badge variant="destructive" className="rounded-full">
                                {unreadCount} nova{unreadCount !== 1 ? 's' : ''}
                            </Badge>
                        )}
                    </div>
                    <CardDescription>
                        Mensagens recebidas do administrador
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[500px] pr-4">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                <Inbox className="size-12 mb-3 opacity-50" />
                                <p>Nenhuma mensagem recebida</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {messages.map((message) => (
                                    <Card
                                        key={message.id}
                                        className={`${!message.isRead ? 'border-primary bg-primary/5' : 'bg-muted/30'}`}
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-2 flex-1">
                                                    {message.isRead ? (
                                                        <MailOpen className="size-4 text-muted-foreground" />
                                                    ) : (
                                                        <Mail className="size-4 text-primary" />
                                                    )}
                                                    <CardTitle className="text-base">
                                                        {message.title}
                                                    </CardTitle>
                                                </div>
                                                {!message.isRead && (
                                                    <Badge variant="default" className="shrink-0">Nova</Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                                                <Clock className="size-3" />
                                                {formatDate(message.timestamp)}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pb-3 space-y-3">
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            {!message.isRead && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => markAsRead(message.id)}
                                                    className="w-full"
                                                >
                                                    Marcar como lida
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>

    );
}
