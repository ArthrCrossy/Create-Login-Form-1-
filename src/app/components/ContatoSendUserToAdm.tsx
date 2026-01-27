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



export default function ContatoSendUserToAdm() {
    const { messages, markAsRead, unreadCount, refresh } = useMessages();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSendMessage = () => {
        if (!title.trim() || !content.trim()) {
            toast.error('Por favor, preencha o título e a mensagem');
            return;
        }

        setTitle('');
        setContent('');
        toast.success('Mensagem enviada aos usuários!', {
            icon: <CheckCircle className="size-4" />,
        });
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Send className="size-5" />
                    Painel do Administrador
                </CardTitle>
                <CardDescription>
                    Envie mensagens para todos os usuários do sistema
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Título da Mensagem</Label>
                    <Input
                        id="title"
                        placeholder="Digite o título..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo</Label>
                    <Textarea
                        id="content"
                        placeholder="Digite sua mensagem aqui..."
                        rows={6}
                        value={content}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setContent(e.target.value)}
                    />
                </div>

                <Button
                    onClick={handleSendMessage}
                    className="w-full"
                >
                    <Send className="size-4 mr-2" />
                    Enviar Mensagem
                </Button>
            </CardContent>
        </Card>
    );
}
