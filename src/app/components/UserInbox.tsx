import { useEffect } from "react";
import { useMessages } from "./UseMessage";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Inbox, Mail, MailOpen, Clock, RefreshCcw, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { deleteBroadcast } from "../lib/apiAdm";

export function UserInbox() {
    const { messages, markAsRead, unreadCount, refresh } = useMessages();

    useEffect(() => {
        refresh().catch(console.error);
    }, [refresh]);

    const formatDate = (date: Date) => {
        return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    };

    const handleDelete = async (broadcastId: string) => {
        try {
            const ok = confirm("Deletar esta mensagem?");
            if (!ok) return;

            await deleteBroadcast(broadcastId);
            await refresh();
        } catch (e) {
            console.error(e);
            alert("Erro ao deletar");
        }
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
                                {unreadCount} nova{unreadCount !== 1 ? "s" : ""}
                            </Badge>
                        )}
                    </div>

                    <CardDescription className="flex items-center justify-center gap-2">
                        Mensagens recebidas do administrador
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => refresh().catch(console.error)}
                            className="gap-2"
                        >
                            <RefreshCcw className="size-4" />
                            Atualizar
                        </Button>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <ScrollArea className="h-[800px] pr-4">
                        {messages.length === 0 ? (
                            <div className="w-screen h-screen flex flex-col items-center justify-center">
                                <Inbox className="size-12 mb-3 opacity-50" />
                                <p>Nenhuma mensagem recebida</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {messages.map((message) => (
                                    <Card
                                        key={message.id}
                                        className={`relative ${
                                            !message.isRead
                                                ? "border-primary bg-primary/5"
                                                : "bg-muted/30"
                                        }`}
                                    >
                                        {/* BOTÃO DELETAR (canto superior direito) */}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleDelete(message.id);
                                            }}
                                            className="absolute top-2 right-2 h-8 w-8 hover:bg-red-100"
                                            title="Deletar mensagem"
                                        >
                                            <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                                        </Button>

                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between gap-2">
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
                                                    <Badge variant="default" className="shrink-0">
                                                        Nova
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                                                <Clock className="size-3" />
                                                {formatDate(message.timestamp)}
                                            </div>
                                        </CardHeader>

                                        <CardContent className="pb-3 space-y-3">
                                            <p className="text-sm whitespace-pre-wrap">
                                                {message.content}
                                            </p>

                                            {!message.isRead && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        markAsRead(message.id).catch(console.error)
                                                    }
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
