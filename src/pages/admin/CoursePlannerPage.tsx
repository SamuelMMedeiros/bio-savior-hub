/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, Plus, BrainCircuit, Loader2, Video, 
  ListChecks, FileDown, Eye, X, BookOpen, GraduationCap,
  Trash2, Edit2, RefreshCw, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { generateLessonPlan } from '../../lib/ai';
import { jsPDF } from 'jspdf';

export function CoursePlannerPage() {
  const { user } = useAuth();
  
  // Estados de Dados
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  
  // Estados de UI
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [newPlanTitle, setNewPlanTitle] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewTopic, setViewTopic] = useState<any>(null);

  // --- CARREGAMENTO ---
  useEffect(() => {
    async function fetchClasses() {
      if (!user) return;
      const { data } = await supabase.from('classrooms').select('id, name').eq('teacher_id', user.id);
      if (data && data.length > 0) {
        setClassrooms(data);
        setSelectedClassId(data[0].id);
      }
    }
    fetchClasses();
  }, [user]);

  useEffect(() => { if (selectedClassId) fetchPlans(); }, [selectedClassId]);
  useEffect(() => { if (selectedPlanId) fetchTopics(); else setTopics([]); }, [selectedPlanId]);

  async function fetchPlans() {
    const { data } = await supabase.from('course_plans').select('*').eq('classroom_id', selectedClassId).order('created_at', { ascending: false });
    setPlans(data || []);
    // Se o plano selecionado sumiu (foi deletado), limpa a seleção
    if (selectedPlanId && !data?.find(p => p.id === selectedPlanId)) {
        setSelectedPlanId(null);
    }
    // Seleciona o primeiro se nada estiver selecionado
    if (data && data.length > 0 && !selectedPlanId) setSelectedPlanId(data[0].id);
  }

  async function fetchTopics() {
    const { data } = await supabase.from('plan_topics').select('*').eq('plan_id', selectedPlanId).order('created_at');
    setTopics(data || []);
  }

  // --- AÇÕES DE CRIAÇÃO ---

  const createPlan = async () => {
    if (!newPlanTitle.trim()) return;
    const { error } = await supabase.from('course_plans').insert({ classroom_id: selectedClassId, title: newPlanTitle, start_date: new Date() });
    if (!error) { setNewPlanTitle(''); fetchPlans(); toast.success("Período criado!"); }
  };

  const createTopic = async () => {
    if (!newTopicTitle.trim() || !selectedPlanId) return;
    const { error } = await supabase.from('plan_topics').insert({ plan_id: selectedPlanId, title: newTopicTitle, content_json: null });
    if (!error) { setNewTopicTitle(''); fetchTopics(); }
  };

  // --- AÇÕES DE EXCLUSÃO E EDIÇÃO ---

  const deletePlan = async (e: React.MouseEvent, planId: string) => {
    e.stopPropagation(); // Evita selecionar o plano ao clicar no lixo
    if (!confirm("Tem certeza? Isso apagará TODOS os tópicos deste período.")) return;

    const { error } = await supabase.from('course_plans').delete().eq('id', planId);
    if (error) toast.error("Erro ao excluir.");
    else {
        toast.success("Período excluído.");
        if (selectedPlanId === planId) setSelectedPlanId(null);
        fetchPlans();
    }
  };

  const deleteTopic = async (topicId: string) => {
    if (!confirm("Excluir este tópico?")) return;
    const { error } = await supabase.from('plan_topics').delete().eq('id', topicId);
    if (!error) { toast.success("Tópico removido."); fetchTopics(); }
  };

  const renameTopic = async (topic: any) => {
    const newTitle = prompt("Novo título:", topic.title);
    if (newTitle && newTitle !== topic.title) {
        await supabase.from('plan_topics').update({ title: newTitle }).eq('id', topic.id);
        fetchTopics();
    }
  };

  const clearContent = async (topicId: string) => {
    if (!confirm("Apagar o conteúdo gerado pela IA para refazer?")) return;
    await supabase.from('plan_topics').update({ content_json: null, is_published: false }).eq('id', topicId);
    fetchTopics();
    toast.info("Conteúdo limpo. Pode gerar novamente.");
  };

  // --- IA ---

  const handleGenerateContent = async (topic: any) => {
    setGeneratingId(topic.id);
    try {
        const content = await generateLessonPlan(topic.title);
        const { error } = await supabase.from('plan_topics').update({ content_json: content, is_published: true }).eq('id', topic.id);
        if (error) throw error;
        toast.success("Sucesso! Plano gerado.");
        fetchTopics();
    } catch (error) {
        console.error(error);
        toast.error("Erro na IA.");
    } finally {
        setGeneratingId(null);
    }
  };

  // --- PDF (Mantido igual) ---
  const handleExportPDF = (topic: any) => {
    if (!topic.content_json) return;
    const content = topic.content_json;
    const doc = new jsPDF();
    const margin = 20;
    let y = 20;

    const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        const splitText = doc.splitTextToSize(text || "", 170);
        if (y + (splitText.length * 7) > 280) { doc.addPage(); y = 20; }
        doc.text(splitText, margin, y);
        y += (splitText.length * (fontSize / 2)) + 5;
    };

    addText(`Plano: ${topic.title}`, 18, true);
    addText(`Duração: ${content.duration}`, 12, false);
    y += 5;
    addText("Objetivos:", 14, true);
    content.objectives?.forEach((obj: string) => addText(`• ${obj}`, 11));
    y += 5;
    addText("Conteúdo:", 14, true);
    addText(content.content_detailed?.introduction, 11);
    addText(content.content_detailed?.development, 11);
    addText(content.content_detailed?.conclusion, 11);
    
    doc.save(`Aula_${topic.title}.pdf`);
    toast.success("Download iniciado.");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="text-purple-600"/> Planejador de Curso
          </h1>
          <p className="text-slate-500">Defina o cronograma, gere aulas com IA e exporte em PDF.</p>
        </div>
        
        <div className="w-64">
             <label className="text-xs font-bold text-slate-500 uppercase">Turma Ativa</label>
             <select value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg font-bold text-slate-700">
                {classrooms.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
             </select>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        
        {/* LISTA DE PLANOS (ESQUERDA) */}
        <div className="w-1/4 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col shadow-sm">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><BookOpen size={18}/> Períodos</h3>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 custom-scrollbar">
                {plans.map(plan => (
                    <div key={plan.id} className="relative group">
                        <button 
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={`w-full text-left p-3 pr-8 rounded-xl transition-all border ${
                                selectedPlanId === plan.id 
                                ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold' 
                                : 'bg-white border-slate-100 hover:bg-slate-50'
                            }`}
                        >
                            {plan.title}
                            <div className="text-xs font-normal opacity-70 mt-1">{new Date(plan.created_at).toLocaleDateString()}</div>
                        </button>
                        
                        {/* Botão Excluir Plano */}
                        <button 
                            onClick={(e) => deletePlan(e, plan.id)}
                            className="absolute top-3 right-2 p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                            title="Excluir Período"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-auto pt-4 border-t border-slate-100">
                <input type="text" placeholder="Novo Período (Ex: 2º Bimestre)" value={newPlanTitle} onChange={e => setNewPlanTitle(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm mb-2" />
                <button onClick={createPlan} className="w-full py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-black transition-colors">Criar</button>
            </div>
        </div>

        {/* TÓPICOS (DIREITA) */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm">
            {!selectedPlanId ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                    <AlertCircle size={48} className="mb-4 opacity-20"/>
                    <p>Selecione um período à esquerda para ver as aulas.</p>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        Aulas de {plans.find(p => p.id === selectedPlanId)?.title}
                    </h2>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                        {topics.map((topic, index) => (
                            <div key={topic.id} className="border border-slate-200 rounded-xl p-5 hover:border-purple-200 transition-colors bg-slate-50/50 group">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-slate-200 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">{index + 1}</span>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg text-slate-800">{topic.title}</h3>
                                                <button onClick={() => renameTopic(topic)} className="text-slate-300 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 size={12}/></button>
                                            </div>
                                            
                                            {topic.content_json ? (
                                                <div className="flex gap-2 mt-1">
                                                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">Gerado</span>
                                                </div>
                                            ) : (
                                                <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Pendente</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {topic.content_json ? (
                                            <>
                                                <button onClick={() => { setViewTopic(topic); setIsModalOpen(true); }} className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:text-purple-600 font-bold text-sm flex items-center gap-1" title="Ver Detalhes">
                                                    <Eye size={16} /> Ver
                                                </button>
                                                <button onClick={() => handleExportPDF(topic)} className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:text-red-600 font-bold text-sm flex items-center gap-1" title="Baixar PDF">
                                                    <FileDown size={16} /> PDF
                                                </button>
                                                <button onClick={() => clearContent(topic.id)} className="px-2 py-2 text-slate-400 hover:text-orange-500 rounded-lg" title="Refazer/Limpar Conteúdo">
                                                    <RefreshCw size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleGenerateContent(topic)} disabled={generatingId === topic.id} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-700 shadow-sm transition-all">
                                                {generatingId === topic.id ? <Loader2 className="animate-spin" size={16}/> : <BrainCircuit size={16} />}
                                                Gerar com IA
                                            </button>
                                        )}
                                        
                                        <div className="w-px h-6 bg-slate-200 mx-1"></div>
                                        
                                        <button onClick={() => deleteTopic(topic.id)} className="text-slate-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Excluir Tópico">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="flex gap-2 items-center mt-4 p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                            <Plus className="text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Adicionar novo tópico (Ex: Respiração Celular)" 
                                value={newTopicTitle} 
                                onChange={e => setNewTopicTitle(e.target.value)} 
                                onKeyDown={e => e.key === 'Enter' && createTopic()} 
                                className="flex-1 bg-transparent outline-none font-medium text-slate-700" 
                            />
                            <button onClick={createTopic} className="text-slate-500 hover:text-purple-600 font-bold text-sm">Adicionar</button>
                        </div>
                    </div>
                </>
            )}
        </div>
      </div>

      {/* MODAL DETALHES (SIMPLIFICADO PARA O EXEMPLO, USE O MESMO DE ANTES) */}
      {isModalOpen && viewTopic && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
             <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                    <h2 className="font-bold text-lg">{viewTopic.title}</h2>
                    <button onClick={() => setIsModalOpen(false)}><X className="text-slate-500"/></button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {/* Reutilize a renderização do conteúdo detalhado aqui */}
                    <div className="prose max-w-none">
                        <h3 className="text-purple-700 font-bold">Objetivos</h3>
                        <ul>{viewTopic.content_json?.objectives?.map((o:string, i:number) => <li key={i}>{o}</li>)}</ul>
                        <h3 className="text-slate-700 font-bold mt-4">Conteúdo</h3>
                        <p className="whitespace-pre-line text-slate-600">{viewTopic.content_json?.content_detailed?.development}</p>
                    </div>
                </div>
             </div>
        </div>
      )}
    </div>
  );
}