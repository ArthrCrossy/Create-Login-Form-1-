export type SendSupportMessagePayload = {
    title: string;
    body: string;
    receiverAdminId?: number | null | string;
};

export type SendSupportMessageResponse = any;

function getAuthToken(): string | null {
    return localStorage.getItem("token");
}

export async function sendSupportMessage(
    payload: SendSupportMessagePayload
): Promise<SendSupportMessageResponse> {

    console.log("oi, tô no front")

    const token = getAuthToken();

    if (!token) {
        throw new Error("Não autenticado: token não encontrado no localStorage.");
    }

    console.log(payload.title)
    console.log(payload.body)
    console.log(token)

    const res = await fetch("http://localhost:3000/api/support/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: payload.title,
            body: payload.body,
            receiverAdminId: payload.receiverAdminId ?? null,
            user: localStorage.getItem("role")
        }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const msg =
            data?.error ||
            data?.message ||
            `Erro ao enviar mensagem (HTTP ${res.status})`;
        throw new Error(msg);
    }

    return data;
}
