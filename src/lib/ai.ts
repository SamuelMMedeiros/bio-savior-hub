/* eslint-disable @typescript-eslint/no-explicit-any */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateContentWithAI(
  topic: string, 
  difficulty: string, 
  type: 'quiz' | 'article',
  questionCount: number = 5,
  style: string = 'standard', // 'standard', 'battle', 'humor'
  sourceText: string = '' // Texto base opcional (Contexto)
) {
  console.log(`🤖 IA Iniciando... Tópico: ${topic} | Estilo: ${style} | Contexto: ${sourceText ? 'SIM' : 'NÃO'}`);

  if (!apiKey) {
    throw new Error("Chave de API do Gemini não configurada no arquivo .env");
  }

  try {
    // ---------------------------------------------------------
    // 1. DESCOBRIR QUAL MODELO ESTÁ DISPONÍVEL NA CONTA (Auto-Adaptável)
    // ---------------------------------------------------------
    const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!modelsResponse.ok) {
      throw new Error(`Erro ao listar modelos do Google: ${modelsResponse.status}`);
    }

    const modelsData = await modelsResponse.json();
    
    // Procura um modelo que seja da família "gemini" e suporte "generateContent"
    const availableModel = modelsData.models?.find((m: any) => 
      m.name.includes('gemini') && 
      m.supportedGenerationMethods.includes('generateContent')
    );

    if (!availableModel) {
      throw new Error("Nenhum modelo Gemini disponível para sua chave de API.");
    }

    // Remove o prefixo 'models/' para usar na URL de geração
    const modelName = availableModel.name.replace('models/', '');
    console.log(`✅ Modelo selecionado automaticamente: ${modelName}`);

    // ---------------------------------------------------------
    // 2. CONSTRUÇÃO DO PROMPT (Engenharia de Prompt)
    // ---------------------------------------------------------
    
    // Instrução de Contexto (Se houver texto base)
    let contextInstruction = "";
    if (sourceText) {
      contextInstruction = `
        ATENÇÃO: IGNORE seu conhecimento externo geral.
        Crie as perguntas BASEANDO-SE ESTRITAMENTE no seguinte texto fornecido:
        """
        ${sourceText.substring(0, 20000)}
        """
        (Fim do texto base).
      `;
    }

    // Instrução de Estilo
    let styleInstruction = "";
    switch (style) {
      case 'battle':
        styleInstruction = "Estilo 'Batalha de Turmas': Crie perguntas desafiadoras, competitivas e complexas para diferenciar os melhores alunos.";
        break;
      case 'humor':
        styleInstruction = "Estilo Descontraído: Use humor, analogias engraçadas e emojis nos enunciados. Faça o aprendizado ser divertido.";
        break;
      default:
        styleInstruction = "Estilo Acadêmico Padrão: Perguntas claras, diretas e educativas.";
    }

    const promptQuiz = `
      Atue como um professor especialista de Biologia.
      Tarefa: Criar um Quiz sobre "${topic}" com nível de dificuldade "${difficulty}".
      Quantidade: Exatamente ${questionCount} perguntas.
      ${styleInstruction}
      ${contextInstruction}

      REGRAS OBRIGATÓRIAS DE FORMATO:
      1. Retorne APENAS um JSON válido.
      2. NÃO use blocos de código Markdown (sem \`\`\`json).
      3. Siga estritamente esta estrutura:
      {
        "title": "Um título criativo para o módulo",
        "description": "Uma descrição curta e engajadora (máx 20 palavras).",
        "questions": [
          {
            "text": "Enunciado da pergunta",
            "explanation": "Explicação educativa curta de por que a resposta certa é a certa.",
            "options": [
              { "text": "Alternativa errada", "isCorrect": false },
              { "text": "Alternativa CORRETA", "isCorrect": true },
              { "text": "Alternativa errada", "isCorrect": false },
              { "text": "Alternativa errada", "isCorrect": false }
            ]
          }
        ]
      }
    `;

    const finalPrompt = type === 'quiz' ? promptQuiz : `Crie um artigo educativo sobre ${topic}. Retorne apenas JSON.`;

    // ---------------------------------------------------------
    // 3. FAZER A CHAMADA REST PARA A IA
    // ---------------------------------------------------------
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: finalPrompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro detalhado da API Google:", errorData);
      throw new Error(`Erro na geração (${modelName}): ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Extrai o texto da resposta
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("A IA retornou uma resposta vazia.");
    }

    // ---------------------------------------------------------
    // 4. LIMPEZA E PARSE DO JSON
    // ---------------------------------------------------------
    const cleanedText = text
      .replace(/```json/g, '') // Remove inicio de bloco de código
      .replace(/```/g, '')     // Remove fim de bloco de código
      .trim();
    
    return JSON.parse(cleanedText);

  } catch (error: any) {
    console.error("FALHA NA INTEGRAÇÃO COM IA:", error);
    // Repassa o erro para ser exibido no Toast da interface
    throw new Error(error.message || "Falha desconhecida na IA.");
  }
}

export async function generateLessonPlan(topic: string, studentLevel: string = 'Ensino Médio') {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) throw new Error("API Key ausente");

  const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const modelsData = await modelsResponse.json();
  const availableModel = modelsData.models?.find((m: any) => m.name.includes('gemini') && m.supportedGenerationMethods.includes('generateContent'));
  const modelName = availableModel ? availableModel.name.replace('models/', '') : 'gemini-pro';

  // PROMPT PEDAGÓGICO AVANÇADO
  const prompt = `
    Atue como um Coordenador Pedagógico Especialista.
    Tarefa: Criar um Plano de Aula DETALHADO sobre: "${topic}" para alunos de ${studentLevel}.
    
    O resultado deve ser um JSON ESTRITO com esta estrutura exata:
    {
      "topic": "${topic}",
      "duration": "Ex: 50 minutos / 2 aulas",
      "objectives": ["Objetivo 1", "Objetivo 2", "Objetivo 3"],
      "methodology": "Ex: Aula expositiva dialogada com uso de gamificação...",
      "resources": ["Projetor", "Quadro", "Celulares dos alunos"],
      "content_detailed": {
        "introduction": "O que falar nos primeiros 10 min (Gancho inicial)",
        "development": "O conteúdo denso, exemplos práticos e explicações (Aprox. 200 palavras)",
        "conclusion": "Fechamento, revisão e link com a próxima aula"
      },
      "evaluation": "Como avaliar o aluno nesta aula",
      "homework": "Sugestão de atividade de casa ou pesquisa",
      "video_search_term": "Termo para buscar no YouTube",
      "quiz_question": {
          "question": "Uma pergunta de múltipla escolha para verificar aprendizado",
          "options": ["A", "B", "C", "D"],
          "correct_index": 0
      }
    }
    
    IMPORTANTE: Retorne APENAS o JSON. Sem blocos de código markdown. Seja formal e educativo.
  `;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  
  const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleanedText);
}