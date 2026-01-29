import React, { useState } from "react";
import { Card } from "./ui/card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "./Input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useMessages } from "../components/UseMessage";
import { sendSupportMessage } from "../lib/ApiSupport";




export default function ContatoSendUserToAdm() {
    const { messages, markAsRead, unreadCount, refresh } = useMessages();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const handleSendMessage = async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Por favor, preencha o título e a mensagem");
            return;
        }

        try {
            await sendSupportMessage({
                title: title.trim(),
                body: content.trim(),
                senderUserId: localStorage.getItem("userId")?.toString()
            });

            setTitle("");
            setContent("");

            toast.success("Mensagem enviada!", {
                icon: <CheckCircle className="size-4" />,
            });
        } catch (err: any) {
            toast.error(err?.message ?? "Falha ao enviar mensagem");
        }
    };


    return (
        <div className="w-screen bg-background">
            <Card className="w-full min-h-screen rounded-none border-0">
                <div className="w-full max-w-5xl mx-auto items-center">
                    <div className="flex items-center gap-2">
                        <CardHeader className="w-full items-center mx-auto">
                            <CardTitle className="flex items-center gap-2">
                                <Send className="size-5" />
                                Painel do Administrador
                            </CardTitle>
                            <CardDescription>
                                Envie mensagens para todos os usuários do sistema
                            </CardDescription>
                        </CardHeader>
                    </div>
                </div>
                <CardContent className="flex flex-col gap-6 flex-1">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título da Mensagem</Label>
                        <Input
                            id="title"
                            placeholder="Digite o título..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <Label htmlFor="content">Conteúdo</Label>
                        <Textarea
                            id="content"
                            placeholder="Digite sua mensagem aqui..."
                            className="flex-1 resize-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={handleSendMessage}
                        className="w-full h-12 text-base font-semibold"
                    >
                        <Send className="size-4 mr-2" />
                        Enviar Mensagem
                    </Button>
                </CardContent>
            </Card>
        </div>

    );
}
