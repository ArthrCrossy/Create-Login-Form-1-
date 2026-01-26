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
