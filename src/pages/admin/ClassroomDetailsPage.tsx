/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
    Users,
    BookOpen,
    Trash2,
    UserPlus,
    Search,
    ArrowLeft,
    Copy,
    MoreVertical,
    ShieldAlert,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Tipos
interface Student {
    id: string;
    full_name: string;
    avatar_url: string;
    xp: number;
    level: number;
}

interface Assignment {
    id: string;
    created_at: string;
    status: string;
    module: { title: string };
    // Futuramente: submissions count
}

export function ClassroomDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [classroom, setClassroom] = useState<any>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"students" | "assignments">(
        "students"
    );

    // Estado para Adicionar Aluno
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchEmail, setSearchEmail] = useState("");
    const [foundStudent, setFoundStudent] = useState<Student | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchClassData();
    }, [id]);

    async function fetchClassData() {
        if (!id) return;
        try {
            // 1. Dados da Turma
            const { data: classData, error: classError } = await supabase
                .from("classrooms")
                .select("*")
                .eq("id", id)
                .single();

            if (classError) throw classError;
            setClassroom(classData);

            // 2. Alunos Matriculados
            const { data: enrollData } = await supabase
                .from("enrollments")
                .select("student:profiles(*)")
                .eq("classroom_id", id);

            const formattedStudents =
                enrollData?.map((e: any) => e.student) || [];
            setStudents(formattedStudents);

            // 3. Atividades Atribuídas
            const { data: assignData } = await supabase
                .from("assignments")
                .select("*, module:game_modules(title)")
                .eq("classroom_id", id)
                .order("created_at", { ascending: false });

            setAssignments(assignData || []);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar turma.");
            navigate("/admin/turmas");
        } finally {
            setLoading(false);
        }
    }

    // --- AÇÕES ---

    const copyCode = () => {
        navigator.clipboard.writeText(classroom?.code);
        toast.success("Código copiado!");
    };

    const removeStudent = async (studentId: string) => {
        if (!confirm("Remover este aluno da turma?")) return;

        const { error } = await supabase
            .from("enrollments")
            .delete()
            .eq("classroom_id", id)
            .eq("student_id", studentId);

        if (error) toast.error("Erro ao remover.");
        else {
            toast.success("Aluno removido.");
            fetchClassData();
        }
    };

    const handleSearchStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchEmail) return;
        setIsSearching(true);
        setFoundStudent(null);

        try {
            const { data, error } = await supabase.rpc(
                "find_student_by_email",
                {
                    email_input: searchEmail.trim(),
                }
            );

            if (error) throw error;
            if (data && data.length > 0) {
                setFoundStudent(data[0] as Student);
            } else {
                toast.error("Nenhum aluno encontrado com este email.");
            }
        } catch (err) {
            toast.error("Erro na busca.");
        } finally {
            setIsSearching(false);
        }
    };

    const confirmAddStudent = async () => {
        if (!foundStudent || !id) return;

        // Verifica se já está na turma
        const alreadyIn = students.some((s) => s.id === foundStudent.id);
        if (alreadyIn) {
            toast.info("Este aluno já está na turma.");
            return;
        }

        const { error } = await supabase.from("enrollments").insert({
            classroom_id: id,
            student_id: foundStudent.id,
        });

        if (error) toast.error("Erro ao adicionar.");
        else {
            toast.success(`${foundStudent.full_name} matriculado!`);
            setShowAddModal(false);
            setSearchEmail("");
            setFoundStudent(null);
            fetchClassData();
        }
    };

    if (loading)
        return <div className="p-10 text-center">Carregando Diário...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen bg-slate-50">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/admin/turmas")}
                        className="p-2 bg-white rounded-full border hover:bg-slate-100"
                    >
                        <ArrowLeft className="text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {classroom?.name}
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm font-bold font-mono tracking-wider flex items-center gap-2">
                                {classroom?.code}
                                <button onClick={copyCode} title="Copiar">
                                    <Copy size={12} />
                                </button>
                            </span>
                            <span className="text-slate-500 text-sm">
                                {students.length} Alunos
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button
                        onClick={() => setActiveTab("students")}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            activeTab === "students"
                                ? "bg-slate-900 text-white shadow"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        Alunos
                    </button>
                    <button
                        onClick={() => setActiveTab("assignments")}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            activeTab === "assignments"
                                ? "bg-slate-900 text-white shadow"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        Diário de Atividades
                    </button>
                </div>
            </div>

            {/* CONTEÚDO DAS ABAS */}

            {/* 1. ABA ALUNOS */}
            {activeTab === "students" && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="font-bold text-slate-700 flex items-center gap-2">
                            <Users size={20} /> Lista de Chamada
                        </h2>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700 flex items-center gap-2"
                        >
                            <UserPlus size={16} /> Adicionar Aluno
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                                        Nome
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                                        Nível
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold overflow-hidden">
                                                {student.avatar_url ? (
                                                    <img
                                                        src={student.avatar_url}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    student.full_name[0]
                                                )}
                                            </div>
                                            <span className="font-bold text-slate-800">
                                                {student.full_name}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">
                                                Lvl {student.level}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() =>
                                                    removeStudent(student.id)
                                                }
                                                className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Remover da turma"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="p-8 text-center text-slate-400"
                                        >
                                            Nenhum aluno matriculado ainda.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 2. ABA ATIVIDADES */}
            {activeTab === "assignments" && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="font-bold text-slate-700 flex items-center gap-2">
                            <BookOpen size={20} /> Atividades Passadas
                        </h2>
                        <button
                            onClick={() => navigate("/admin/conteudo/novo")}
                            className="text-purple-600 font-bold text-sm hover:underline"
                        >
                            Nova Atividade
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {assignments.map((assign) => (
                            <div
                                key={assign.id}
                                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-purple-300 transition-colors group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-800 text-lg">
                                        {assign.module.title}
                                    </h3>
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                            assign.status === "open"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        {assign.status}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">
                                    Criada em{" "}
                                    {new Date(
                                        assign.created_at
                                    ).toLocaleDateString()}
                                </p>

                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-100">
                                        Ver Notas
                                    </button>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/batalha/gerenciar/${assign.id}`
                                            )
                                        }
                                        className="flex-1 py-2 bg-purple-50 text-purple-600 rounded-lg font-bold text-sm hover:bg-purple-100"
                                    >
                                        Gerenciar Batalha
                                    </button>
                                </div>
                            </div>
                        ))}
                        {assignments.length === 0 && (
                            <p className="col-span-2 text-center py-10 text-slate-400">
                                Nenhuma atividade atribuída para esta turma.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL ADICIONAR ALUNO */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                            Matricular Aluno
                        </h3>

                        {!foundStudent ? (
                            <form onSubmit={handleSearchStudent}>
                                <label className="block text-sm font-bold text-slate-600 mb-2">
                                    Email do Aluno
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        required
                                        placeholder="aluno@email.com"
                                        value={searchEmail}
                                        onChange={(e) =>
                                            setSearchEmail(e.target.value)
                                        }
                                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSearching}
                                        className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
                                    >
                                        {isSearching ? (
                                            <Loader2
                                                className="animate-spin"
                                                size={20}
                                            />
                                        ) : (
                                            <Search size={20} />
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-slate-600 overflow-hidden">
                                    {foundStudent.avatar_url ? (
                                        <img
                                            src={foundStudent.avatar_url}
                                            alt=""
                                        />
                                    ) : (
                                        foundStudent.full_name[0]
                                    )}
                                </div>
                                <h4 className="font-bold text-lg text-slate-900">
                                    {foundStudent.full_name}
                                </h4>
                                <p className="text-sm text-slate-500 mb-6">
                                    Confirmar matrícula nesta turma?
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setFoundStudent(null)}
                                        className="flex-1 py-2 border border-slate-200 rounded-lg font-bold text-slate-600"
                                    >
                                        Voltar
                                    </button>
                                    <button
                                        onClick={confirmAddStudent}
                                        className="flex-1 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <Trash2 className="rotate-45" size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
