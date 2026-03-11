/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Microscope, ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            toast.success("Login realizado com sucesso!");
            navigate("/app"); // Redireciona para Home (ou Dashboard futuramente)
        } catch (err: any) {
            setError(
                err.message === "Invalid login credentials"
                    ? "E-mail ou senha incorretos."
                    : "Ocorreu um erro ao entrar. Tente novamente."
            );
            toast.error("Erro no login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
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
                        Acesse sua conta para continuar aprendendo.
                    </p>
                </div>

                {/* Formulário */}
                <div className="p-8">
                    {/* Mensagem de Erro */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

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
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="flex justify-end mt-1">
                                <a
                                    href="#"
                                    className="text-xs font-medium text-purple-600 hover:text-purple-500"
                                >
                                    Esqueceu a senha?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? "Entrando..." : "Entrar na Plataforma"}
                            {!isLoading && (
                                <ArrowRight className="ml-2 h-4 w-4" />
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600">
                            Ainda não tem conta?{" "}
                            <Link
                                to="/cadastro"
                                className="font-bold text-purple-600 hover:text-purple-500"
                            >
                                Criar conta grátis
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
