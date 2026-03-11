import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    ChevronRight,
    ArrowLeft,
    Calendar,
    Tag,
    Download,
    Microscope,
    Leaf,
} from "lucide-react";

// --- Tipos de Dados ---
interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    avatarUrl: string;
    color: string;
}

interface PortfolioItem {
    id: string;
    memberId: string;
    title: string;
    description: string;
    date: string;
    type: "Artigo" | "Relatório" | "Poster";
    tags: string[];
    imageUrl?: string;
    documentUrl?: string;
}

// --- Dados Mockados ---
const teamMembers: TeamMember[] = [
    {
        id: "1",
        name: "Mirian",
        role: "Biologia Celular",
        bio: "Focada em análises microscópicas e citogenética vegetal. Apaixonada por entender a vida no nível celular.",
        avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
        color: "bg-purple-100 text-purple-700",
    },
    {
        id: "2",
        name: "Stênio",
        role: "Ecologia",
        bio: "Investigando interações ecológicas no cerrado mineiro e estratégias de preservação.",
        avatarUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        color: "bg-indigo-100 text-indigo-700",
    },
    {
        id: "3",
        name: "Bianca",
        role: "Botânica",
        bio: "Especialista em taxonomia de angiospermas e levantamento florístico.",
        avatarUrl:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
        color: "bg-pink-100 text-pink-700",
    },
    {
        id: "4",
        name: "Maria Eduarda",
        role: "Zoologia",
        bio: "Estudos comportamentais de avifauna urbana e bioindicadores.",
        avatarUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        color: "bg-fuchsia-100 text-fuchsia-700",
    },
];

const portfolioItems: PortfolioItem[] = [
    {
        id: "101",
        memberId: "1",
        title: "Análise Citogenética de Orquídeas Nativas",
        description:
            "Estudo detalhado sobre o comportamento cromossômico de espécies encontradas na região de Patos de Minas.",
        date: "Nov 2024",
        type: "Artigo",
        tags: ["Citogenética", "Microscopia", "Orquídeas"],
        imageUrl:
            "https://images.unsplash.com/photo-1530041539828-114de669390e?auto=format&fit=crop&q=80&w=600",
        documentUrl: "#",
    },
    {
        id: "201",
        memberId: "2",
        title: "Impacto das Queimadas na Fauna Local",
        description:
            "Levantamento de dados sobre a recuperação da fauna após períodos de seca e queimadas.",
        date: "Out 2024",
        type: "Poster",
        tags: ["Ecologia", "Fauna", "Conservação"],
        imageUrl:
            "https://images.unsplash.com/photo-1464195157370-5b59640a2782?auto=format&fit=crop&q=80&w=600",
        documentUrl: "#",
    },
    {
        id: "301",
        memberId: "3",
        title: "Flora do Parque Municipal do Mocambo",
        description:
            "Catálogo ilustrado das espécies arbóreas encontradas no parque urbano.",
        date: "Set 2024",
        type: "Relatório",
        tags: ["Botânica", "Taxonomia", "Patos de Minas"],
        imageUrl:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600",
        documentUrl: "#",
    },
];

export function TeamPage() {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(
        null
    );

    const activeMember = teamMembers.find((m) => m.id === selectedMemberId);
    const memberProjects = portfolioItems.filter(
        (p) => p.memberId === selectedMemberId
    );

    // Animação de entrada
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    // --- MODO LISTA (Seleção de Membro) ---
    if (!selectedMemberId) {
        return (
            <div className="py-16 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
                        <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Nossos Pesquisadores
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Conheça os acadêmicos por trás do BioExploradores.
                        Clique em um perfil para ver seus artigos, pesquisas e
                        descobertas.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {teamMembers.map((member) => (
                        <motion.button
                            key={member.id}
                            variants={itemVariants}
                            onClick={() => setSelectedMemberId(member.id)}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group text-left flex flex-col h-full hover:border-purple-200"
                        >
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                <img
                                    src={member.avatarUrl}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1133]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        Ver Portfólio <ChevronRight size={16} />
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {member.name}
                                </h3>
                                <span
                                    className={`inline-block px-2 py-1 rounded-md text-xs font-semibold mt-2 w-fit ${member.color}`}
                                >
                                    {member.role}
                                </span>
                                <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        );
    }

    // --- MODO DETALHES (Perfil do Membro) ---
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <button
                        onClick={() => setSelectedMemberId(null)}
                        className="flex items-center text-gray-500 hover:text-purple-600 transition-colors mb-6 group"
                    >
                        <ArrowLeft
                            size={20}
                            className="mr-2 group-hover:-translate-x-1 transition-transform"
                        />
                        Voltar para a equipe
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0"
                        >
                            <img
                                src={activeMember?.avatarUrl}
                                alt={activeMember?.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {activeMember?.name}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${activeMember?.color}`}
                                >
                                    {activeMember?.role}
                                </span>
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                                    <Microscope size={14} /> 5º Período
                                </span>
                            </div>
                            <p className="text-gray-600 text-lg max-w-3xl">
                                {activeMember?.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                    <Leaf className="text-purple-600" /> Publicações e Projetos
                </h2>

                <div className="space-y-6">
                    {memberProjects.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">
                                Este pesquisador ainda não publicou projetos
                                nesta plataforma.
                            </p>
                        </div>
                    ) : (
                        memberProjects.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-purple-200 transition-colors flex flex-col md:flex-row gap-6"
                            >
                                {item.imageUrl && (
                                    <div className="w-full md:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
                      ${
                          item.type === "Artigo"
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : item.type === "Poster"
                              ? "bg-purple-50 text-purple-700 border border-purple-100"
                              : "bg-orange-50 text-orange-700 border border-orange-100"
                      }`}
                                        >
                                            {item.type}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar size={12} /> {item.date}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 flex-1">
                                        {item.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-200 flex items-center gap-1"
                                            >
                                                <Tag size={10} /> {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-end">
                                        <button className="flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors px-4 py-2 hover:bg-purple-50 rounded-lg">
                                            <Download size={16} /> Baixar
                                            Material
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
