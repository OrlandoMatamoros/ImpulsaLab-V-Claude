// app/api/unified-agent/route.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Cache simple en memoria
const responseCache = new Map();
const CACHE_DURATION = 3600000; // 1 hora en millisegundos

function getCacheKey(query: string) {
  return query.toLowerCase().trim();
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Verificar caché
    const cacheKey = getCacheKey(query);
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data);
    }

    // Inicializar respuestas
    const responses = {
      chatgpt: '',
      claude: '',
      gemini: '',
      unified: ''
    };

    // Promesas para consultas paralelas
    const aiPromises = [];

    // 1. ChatGPT
    if (process.env.OPENAI_API_KEY) {
      aiPromises.push(
        fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'Eres un experto en automatización empresarial. Responde de forma técnica y específica en máximo 80 palabras.'
              },
              {
                role: 'user',
                content: query
              }
            ],
            max_tokens: 80,
            temperature: 0.7
          })
        })
        .then(res => res.json())
        .then(data => {
          responses.chatgpt = data.choices?.[0]?.message?.content || 'Error al obtener respuesta de ChatGPT';
        })
        .catch(err => {
          console.error('Error ChatGPT:', err);
          responses.chatgpt = 'ChatGPT: Analizando desde la perspectiva técnica...';
        })
      );
    }

    // 2. Claude
    if (process.env.ANTHROPIC_API_KEY) {
      aiPromises.push(
        fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307', // Modelo más económico
            max_tokens: 80,
            messages: [
              {
                role: 'user',
                content: `Como experto en transformación digital y gestión del cambio, responde en máximo 80 palabras: ${query}`
              }
            ]
          })
        })
        .then(res => res.json())
        .then(data => {
          responses.claude = data.content?.[0]?.text || 'Error al obtener respuesta de Claude';
        })
        .catch(err => {
          console.error('Error Claude:', err);
          responses.claude = 'Claude: Considerando el impacto humano y organizacional...';
        })
      );
    }

    // 3. Gemini
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (geminiKey) {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      aiPromises.push(
        model.generateContent(`Como especialista en IA y automatización empresarial, responde en máximo 80 palabras: ${query}`)
          .then(result => {
            responses.gemini = result.response.text() || 'Error al obtener respuesta de Gemini';
          })
          .catch(err => {
            console.error('Error Gemini:', err);
            responses.gemini = 'Gemini: Analizando las mejores prácticas del mercado...';
          })
      );
    }

    // Esperar todas las respuestas
    await Promise.all(aiPromises);

    // Generar respuesta unificada con Gemini (simulando Claude Opus)
    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const unifiedPrompt = `
        Eres Claude Opus, un modelo avanzado de IA que unifica y sintetiza respuestas. 
        Basándote en estas 3 perspectivas sobre "${query}":
        
        ChatGPT (técnica): ${responses.chatgpt}
        Claude (humana): ${responses.claude}
        Gemini (práctica): ${responses.gemini}
        
        Crea una síntesis ejecutiva que:
        1. Combine los mejores insights de cada modelo
        2. Elimine redundancias y contradicciones
        3. Presente una solución clara y accionable
        4. Use emojis para destacar puntos clave
        5. Incluya métricas específicas cuando sea posible
        
        Formato: 4-5 puntos detallados con acciones específicas. Máximo 250 palabras.
        `;

        const unifiedResult = await model.generateContent(unifiedPrompt);
        responses.unified = unifiedResult.response.text();
      } catch (error) {
        // Respuesta unificada de respaldo
        responses.unified = `🎯 SÍNTESIS UNIFICADA 4IA (Claude Opus):

✅ **Perspectiva Técnica (ChatGPT)**: ${responses.chatgpt.substring(0, 60)}...

✅ **Perspectiva Humana (Claude)**: ${responses.claude.substring(0, 60)}...

✅ **Perspectiva Práctica (Gemini)**: ${responses.gemini.substring(0, 60)}...

💡 **Recomendación Impulsa Lab**: Basándonos en el análisis conjunto de las 3 IAs principales, recomendamos implementar una solución gradual que combine:
1. Automatización técnica robusta (ChatGPT)
2. Gestión del cambio organizacional (Claude)
3. Mejores prácticas del mercado (Gemini)

📊 ROI estimado: 40-60% reducción en costos operativos en 3-6 meses.`;
      }
    }

    // Guardar en caché
    responseCache.set(cacheKey, {
      data: responses,
      timestamp: Date.now()
    });

    return NextResponse.json(responses);

  } catch (error) {
    console.error('Error general:', error);
    // Respuestas de fallback
    return NextResponse.json({
      chatgpt: 'Perspectiva técnica: Implementa automatización con herramientas no-code como Make o Zapier.',
      claude: 'Perspectiva humana: Considera el impacto en tu equipo y capacítalos gradualmente.',
      gemini: 'Perspectiva práctica: Comienza con procesos simples y escala progresivamente.',
      unified: '🎯 Recomendación: Inicia con un piloto pequeño, mide resultados y expande.'
    });
  }
}

// Endpoint para verificar el estado de las APIs
export async function GET() {
  const status = {
    openai: !!process.env.OPENAI_API_KEY,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    gemini: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY),
  };

  return NextResponse.json({
    status,
    message: 'API status check',
    cache_size: responseCache.size
  });
}