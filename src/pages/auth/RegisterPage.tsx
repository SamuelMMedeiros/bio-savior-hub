/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Microscope,
    ArrowRight,
    Lock,
    Mail,
    User,
    School,
    GraduationCap,
    Users,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

// Tipos de Perfil disponíveis
type UserRole = "student" | "teacher" | "institution" | "parent";

export function RegisterPage() {
    const [step, setStep] = useState<1 | 2>(1); // Passo 1: Escolher Perfil, Passo 2: Dados
    const [role, setRole] = useState<UserRole>("student");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem!");
            return;
        }

        if (password.length < 6) {
            toast.error("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setIsLoading(true);

        try {
            // Cria o usuário no Supabase e salva o Nome/Cargo nos metadados
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        role: role,
                    },
                },
            });

            if (error) throw error;

            // Sucesso!
            toast.success("Conta criada com sucesso!");

            // Verifica se o Supabase exige confirmação de email (configurável no painel)
            if (data.session) {
                navigate("/app");
            } else {
                toast.info("Verifique seu e-mail para confirmar a conta.");
                navigate("/login");
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Erro ao criar conta.");
        } finally {
            setIsLoading(false);
        }
    };

    // Componente visual para selecionar o perfil
    const RoleCard = ({
        id,
        icon: Icon,
        title,
        desc,
    }: {
        id: UserRole;
        icon: any;
        title: string;
        desc: string;
    }) => (
        <button
            type="button"
            onClick={() => setRole(id)}
            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all w-full text-center
        ${
            role === id
                ? "border-purple-600 bg-purple-50 text-purple-900 shadow-md transform scale-105"
                : "border-gray-100 bg-white text-gray-500 hover:border-purple-200 hover:bg-gray-50"
        }`}
        >
            <div
                className={`p-3 rounded-full mb-3 ${
                    role === id
                        ? "bg-purple-200 text-purple-700"
                        : "bg-gray-100 text-gray-400"
                }`}
            >
                <Icon size={24} />
            </div>
            <span className="font-bold text-sm mb-1">{title}</span>
            <span className="text-xs opacity-80 leading-tight">{desc}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
                {/* Cabeçalho */}
                <div className="bg-[#1b1133] p-8 text-center text-white">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white mb-2 hover:opacity-90 transition-opacity"
                    >
                        <div className="bg-purple-600 p-2 rounded-lg backdrop-blur-sm shadow-lg shadow-purple-900">
                            <Microscope size={24} />
                        </div>
                        <span className="text-2xl font-bold">
                            BioExploradores
                        </span>
                    </Link>
                    <p className="text-purple-200 text-sm mt-2">
                        {step === 1
                            ? "Como você vai usar a plataforma?"
                            : "Preencha seus dados de acesso."}
                    </p>
                </div>

                <div className="p-8">
                    {/* PASSO 1: Escolha do Perfil */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
                            <div className="grid grid-cols-2 gap-4">
                                <RoleCard
                                    id="student"
                                    icon={GraduationCap}
                                    title="Estudante"
                                    desc="Quero aprender, jogar e estudar pro ENEM."
                                />
                                <RoleCard
                                    id="teacher"
                                    icon={School}
                                    title="Professor"
                                    desc="Quero criar turmas e materiais para alunos."
                                />
                                <RoleCard
                                    id="institution"
                                    icon={Users}
                                    title="Instituição"
                                    desc="Sou gestor de uma escola."
                                />
                                <RoleCard
                                    id="parent"
                                    icon={User}
                                    title="Pais"
                                    desc="Quero acompanhar o estudo do meu filho."
                                />
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-sm text-sm font-bold text-white bg-purple-700 hover:bg-purple-800 transition-all"
                            >
                                Continuar{" "}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    )}

                    {/* PASSO 2: Formulário */}
                    {step === 2 && (
                        <form
                            onSubmit={handleRegister}
                            className="space-y-4 animate-in slide-in-from-right fade-in duration-300"
                        >
                            <div className="text-center mb-2">
                                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                                    Criando conta como:{" "}
                                    {role === "student"
                                        ? "Estudante"
                                        : role === "teacher"
                                        ? "Professor"
                                        : role === "institution"
                                        ? "Instituição"
                                        : "Pais"}
                                </span>
                            </div>

                            {/* Nome Completo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome Completo
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                        placeholder="Seu nome"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    E-mail
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            {/* Senha */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Senha
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                            placeholder="******"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirmar
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                            placeholder="******"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    Voltar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-[2] py-3 px-4 rounded-lg shadow-sm text-sm font-bold text-white bg-purple-700 hover:bg-purple-800 disabled:opacity-70 transition-all"
                                >
                                    {isLoading
                                        ? "Criando..."
                                        : "Finalizar Cadastro"}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600">
                            Já tem uma conta?{" "}
                            <Link
                                to="/login"
                                className="font-bold text-purple-600 hover:text-purple-500"
                            >
                                Fazer Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
