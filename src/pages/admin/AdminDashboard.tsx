/**
 * Título: Dashboard do Administrador
 * Caminho: src/pages/admin/AdminDashboard.tsx
 * Descrição: Painéis inteligentes para Super Admins e Professores.
 */
import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    BookOpen,
    Plus,
    Sparkles,
    TrendingUp,
    ShieldCheck,
    DollarSign,
    Building2,
    Activity,
    AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// --- SUB-COMPONENTE: Visão do Dono do Site (Super Admin) ---
function SuperAdminView({ firstName }: { firstName: string }) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Diferenciado */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Modo Deus
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Visão Global
                    </h1>
                    <p className="text-slate-600">
                        Bem-vindo, Chefe {firstName}.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-black transition-colors flex items-center gap-2">
                        <Building2 size={16} /> Cadastrar Nova Escola
                    </button>
                </div>
            </div>

            {/* NOVO: Atalho de IA para o Admin Global */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-full">
                        <Sparkles className="text-purple-300 w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">
                            Gerador de Conteúdo IA
                        </h3>
                        <p className="text-purple-100 text-sm">
                            Crie conteúdo oficial para o banco de dados global
                            da plataforma.
                        </p>
                    </div>
                </div>
                <Link
                    to="/admin/conteudo/novo"
                    className="px-6 py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-purple-50 transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
                >
                    <Plus size={18} /> Criar Novo Módulo
                </Link>
            </div>

            {/* Métricas do Negócio */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Faturamento (Mockado) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-green-100 p-2 rounded-lg text-green-600">
                            <DollarSign size={24} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                            +12%
                        </span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase">
                        Receita Mensal
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">
                        R$ 14.250
                    </h3>
                </div>

                {/* Total de Escolas */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mb-4 w-fit">
                        <Building2 size={24} />
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase">
                        Escolas Ativas
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">
                        8 Instituições
                    </h3>
                </div>

                {/* Total de Alunos */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600 mb-4 w-fit">
                        <Users size={24} />
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase">
                        Total de Alunos
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">1.240</h3>
                </div>

                {/* Saúde do Sistema */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="bg-orange-100 p-2 rounded-lg text-orange-600 mb-4 w-fit">
                        <Activity size={24} />
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase">
                        Status do Sistema
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">
                        Estável
                    </h3>
                </div>
            </div>

            {/* Áreas de Gestão */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gestão de Conteúdo Global */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-emerald-600" />{" "}
                        Conteúdo Oficial BioExploradores
                    </h3>
                    <p className="text-slate-500 text-sm mb-6">
                        Gerencie os módulos "padrão" que aparecem para todas as
                        escolas (conteúdo autoral).
                    </p>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="font-medium text-slate-700">
                                Módulo: Citologia Básica
                            </span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">
                                Publicado
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="font-medium text-slate-700">
                                Módulo: Botânica I
                            </span>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">
                                Rascunho
                            </span>
                        </div>
                    </div>
                    <button className="mt-6 w-full py-2 border border-slate-300 rounded-lg text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                        Gerenciar Conteúdo Global
                    </button>
                </div>

                {/* Alertas / Logs */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="text-red-500" />{" "}
                        Solicitações Pendentes
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-sm">
                            <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                            <div>
                                <p className="font-medium text-slate-900">
                                    Escola "Colegio Dom Bosco" solicitou acesso
                                    Pro.
                                </p>
                                <p className="text-slate-400 text-xs">
                                    Há 2 horas
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-3 text-sm">
                            <div className="w-2 h-2 mt-1.5 rounded-full bg-purple-500 flex-shrink-0"></div>
                            <div>
                                <p className="font-medium text-slate-900">
                                    Novo cadastro de professor pendente
                                    aprovação.
                                </p>
                                <p className="text-slate-400 text-xs">
                                    Há 5 horas
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTE: Visão do Professor/Instituição (Tenant) ---
function TeacherView({ firstName }: { firstName: string }) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Painel do Educador
                </h1>
                <p className="text-slate-600">
                    Bem-vindo de volta, Prof. {firstName}.
                </p>
            </div>

            {/* Atalhos Rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card Criar Conteúdo (Destaque IA) */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
                        <Sparkles size={80} />
                    </div>
                    <div className="relative z-10">
                        <div className="bg-white/20 w-fit p-2 rounded-lg mb-4">
                            <Plus size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            Criar Atividade com IA
                        </h3>
                        <p className="text-purple-100 text-sm mb-4">
                            Gere questões e resumos automaticamente para suas
                            turmas.
                        </p>
                        <Link
                            to="/admin/conteudo/novo"
                            className="inline-block bg-white text-purple-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-50 transition-colors"
                        >
                            Gerar Agora
                        </Link>
                    </div>
                </motion.div>

                {/* Card Minhas Turmas */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="bg-blue-100 w-fit p-2 rounded-lg mb-4 text-blue-600">
                        <Users size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                        Minhas Turmas
                    </h3>
                    <p className="text-slate-500 text-sm mb-4">
                        Gerencie alunos, matrículas e desempenho.
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">
                            3
                        </span>
                        <span className="text-xs text-slate-500">
                            turmas ativas
                        </span>
                    </div>
                </div>

                {/* Card Banco de Questões */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="bg-emerald-100 w-fit p-2 rounded-lg mb-4 text-emerald-600">
                        <BookOpen size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                        Banco Institucional
                    </h3>
                    <p className="text-slate-500 text-sm mb-4">
                        Questões compartilhadas pela sua escola.
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">
                            142
                        </span>
                        <span className="text-xs text-slate-500">
                            questões disponíveis
                        </span>
                    </div>
                </div>
            </div>

            {/* Lista Recente */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">
                        Atividades Recentes
                    </h3>
                    <button className="text-sm text-purple-600 font-bold hover:underline">
                        Ver todas
                    </button>
                </div>
                <div className="p-6 text-center text-slate-500 py-12">
                    <TrendingUp
                        size={48}
                        className="mx-auto text-slate-300 mb-4"
                    />
                    <p>Nenhuma atividade criada recentemente.</p>
                </div>
            </div>
        </div>
    );
}

// --- COMPONENTE PRINCIPAL ---
export function AdminDashboard() {
    const { user } = useAuth();
    const role = user?.user_metadata?.role || "student";
    const firstName =
        user?.user_metadata?.full_name?.split(" ")[0] || "Usuário";

    // RENDERIZAÇÃO CONDICIONAL
    if (role === "admin") {
        return <SuperAdminView firstName={firstName} />;
    }

    return <TeacherView firstName={firstName} />;
}
