import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

export const generateContentWithGemini = async (prompt: string) => {
  if (!apiKey) {
    console.error('No se encontró NEXT_PUBLIC_GEMINI_API_KEY');
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error al generar contenido con Gemini:', error);
    return null;
  }
};
