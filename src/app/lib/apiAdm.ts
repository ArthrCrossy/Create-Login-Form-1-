// src/lib/api.ts
const API_BASE = "http://localhost:3000";


function authHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function publishBroadcast(payload: { title: string; body: string }) {
    console.log("✅ broadcast.routes carregou");
    const res = await fetch(`${API_BASE}/admin/broadcast`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function listBroadcasts(limit = 20, offset = 0) {
    const res = await fetch(`${API_BASE}/me/broadcast?limit=${limit}&offset=${offset}`, {
        headers: { ...authHeaders() },
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function markBroadcastRead(messageId: number) {
    const res = await fetch(`${API_BASE}/me/broadcast/${messageId}/read`, {
        method: "POST",
        headers: { ...authHeaders() },
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function unreadBroadcastCount() {
    const res = await fetch(`${API_BASE}/me/broadcast/unread-count`, {
        headers: { ...authHeaders() },
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json(); // { count }
}

export async function deleteBroadcast(id: String) {
    const token = localStorage.getItem("token"); // ou de onde você pega
    const res = await fetch(`${API_BASE}/me/broadcast/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Erro ao deletar broadcast");
    }

    return res.json();
}

export async function replyToMessage(data: { messageId: number; body: string }) {
    const res = await fetch(`http://localhost:3000/api/broadcasts/${data.messageId}/replies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ body: data.body }),
    });

    if (!res.ok) throw new Error("Erro ao responder");
    return res.json();
}

export async function listReplies(messageId: number, limit = 50, offset = 0) {
    const res = await fetch(`http://localhost:3000/api/broadcasts/${messageId}/replies?limit=${limit}&offset=${offset}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) throw new Error("Erro ao carregar replies");
    return res.json();
}




