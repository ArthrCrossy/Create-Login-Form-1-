📬 Auth & Broadcast Messaging System

Sistema completo de autenticação com roles (admin/user) e mensageria broadcast, desenvolvido em React + TypeScript no front-end e Node.js + TypeScript no back-end.

O projeto simula um cenário real de aplicação SaaS onde:

Admins enviam mensagens

Usuários recebem, leem e interagem com essas mensagens

O sistema mantém estado de leitura, segurança via JWT e separação clara de responsabilidades

🚀 Funcionalidades
🔐 Autenticação

Login e cadastro de usuários

Autenticação baseada em JWT

Armazenamento seguro do token no front

Middleware de proteção de rotas no back-end

Controle de acesso por role (admin / user)

👤 Usuário

Dashboard exclusivo para usuários autenticados

Caixa de mensagens (Inbox)

Visualização de mensagens enviadas pelo admin

Marcação de mensagens como lidas

Contador de mensagens não lidas

Estado persistido no back-end

🛠️ Admin

Dashboard administrativo

Envio de mensagens broadcast para todos os usuários

Visualização de mensagens enviadas

Arquitetura preparada para escalar notificações

🧠 Arquitetura do Projeto
📦 Front-end

React + TypeScript

Context API para gerenciamento global de mensagens

Hooks personalizados (useMessage)

Componentização clara:

Login

SignUp

UserPage

UserInbox

Adm

MessageSection

RecentMessages

StatsCard