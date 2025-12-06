import { GoogleGenAI, Type } from "@google/genai";
import { ToolRecommendation } from "../types";

// En Vite, process.env.API_KEY se reemplaza estáticamente durante el build.
const apiKey = process.env.API_KEY;

// Inicializamos el cliente solo si existe la key
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getToolRecommendations = async (projectDescription: string): Promise<ToolRecommendation[]> => {
  if (!ai || !apiKey) {
    console.warn("API Key not found or configured correctly.");
    return [
      { toolName: "Demo Hammer Drill", reason: "API Key missing (Check Config)", estimatedDailyRate: "$50" },
      { toolName: "Demo Concrete Saw", reason: "API Key missing", estimatedDailyRate: "$120" },
      { toolName: "Demo Excavator", reason: "API Key missing", estimatedDailyRate: "$450" }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User project: ${projectDescription}. Recommend 3-4 specific construction tools or heavy machinery needed for this project. Keep it concise.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              toolName: { type: Type.STRING },
              reason: { type: Type.STRING },
              estimatedDailyRate: { type: Type.STRING, description: "Estimated daily rental rate in USD (e.g. $45/day)" }
            },
            required: ["toolName", "reason", "estimatedDailyRate"]
          }
        },
        systemInstruction: "You are an expert construction equipment consultant. Analyze the user's project and recommend the best professional tools or machinery to rent.",
      }
    });

    // Con responseSchema, el texto devuelto es JSON válido garantizado.
    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as ToolRecommendation[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Retornar lista vacía en error para no romper la UI
    return [];
  }
};