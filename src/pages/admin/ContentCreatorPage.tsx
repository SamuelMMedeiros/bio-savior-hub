/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Save, CheckCircle2, Loader2, Trash2, 
  FileUp, Link as LinkIcon, Settings2, 
  Clock, Calendar, Users, Swords, ToggleLeft, ToggleRight,
  Plus, Minus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { generateContentWithAI } from '../../lib/ai';

// Tipos de Modo de Criação
type CreationMode = 'ai-topic' | 'ai-text' | 'manual-upload';

export function ContentCreatorPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- ESTADOS DO FORMULÁRIO ---
  
  // Modos
  const [mode, setMode] = useState<CreationMode>('ai-topic');

  // Inputs de Conteúdo
  const [topic, setTopic] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  
  // Configurações do Jogo
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [gameStyle, setGameStyle] = useState('standard');
  
  // Timer e Prazos
  const [hasTimer, setHasTimer] = useState(true);
  const [timeLimit, setTimeLimit] = useState(30); 
  const [deadline, setDeadline] = useState(''); 

  // Atribuição (Turmas e Batalha)
  const [myClassrooms, setMyClassrooms] = useState<any[]>([]);
  const [selectedClassroomId, setSelectedClassroomId] = useState<string>('');
  const [isBattle, setIsBattle] = useState(false);

  // Estados de Processamento
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  // --- EFEITOS ---

  // Carregar turmas do professor ao abrir a página
  useEffect(() => {
    async function fetchClasses() {
      if (!user) return;
      const { data } = await supabase
        .from('classrooms')
        .select('id, name')
        .eq('teacher_id', user.id);
        
      if (data) setMyClassrooms(data);
    }
    fetchClasses();
  }, [user]);

  // --- HANDLERS (AÇÕES) ---

  // Importar arquivo de texto (.txt) do computador
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setSourceText(event.target?.result as string);
      toast.success("Texto importado com sucesso!");
    };
    reader.readAsText(file);
  };

  // Gerar Conteúdo com a IA
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const currentTopic = mode === 'ai-text' ? 'Conteúdo do Texto Base' : topic;
      const textContext = mode === 'ai-text' ? sourceText : '';

      // Chama a IA (src/lib/ai.ts)
      const result = await generateContentWithAI(
        currentTopic, 
        difficulty, 
        'quiz', 
        questionCount, 
        gameStyle, 
        textContext
      );
      
      setGeneratedContent(result);
      toast.success("Conteúdo gerado! Confira o resultado.");
    } catch (error: any) {
      toast.error(`Erro na IA: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Salvar no Banco de Dados
  const handleSave = async () => {
    if (!user) return;
    
    // 1. VALIDAÇÃO DE INPUTS
    if (mode === 'manual-upload' && (!topic || !resourceUrl)) {
        return toast.error("Preencha o título e o link para o material manual.");
    }

    // 2. VALIDAÇÃO CRÍTICA DE BATALHA
    // Não permite criar batalha sem selecionar turma, pois quebraria o redirecionamento
    if (isBattle && !selectedClassroomId) {
        toast.error("⚠️ Atenção: Para criar uma Batalha, você DEVE selecionar uma Turma na lista abaixo!", {
            duration: 5000,
            style: { border: '2px solid red', fontWeight: 'bold' }
        });
        // Rola a tela para baixo para o usuário ver o erro (opcional, mas útil)
        const selectElement = document.getElementById('classroom-select');
        selectElement?.scrollIntoView({ behavior: 'smooth' });
        selectElement?.focus();
        return;
    }
    
    // Mock para modo manual (cria estrutura vazia se não tiver IA)
    if (mode === 'manual-upload' && !generatedContent) {
        setGeneratedContent({ title: topic, description: "Material de apoio.", questions: [] });
    } else if (!generatedContent) {
        return;
    }

    setIsSaving(true);

    try {
      // 3. CRIAR O MÓDULO (PAI)
      const { data: moduleData, error: moduleError } = await supabase
        .from('game_modules')
        .insert({
          title: generatedContent?.title || topic,
          description: generatedContent?.description || 'Material de estudo.',
          category: 'Biologia',
          author_id: user.id,
          institution_id: user.user_metadata?.institution_id, 
          is_global: user.user_metadata?.role === 'admin', // Admin cria global
          is_active: true,
          resource_url: resourceUrl || null,
          resource_type: resourceUrl ? 'link' : null
        })
        .select()
        .single();

      if (moduleError) throw moduleError;

      // 4. CRIAR AS QUESTÕES E RESPOSTAS (FILHOS)
      if (generatedContent?.questions?.length > 0) {
        const finalTime = hasTimer ? timeLimit : 0; // 0 significa 'sem limite' no banco

        for (const q of generatedContent.questions) {
            // Cria Pergunta
            const { data: qData, error: qError } = await supabase
            .from('game_questions')
            .insert({
                module_id: moduleData.id,
                text: q.text,
                explanation: q.explanation,
                difficulty: difficulty,
                time_limit: finalTime 
            })
            .select().single();

            if (qError) throw qError;

            // Cria Respostas
            const answersToInsert = q.options.map((opt: any) => ({
                question_id: qData.id,
                text: opt.text,
                is_correct: opt.isCorrect
            }));

            const { error: aError } = await supabase.from('game_answers').insert(answersToInsert);
            if (aError) throw aError;
        }
      }

      // 5. CRIAR ATRIBUIÇÃO (ASSIGNMENT) E GERENCIAR FLUXO
      if (selectedClassroomId) {
        console.log(`Criando assignment para Turma ${selectedClassroomId}`);
        
        const { data: assignData, error: assignError } = await supabase
            .from('assignments')
            .insert({
                module_id: moduleData.id,
                classroom_id: selectedClassroomId,
                is_battle: isBattle,
                status: 'open',
                expires_at: deadline || null
            })
            .select()
            .single();
        
        if (assignError) throw assignError;
        
        toast.success(isBattle ? "Guerra declarada! Configurando times..." : "Atividade enviada para a turma!");

        // --- REDIRECIONAMENTO DE BATALHA ---
        if (isBattle && assignData) {
            // Vai direto para o Gerenciador de Times
            navigate(`/admin/batalha/gerenciar/${assignData.id}`);
            return; // Encerra aqui para não executar o navigate padrão abaixo
        }
      } else {
        toast.success("Salvo no banco de questões!");
      }

      // Redirecionamento Padrão (Se não for batalha)
      navigate('/admin/turmas');

    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      toast.error(`Erro: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col bg-slate-50">
      
      {/* HEADER FIXO */}
      <div className="px-8 py-6 bg-white border-b border-slate-200 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="text-purple-600" /> Estúdio de Criação
        </h1>
        <p className="text-slate-500 text-sm">Gere atividades com IA, defina prazos e crie batalhas épicas.</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* ESQUERDA: CONTROLES E FORMULÁRIO (Scrollável) */}
        <div className="w-1/3 min-w-[380px] bg-white border-r border-slate-200 overflow-y-auto p-6 custom-scrollbar">
          
          {/* ABAS DE SELEÇÃO DE MODO */}
          <div className="flex bg-slate-100 p-1 rounded-lg mb-6 shadow-inner">
            <button onClick={() => setMode('ai-topic')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${mode === 'ai-topic' ? 'bg-white shadow text-purple-700' : 'text-slate-500 hover:text-slate-700'}`}>IA (Tópico)</button>
            <button onClick={() => setMode('ai-text')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${mode === 'ai-text' ? 'bg-white shadow text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}>IA (Texto)</button>
            <button onClick={() => setMode('manual-upload')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${mode === 'manual-upload' ? 'bg-white shadow text-green-700' : 'text-slate-500 hover:text-slate-700'}`}>Manual</button>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            
            {/* INPUTS ESPECÍFICOS DE CADA MODO */}
            {mode === 'ai-topic' && (
              <div className="animate-in fade-in">
                <label className="block text-sm font-bold text-slate-700 mb-2">Tema da Atividade</label>
                <input type="text" required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Ex: Ecologia, Citologia..." className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
            )}

            {mode === 'ai-text' && (
              <div className="animate-in fade-in">
                 <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-slate-700">Texto Base</label>
                    <label className="cursor-pointer text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 flex items-center gap-1 transition-colors">
                        <FileUp size={14} /> Importar .txt <input type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
                    </label>
                </div>
                <textarea required rows={5} value={sourceText} onChange={(e) => setSourceText(e.target.value)} placeholder="Cole o texto aqui..." className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono" />
              </div>
            )}

            {mode === 'manual-upload' && (
              <div className="animate-in fade-in space-y-4">
                 <div><label className="block text-sm font-bold text-slate-700 mb-2">Título do Material</label><input type="text" required value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl" /></div>
                 <div><label className="block text-sm font-bold text-slate-700 mb-2">Link (PDF/Drive)</label><div className="flex items-center gap-2 border border-slate-300 rounded-xl px-3 bg-slate-50"><LinkIcon size={18} className="text-slate-400" /><input type="url" required value={resourceUrl} onChange={(e) => setResourceUrl(e.target.value)} className="w-full py-3 bg-transparent outline-none text-sm" /></div></div>
              </div>
            )}

            {/* CONFIGURAÇÕES DO JOGO (Apenas para modos IA) */}
            {mode !== 'manual-upload' && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                    
                    {/* Dificuldade e Quantidade */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Dificuldade</label>
                            <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer">
                                <option value="easy">Fácil</option>
                                <option value="medium">Médio</option>
                                <option value="hard">Difícil</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Questões</label>
                            <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                                <button type="button" onClick={() => setQuestionCount(Math.max(1, questionCount - 1))} className="px-3 py-2 hover:bg-slate-100 text-slate-600 transition-colors"><Minus size={14}/></button>
                                <input type="number" value={questionCount} readOnly className="w-full text-center py-2 text-sm font-bold outline-none" />
                                <button type="button" onClick={() => setQuestionCount(Math.min(10, questionCount + 1))} className="px-3 py-2 hover:bg-slate-100 text-slate-600 transition-colors"><Plus size={14}/></button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Timer Switch e Opções */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 transition-all">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Clock size={16} className="text-purple-600"/> Tempo por Pergunta
                            </span>
                            <button 
                                type="button" 
                                onClick={() => setHasTimer(!hasTimer)}
                                className={`text-2xl transition-colors ${hasTimer ? 'text-green-500' : 'text-slate-300'}`}
                            >
                                {hasTimer ? <ToggleRight /> : <ToggleLeft />}
                            </button>
                        </div>
                        
                        {hasTimer ? (
                            <div className="grid grid-cols-4 gap-2 animate-in slide-in-from-top-1">
                                {[15, 30, 60, 90].map(t => (
                                    <button 
                                        key={t} 
                                        type="button" 
                                        onClick={() => setTimeLimit(t)}
                                        className={`py-1 rounded text-xs font-bold border transition-all
                                            ${timeLimit === t ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'}`}
                                    >
                                        {t}s
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-400 text-center py-1 bg-white rounded border border-dashed border-slate-200">
                                Sem limite de tempo (Modo Estudo)
                            </p>
                        )}
                    </div>

                    {/* Estilo do Jogo */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estilo do Quiz</label>
                        <select value={gameStyle} onChange={e => setGameStyle(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer">
                            <option value="standard">Padrão</option>
                            <option value="battle">Batalha (Competitivo)</option>
                            <option value="humor">Divertido (Humor)</option>
                        </select>
                    </div>
                </div>
            )}

            {/* ÁREA DE ATRIBUIÇÃO E SALVAMENTO */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
                
                {/* Select de Turma (Só aparece se o professor tiver turmas) */}
                {myClassrooms.length > 0 && (
                    <div className={`p-4 rounded-xl border transition-all ${selectedClassroomId ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                            <Users size={12} /> Atribuir para Turma
                        </label>
                        <select 
                            id="classroom-select"
                            value={selectedClassroomId} 
                            onChange={e => setSelectedClassroomId(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer bg-white"
                        >
                            <option value="">-- Apenas Salvar (Sem atribuir) --</option>
                            {myClassrooms.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        
                        {/* Opções extras só aparecem se uma turma for selecionada */}
                        {selectedClassroomId && (
                            <div className="space-y-3 animate-in slide-in-from-top-2">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                                        <Calendar size={12} /> Data de Entrega (Opcional)
                                    </label>
                                    <input 
                                        type="datetime-local" 
                                        value={deadline}
                                        onChange={e => setDeadline(e.target.value)}
                                        className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white"
                                    />
                                </div>

                                <label className={`flex items-center gap-3 text-sm p-3 rounded-lg border cursor-pointer transition-colors ${isBattle ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={isBattle} 
                                        onChange={e => setIsBattle(e.target.checked)} 
                                        className="rounded text-red-600 focus:ring-red-500 w-4 h-4" 
                                    />
                                    <div>
                                        <span className={`block font-bold flex items-center gap-1 ${isBattle ? 'text-red-700' : 'text-slate-700'}`}>
                                            <Swords size={16} /> Modo Batalha
                                        </span>
                                        <span className="text-xs text-slate-500">Divide a turma em times e cria ranking ao vivo.</span>
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>
                )}

                {/* BOTÃO DE AÇÃO PRINCIPAL */}
                {mode === 'manual-upload' ? (
                     <button type="button" onClick={handleSave} disabled={isSaving} className="w-full py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 flex justify-center items-center gap-2 transition-transform active:scale-95">
                        {isSaving ? <Loader2 className="animate-spin" /> : <FileUp size={20} />} Publicar Material
                     </button>
                ) : (
                    <button type="submit" disabled={isGenerating || (mode === 'ai-topic' && !topic)} className={`w-full py-3 text-white font-bold rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 ${mode === 'ai-text' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} disabled:opacity-70 disabled:cursor-not-allowed active:scale-95`}>
                        {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />} {isGenerating ? 'Criando...' : 'Gerar e Salvar'}
                    </button>
                )}
            </div>

          </form>
        </div>

        {/* DIREITA: PREVIEW E RESULTADO */}
        <div className="flex-1 bg-slate-50 p-8 overflow-y-auto hidden md:block">
          
          {/* ESTADO VAZIO */}
          {!generatedContent && !isGenerating && mode !== 'manual-upload' && (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 bg-slate-50/50">
              <Settings2 size={48} className="mb-4 text-slate-300" />
              <p>Configure a atividade e atribua à turma.</p>
            </div>
          )}

          {/* ESTADO CARREGANDO */}
          {isGenerating && (
             <div className="h-full flex flex-col items-center justify-center">
                 <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-slate-600 font-medium animate-pulse">Criando desafio personalizado...</p>
             </div>
          )}

          {/* ESTADO RESULTADO (Preview) */}
          {generatedContent && !isGenerating && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto pb-10">
                 <div className="flex justify-between items-center mb-6">
                     <h2 className="text-2xl font-bold text-slate-800">Resultado</h2>
                     <div className="flex gap-2">
                        <button onClick={() => setGeneratedContent(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-200 rounded-lg font-bold flex items-center gap-2">
                            <Trash2 size={18}/> Descartar
                        </button>
                        <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center gap-2 shadow-md">
                            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Confirmar
                        </button>
                     </div>
                 </div>

                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
                    <div className="border-b border-slate-100 pb-6 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 mb-2">{generatedContent.title}</h1>
                            <p className="text-slate-500">{generatedContent.description}</p>
                        </div>
                        {hasTimer && (
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-purple-600">{timeLimit}s</span>
                                <span className="text-xs text-slate-400 uppercase font-bold">Tempo Limite</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        {generatedContent.questions?.map((q: any, i: number) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <div className="flex gap-4 mb-4">
                                    <span className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                                    <p className="font-bold text-slate-800 text-lg">{q.text}</p>
                                </div>
                                <div className="pl-12 space-y-2">
                                    {q.options.map((opt: any, idx: number) => (
                                        <div key={idx} className={`p-3 rounded border text-sm flex gap-2 ${opt.isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-white'}`}>
                                            {opt.isCorrect ? <CheckCircle2 size={16}/> : <div className="w-4 h-4 border rounded-full"/>}{opt.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
             </motion.div>
          )}

           {/* ESTADO MANUAL UPLOAD (Preview Simples) */}
           {mode === 'manual-upload' && !generatedContent && (
             <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-green-200 bg-green-50/30 rounded-2xl text-green-700">
                 <FileUp size={48} className="mb-4" />
                 <p className="font-bold">Modo de Upload Manual</p>
                 <p className="text-sm opacity-80">Preencha os dados à esquerda para criar um link.</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}