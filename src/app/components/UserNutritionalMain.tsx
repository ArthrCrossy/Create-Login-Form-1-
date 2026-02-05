import { useState } from "react";
import { NutritionForm } from "../components/NutritionForm";
import { FormResults } from "../components/FormResults";

export default function userNutritionalMain() {
    const [formData, setFormData] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl mb-2">Avaliação Nutricional</h1>
                    <p className="text-gray-600">
                        Preencha os dados abaixo para o nutricionista elaborar seu plano alimentar e de treino personalizado
                    </p>
                </div>
                {!formData ? (
                    <NutritionForm onSubmit={setFormData} />
                ) : (
                    <FormResults data={formData} onReset={() => setFormData(null)} />
                )}
            </div>
        </div>
    );
}