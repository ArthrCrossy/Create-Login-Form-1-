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
        <div className="w-screen h-screen items-center justify-center text-center">
            <Card className="w-screen h-screen text-center">
                <CardHeader>
                    <div className="items-center justify-center text-center">
                        <CardTitle className="flex items-center justify-center gap-2">
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
                    <ScrollArea className="h-[800px] pr-4">
                        {messages.length === 0 ? (
                            <div className="w-screen h-screen">
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
                                            <div className="items-center justify-center text-center gap-2">
                                                <div className="items-center justify-center text-center gap-2 flex-1">
                                                    {message.isRead ? (
                                                        <MailOpen className="items-center justify-center text-center size-4 text-muted-foreground" />
                                                    ) : (
                                                        <Mail className="items-center justify-center text-center size-4 text-primary" />
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
