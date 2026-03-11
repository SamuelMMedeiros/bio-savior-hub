/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, PlayCircle, School, Swords, Calendar, Loader2, CheckCircle2, Filter, Zap 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

// --- TIPOS ---

interface Profile {
  full_name: string;
  level: number;
  xp: number;
  coins: number;
  // Itens da Loja
  equipped_avatar?: string;
  equipped_border?: string;
  equipped_title?: string;
}

interface Classroom {
  id: string;
  name: string;
}

interface Assignment {
  id: string;
  status: string;
  is_battle: boolean;
  expires_at: string | null;
  module: {
    id: string;
    title: string;
    description: string;
    category: string;
  };
  classroom: {
    id: string;
    name: string;
  };
}

interface GlobalModule {
  id: string;
  title: string;
  category: string;
  description: string;
}

// --- COMPONENTE ---

export function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Estados de Dados
  const [profile, setProfile] = useState<Profile | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [globalModules, setGlobalModules] = useState<GlobalModule[]>([]);
  const [myClassrooms, setMyClassrooms] = useState<Classroom[]>([]); 
  
  // Estados de UI
  const [selectedClassFilter, setSelectedClassFilter] = useState<string | null>(null); // ID da turma selecionada
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  // Carregar Dados Iniciais
  useEffect(() => {
    fetchData();
  }, [user]);

  async function fetchData() {
    if (!user) return;
    try {
      // 1. Perfil Completo (Incluindo itens equipados)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) setProfile(profileData);

      // 2. Buscar Turmas onde o aluno está matriculado
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('classroom:classrooms(id, name)');
      
      // Formata lista de turmas
      const classes = enrollments?.map((e: any) => ({
        id: e.classroom.id,
        name: e.classroom.name
      })) || [];
      
      setMyClassrooms(classes);
      const classIds = classes.map(c => c.id);

      // 3. Buscar Missões (Assignments) dessas turmas
      if (classIds.length > 0) {
        const { data: assignData } = await supabase
          .from('assignments')
          .select(`
            id, status, is_battle, expires_at,
            module:game_modules(id, title, description, category),
            classroom:classrooms(id, name)
          `)
          .in('classroom_id', classIds)
          .eq('status', 'open')
          .order('created_at', { ascending: false });

        // Remove duplicatas eventuais (segurança contra joins complexos)
        const uniqueAssignments = Array.from(new Map((assignData || []).map(item => [item.id, item])).values());
        setAssignments(uniqueAssignments as any);
      } else {
        setAssignments([]);
      }

      // 4. Buscar Módulos Globais (Treino Livre)
      const { data: modulesData } = await supabase
        .from('game_modules')
        .select('*')
        .eq('is_active', true)
        .eq('is_global', true)
        .order('created_at', { ascending: false });

      if (modulesData) setGlobalModules(modulesData);

    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  // Ação: Entrar na Turma
  async function handleJoinClass(e: React.FormEvent) {
    e.preventDefault();
    if (!joinCode) return;
    setIsJoining(true);

    try {
      const { data, error } = await supabase.rpc('join_class_by_code', {
        class_code: joinCode.trim().toUpperCase()
      });

      if (error) throw error;

      if (data.success) {
        toast.success(data.message);
        setShowJoinModal(false);
        setJoinCode('');
        fetchData(); // Recarrega tudo para mostrar novas tarefas
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Erro ao tentar entrar na turma.");
    } finally {
      setIsJoining(false);
    }
  }

  // Ação: Jogar (Redireciona corretamente para Batalha ou Normal)
  const handlePlay = (moduleId: string, assignmentId?: string) => {
      let url = `/app/jogar/${moduleId}`;
      // Se tiver assignmentId, passa na URL para o BioQuiz ativar o modo Batalha/Timer
      if (assignmentId) {
          url += `?assignmentId=${assignmentId}`;
      }
      navigate(url);
  };

  // Lógica de Filtro
  const filteredAssignments = selectedClassFilter 
    ? assignments.filter(a => a.classroom.id === selectedClassFilter)
    : assignments;

  // Variáveis de Exibição
  const firstName = profile?.full_name?.split(' ')[0] || 'Explorador';
  const currentLevel = profile?.level || 1;
  const currentXp = profile?.xp || 0;
  const nextLevelXp = currentLevel * 1000;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* HEADER PRINCIPAL */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Base de Operações
          </h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
             Bem-vindo de volta, <span className="font-bold text-purple-700">{firstName}</span>!
          </p>
        </div>
        <button 
          onClick={() => setShowJoinModal(true)}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-transform active:scale-95"
        >
          <School size={20} /> Entrar em Turma
        </button>
      </div>

      {/* BARRA DE XP */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase">
           <span className="flex items-center gap-1"><Zap size={14} className="text-yellow-500 fill-yellow-500"/> Progresso do Nível {currentLevel}</span>
           <span>{currentXp} / {nextLevelXp} XP</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((currentXp / nextLevelXp) * 100, 100)}%` }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLUNA ESQUERDA (MISSÕES) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SEÇÃO 1: MISSÕES DA ESCOLA */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Swords className="text-red-500" /> Missões Prioritárias
                    {filteredAssignments.length > 0 && <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">{filteredAssignments.length}</span>}
                </h2>
                
                {/* FILTROS DE TURMA (CHIPS) */}
                {myClassrooms.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
                        <button 
                            onClick={() => setSelectedClassFilter(null)}
                            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                                selectedClassFilter === null 
                                ? 'bg-slate-800 text-white border-slate-800' 
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                            }`}
                        >
                            Todas
                        </button>
                        {myClassrooms.map(classroom => (
                            <button 
                                key={classroom.id}
                                onClick={() => setSelectedClassFilter(classroom.id)}
                                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                                    selectedClassFilter === classroom.id 
                                    ? 'bg-purple-600 text-white border-purple-600' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                                }`}
                            >
                                {classroom.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* LISTA DE TAREFAS */}
            {assignments.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center">
                 {myClassrooms.length === 0 ? (
                    // Caso 1: Aluno novo, sem turmas
                    <>
                        <School className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-2 font-medium">Você ainda não está em nenhuma turma.</p>
                        <button onClick={() => setShowJoinModal(true)} className="text-purple-600 font-bold text-sm hover:underline">
                            Digitar código da turma
                        </button>
                    </>
                 ) : (
                    // Caso 2: Tem turmas, mas sem tarefas
                    <>
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">Tudo limpo! Sem missões pendentes.</p>
                    </>
                 )}
              </div>
            ) : filteredAssignments.length === 0 ? (
                 // Caso 3: Filtrou uma turma vazia
                 <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center">
                    <Filter className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhuma missão para esta turma específica.</p>
                    <button onClick={() => setSelectedClassFilter(null)} className="text-blue-600 font-bold text-sm mt-2 hover:underline">Ver todas</button>
                 </div>
            ) : (
              <div className="space-y-4">
                {filteredAssignments.map((assign) => (
                  <motion.div 
                    key={assign.id}
                    whileHover={{ scale: 1.01 }}
                    className={`relative overflow-hidden p-6 rounded-2xl border-2 shadow-sm transition-all flex flex-col sm:flex-row gap-6 items-center
                      ${assign.is_battle ? 'border-red-100 bg-red-50/30' : 'border-purple-100 bg-purple-50/30'}`}
                  >
                    {assign.is_battle && (
                       <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase shadow-sm animate-pulse">
                          Batalha Ao Vivo
                       </div>
                    )}
                    
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-lg
                      ${assign.is_battle ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-gradient-to-br from-purple-600 to-indigo-600'}`}>
                      {assign.is_battle ? <Swords size={24} /> : <School size={24} />}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                       <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                            <span className="text-[10px] font-black bg-white/50 px-2 py-0.5 rounded text-gray-600 uppercase border border-gray-200">
                                {assign.classroom.name}
                            </span>
                       </div>
                       <h3 className="text-lg font-bold text-gray-900 leading-tight">{assign.module.title}</h3>
                       <p className="text-sm text-gray-600 line-clamp-1">{assign.module.description}</p>
                       
                       {assign.expires_at && (
                         <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-orange-700 bg-orange-100/80 px-2 py-1 rounded">
                            <Calendar size={12} /> Entrega: {new Date(assign.expires_at).toLocaleDateString()} {new Date(assign.expires_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                         </div>
                       )}
                    </div>

                    <button 
                      onClick={() => handlePlay(assign.module.id, assign.id)}
                      className={`px-6 py-3 rounded-xl font-bold text-white shadow-md transition-transform active:scale-95 whitespace-nowrap flex items-center gap-2 w-full sm:w-auto justify-center
                        ${assign.is_battle ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                      {assign.is_battle ? <><Swords size={18}/> Batalhar</> : <><PlayCircle size={18}/> Iniciar</>}
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* SEÇÃO 2: TREINO LIVRE (Globais) */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Trophy className="text-blue-500" /> Treino Livre
            </h2>
            
            {loading ? (
               <div className="flex justify-center py-8"><Loader2 className="animate-spin text-purple-600"/></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {globalModules.map((module) => (
                    <div key={module.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all group">
                       <div className="flex justify-between items-start mb-3">
                          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase">{module.category}</span>
                          <PlayCircle className="text-gray-300 group-hover:text-purple-600 transition-colors" size={24} />
                       </div>
                       <h3 className="font-bold text-gray-900 mb-1">{module.title}</h3>
                       <p className="text-xs text-gray-500 line-clamp-2 mb-4">{module.description}</p>
                       <button 
                         onClick={() => handlePlay(module.id)}
                         className="w-full py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-purple-700 transition-colors"
                       >
                         Praticar
                       </button>
                    </div>
                 ))}
                 {globalModules.length === 0 && <p className="text-gray-400 text-sm col-span-2 text-center py-4">Nenhum módulo de treino disponível.</p>}
              </div>
            )}
          </section>

        </div>

        {/* --- COLUNA DIREITA (STATUS E RANKING) --- */}
        <div className="space-y-6">
           
           {/* CARD DE PERFIL (COM AVATAR E BORDA DA LOJA) */}
           <div className="bg-gradient-to-br from-[#1b1133] to-[#2d1b55] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
               {/* Fundo Decorativo */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -translate-y-10 translate-x-10 pointer-events-none"></div>

               <div className="flex items-center gap-4 mb-6 relative z-10">
                   {/* Avatar com Borda Personalizada */}
                   <div className={`relative w-16 h-16 rounded-full flex items-center justify-center bg-slate-900 overflow-hidden shadow-lg ${profile?.equipped_border || 'border-2 border-white/20'}`}>
                        {profile?.equipped_avatar ? (
                            <img src={profile.equipped_avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl font-bold">{profile?.full_name[0]}</span>
                        )}
                   </div>
                   
                   <div className="flex-1">
                        <h3 className="font-bold text-lg leading-tight">{profile?.full_name}</h3>
                        {profile?.equipped_title && (
                            <span className="inline-block mt-1 text-[10px] font-black bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                                {profile.equipped_title}
                            </span>
                        )}
                   </div>
               </div>

               <h4 className="font-bold text-sm mb-3 flex items-center gap-2 border-t border-white/10 pt-4">
                   <Trophy size={14} className="text-yellow-400"/> Ranking Global
               </h4>
               
               <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                      <div className="font-bold text-yellow-400 w-4 text-center">1º</div>
                      <div className="text-sm flex-1 truncate">Ana Clara</div>
                      <div className="text-xs font-bold text-purple-200">12.500 XP</div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                      <div className="font-bold text-gray-300 w-4 text-center">2º</div>
                      <div className="text-sm flex-1 truncate">Pedro H.</div>
                      <div className="text-xs font-bold text-purple-200">11.200 XP</div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/20 p-2 rounded-lg border border-purple-500/50 backdrop-blur-sm shadow-inner">
                      <div className="font-bold text-white w-4 text-center">-</div>
                      <div className="text-sm flex-1 font-bold">Você</div>
                      <div className="text-xs font-bold text-white">{currentXp} XP</div>
                  </div>
               </div>
           </div>

        </div>

      </div>

      {/* MODAL: ENTRAR NA TURMA */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} 
             animate={{ scale: 1, opacity: 1 }}
             className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
           >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Entrar em uma Turma</h3>
              <p className="text-sm text-gray-500 mb-6">Digite o código fornecido pelo seu professor (Ex: BIO-X92).</p>
              
              <form onSubmit={handleJoinClass}>
                 <input 
                   type="text" 
                   autoFocus
                   placeholder="Código da Turma"
                   value={joinCode}
                   onChange={e => setJoinCode(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-xl font-mono text-center text-lg uppercase mb-4 focus:ring-2 focus:ring-purple-600 outline-none"
                 />
                 <div className="flex gap-3">
                    <button type="button" onClick={() => setShowJoinModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">Cancelar</button>
                    <button type="submit" disabled={isJoining || !joinCode} className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-70 flex justify-center">
                       {isJoining ? <Loader2 className="animate-spin"/> : 'Entrar'}
                    </button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}

    </div>
  );
}