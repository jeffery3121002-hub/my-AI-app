
import { GoogleGenAI, Type } from "@google/genai";
import { PlantInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function identifyPlant(base64Image: string): Promise<PlantInfo> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        {
          text: "Identify this plant and return information in Traditional Chinese (Taiwan). Be creative and fun with the trivia.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          scientificName: { type: Type.STRING },
          description: { type: Type.STRING },
          trivia: { type: Type.STRING },
          difficulty: { type: Type.INTEGER, description: "1-3 stars rating" },
          tags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          careGuide: {
            type: Type.OBJECT,
            properties: {
              light: { type: Type.STRING },
              water: { type: Type.STRING },
              temperature: { type: Type.STRING },
            },
            required: ["light", "water", "temperature"]
          }
        },
        required: ["name", "scientificName", "description", "trivia", "careGuide", "difficulty", "tags"],
      },
    },
  });

  if (!response.text) {
    throw new Error("Failed to get response from Gemini");
  }

  return JSON.parse(response.text.trim()) as PlantInfo;
}
