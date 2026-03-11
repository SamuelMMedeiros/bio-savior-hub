/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Users, Copy, BookOpen, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function ClassroomsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newClassName, setNewClassName] = useState('');

  useEffect(() => {
    fetchClassrooms();
  }, [user]);

  async function fetchClassrooms() {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('classrooms')
        .select('*, enrollments(count)')
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setClassrooms(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newClassName.trim()) return;

    // Gera código (Ex: BIO-9X2)
    const code = `BIO-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    try {
      const { error } = await supabase.from('classrooms').insert({
        name: newClassName,
        code: code,
        teacher_id: user?.id,
      });

      if (error) throw error;
      
      toast.success("Turma criada com sucesso!");
      setNewClassName('');
      setIsCreating(false);
      await fetchClassrooms(); 

    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao criar turma: " + error.message);
    }
  }

  const copyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no botão dispare o clique do card (se fosse o card todo clicável)
    navigator.clipboard.writeText(code);
    toast.success(`Código ${code} copiado!`);
  };

  // Função de navegação para detalhes
  const goToDetails = (classId: string) => {
    navigate(`/admin/turmas/${classId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[calc(100vh-64px)]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Minhas Turmas</h1>
          <p className="text-slate-600">Gerencie suas classes, alunos e diários.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-700 shadow-sm transition-all active:scale-95"
        >
          <Plus size={20} /> Nova Turma
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 mb-8 animate-in slide-in-from-top-4">
          <label className="block text-sm font-bold text-slate-700 mb-2">Nome da Turma</label>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={newClassName}
              onChange={e => setNewClassName(e.target.value)}
              placeholder="Ex: 3º Ano A - Matutino"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              autoFocus
            />
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 shadow-md">Salvar</button>
            <button type="button" onClick={() => setIsCreating(false)} className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-bold text-slate-600">Cancelar</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-purple-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div 
                key={classroom.id} 
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between h-full"
            >
              <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {/* TÍTULO CLICÁVEL */}
                      <h3 
                        onClick={() => goToDetails(classroom.id)}
                        className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        {classroom.name}
                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/>
                      </h3>
                      <p className="text-slate-500 text-xs mt-1">Criada em {new Date(classroom.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-lg text-purple-700">
                      <Users size={24} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-slate-50 px-3 py-2 rounded border border-slate-200 text-sm flex-1 flex justify-between items-center">
                      <span className="text-slate-500">Código:</span>
                      <strong className="font-mono text-lg text-slate-900 tracking-wider select-all">{classroom.code}</strong>
                    </div>
                    <button onClick={(e) => copyCode(classroom.code, e)} className="p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-transparent hover:border-purple-100" title="Copiar código">
                      <Copy size={18} />
                    </button>
                  </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <span className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${classroom.enrollments[0]?.count > 0 ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                  {classroom.enrollments[0]?.count || 0} Alunos
                </span>
                
                {/* BOTÃO CLICÁVEL */}
                <button 
                    onClick={() => goToDetails(classroom.id)}
                    className="text-sm font-bold text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1"
                >
                  <BookOpen size={16} /> Ver Diário
                </button>
              </div>
            </div>
          ))}

          {classrooms.length === 0 && !isCreating && (
            <div className="col-span-full text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
              <Users className="mx-auto text-slate-300 mb-3" size={48} />
              <h3 className="text-lg font-bold text-slate-600">Nenhuma turma encontrada</h3>
              <p className="text-slate-500 mb-4">Crie sua primeira turma para começar a batalha.</p>
              <button onClick={() => setIsCreating(true)} className="text-purple-600 font-bold hover:underline">Criar agora</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}