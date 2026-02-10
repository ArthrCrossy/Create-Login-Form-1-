import {NutritionFormData} from "../components/NutritionForm";

const API = "http://localhost:3000";

function buildAuthHeaders(): Headers {
    const headers = new Headers();
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
}

export async function sendNutritionAssessment(data: NutritionFormData) {
    const headers = buildAuthHeaders();
    headers.set("Content-Type", "application/json");

    const res = await fetch(`${API}/api/assessment`, {
        method: "POST",
        headers, // ✅ Headers é HeadersInit
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Falha ao enviar avaliação");
    }

    return res.json() as Promise<{ success: true; id: number }>;
}

export async function uploadAssessmentPdf(file: File) {
    const form = new FormData();
    form.append("file", file);

    const headers = buildAuthHeaders(); // ✅ sem Content-Type aqui

    const res = await fetch(`${API}/api/assessment/pdf`, {
        method: "POST",
        headers,
        body: form,
    });

    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Falha ao enviar PDF");
    }

    return res.json() as Promise<{ success: true; url: string; filename: string }>;
}
