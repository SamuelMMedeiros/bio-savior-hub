/**
 * Título: Barra Lateral Inteligente (Sidebar)
 * Descrição: Renderiza menus distintos baseados na role (permissão) do usuário.
 */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    School,
    Swords,
    Calendar,
    ShoppingBag,
    LogOut,
    GraduationCap,
    PlusSquare,
    Map,
    User,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function Sidebar() {
    const { user, signOut } = useAuth();
    const location = useLocation();

    // --- LÓGICA DE PERMISSÃO ---
    // Verifica os metadados do usuário no Supabase Auth
    const role = user?.user_metadata?.role || "student"; // Padrão é aluno

    // Consideramos 'admin' ou 'teacher' como professores
    const isTeacher = role === "admin" || role === "teacher";

    // Debug: Veja isso no Console do navegador (F12) para confirmar quem está logado
    console.log(
        `👤 Usuário: ${user?.email} | Role: ${role} | Modo: ${
            isTeacher ? "Professor" : "Aluno"
        }`
    );

    // --- LINKS DO PROFESSOR ---
    const teacherLinks = [
        { to: "/admin", icon: LayoutDashboard, label: "Painel Geral" },
        { to: "/admin/turmas", icon: School, label: "Minhas Turmas" },
        { to: "/admin/planejamento", icon: Calendar, label: "Planejador (IA)" },
        {
            to: "/admin/conteudo/novo",
            icon: PlusSquare,
            label: "Criar Atividade",
        },
    ];

    // --- LINKS DO ALUNO ---
    const studentLinks = [
        { to: "/app", icon: LayoutDashboard, label: "Base de Operações" },
        { to: "/app/loja", icon: ShoppingBag, label: "Loja de Recompensas" },
        { to: "/app/missoes", icon: Swords, label: "Minhas Missões" },
        // Futuro recurso Duolingo:
        // { to: '/app/jornada', icon: Map, label: 'Jornada de Estudo' },
    ];

    // Seleciona a lista correta
    const links = isTeacher ? teacherLinks : studentLinks;

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-50 shadow-xl border-r border-slate-800">
            {/* LOGO & CABEÇALHO */}
            <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/30">
                <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
                        isTeacher
                            ? "bg-gradient-to-tr from-purple-500 to-indigo-600"
                            : "bg-gradient-to-tr from-green-500 to-emerald-600"
                    }`}
                >
                    <GraduationCap size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="font-black text-lg tracking-tight leading-none mb-1">
                        BioSavior
                    </h1>
                    <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                            isTeacher
                                ? "bg-purple-900/50 text-purple-200"
                                : "bg-green-900/50 text-green-200"
                        }`}
                    >
                        {isTeacher ? "Professor" : "Aluno"}
                    </span>
                </div>
            </div>

            {/* MENU DE NAVEGAÇÃO */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                {links.map((link) => {
                    // Verifica se a rota está ativa (ex: /admin/turmas ativa o link Turmas)
                    const isActive =
                        location.pathname === link.to ||
                        location.pathname.startsWith(`${link.to}/`);

                    return (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm group relative overflow-hidden
                  ${
                      isActive
                          ? "bg-white/10 text-white shadow-md border border-white/5"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
               `}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-current rounded-r-full" />
                            )}
                            <link.icon
                                size={20}
                                className={
                                    isActive
                                        ? isTeacher
                                            ? "text-purple-400"
                                            : "text-green-400"
                                        : "text-slate-500 group-hover:text-slate-300"
                                }
                            />
                            {link.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* RODAPÉ (PERFIL) */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/30">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 overflow-hidden">
                        <User size={20} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold truncate text-slate-200">
                            {user?.user_metadata?.full_name || "Usuário"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-700/50 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all text-xs font-bold uppercase tracking-wide"
                >
                    <LogOut size={16} /> Sair
                </button>
            </div>
        </aside>
    );
}
