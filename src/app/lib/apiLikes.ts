const API_BASE = "http://localhost:3000/api";

function authHeaders(): Record<string, string> {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}


async function http<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, init);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const msg = data?.error || data?.message || "Request failed";
        throw new Error(msg);
    }
    return data as T;
}

export type LikeUser = {
    id: number;
    name: string;
    created_at: string;
};

export async function likeBroadcast(messageId: number) {
    console.log("oi " + messageId)
    return http<{ success: true; liked: true; likes: number }>(
            `${API_BASE}/broadcast/${messageId}/like`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeaders(),
            },
        }
    );
}

export async function unlikeBroadcast(messageId: number) {
    console.log("oi2")
    return http<{ success: true; liked: false; likes: number }>(
        `${API_BASE}/broadcast/${messageId}/like`,
        {
            method: "DELETE",
            headers: { ...authHeaders() },
        }
    );
}

export async function getMyLikeStatus(messageId: number) {
    return http<{ success: true; liked: boolean; likes: number }>(
        `${API_BASE}/broadcast/${messageId}/likes/me`,
        {
            method: "GET",
            headers: { ...authHeaders() },
        }
    );
}

export async function listLikes(messageId: number, limit = 50, offset = 0) {
    return http<{
        success: true;
        total: number;
        items: LikeUser[];
        limit: number;
        offset: number;
    }>(`${API_BASE}/broadcast/${messageId}/likes?limit=${limit}&offset=${offset}`);
}
