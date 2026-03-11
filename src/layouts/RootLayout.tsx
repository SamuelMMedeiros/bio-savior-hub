import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Microscope, Menu, X, ArrowRight } from "lucide-react";

export function RootLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            {/* --- NAVBAR --- */}
            <nav className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link
                                to="/"
                                className="flex items-center gap-2 group"
                            >
                                <div className="bg-purple-700 p-2 rounded-lg group-hover:bg-purple-800 transition-colors shadow-lg shadow-purple-200">
                                    <Microscope className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-purple-800 transition-colors">
                                    BioExploradores
                                </span>
                            </Link>
                        </div>

                        {/* Links Desktop */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                to="/"
                                className="text-gray-600 hover:text-purple-700 font-medium transition-colors"
                            >
                                Início
                            </Link>
                            <Link
                                to="/equipe"
                                className="text-gray-600 hover:text-purple-700 font-medium transition-colors"
                            >
                                Equipe
                            </Link>
                            <Link
                                to="/planos"
                                className="text-gray-600 hover:text-purple-700 font-medium transition-colors"
                            >
                                Planos
                            </Link>

                            {/* Link para o site antigo */}
                            <Link
                                to="/apresentacao"
                                className="text-purple-600 font-medium flex items-center gap-1 hover:underline hover:text-purple-800"
                            >
                                Site Original <ArrowRight size={16} />
                            </Link>

                            <div className="h-6 w-px bg-gray-200 mx-2"></div>

                            <Link
                                to="/login"
                                className="px-4 py-2 text-purple-700 font-semibold border border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all"
                            >
                                Entrar
                            </Link>
                            <Link
                                to="/cadastro"
                                className="px-4 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 shadow-sm hover:shadow-purple-300 transition-all"
                            >
                                Criar Conta
                            </Link>
                        </div>

                        {/* Menu Mobile Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-500 hover:text-purple-700 p-2"
                            >
                                {isMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 z-50">
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-purple-50 rounded-md"
                            >
                                Início
                            </Link>
                            <Link
                                to="/equipe"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-purple-50 rounded-md"
                            >
                                Equipe
                            </Link>
                            <Link
                                to="/planos"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-purple-50 rounded-md"
                            >
                                Planos
                            </Link>
                            <Link
                                to="/apresentacao"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-3 text-base font-medium text-purple-600 hover:bg-purple-50 rounded-md"
                            >
                                Ir para Site Original
                            </Link>

                            <div className="border-t border-gray-100 my-2 pt-2 space-y-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center px-3 py-3 text-purple-700 font-bold bg-purple-50 rounded-lg"
                                >
                                    Entrar
                                </Link>
                                <Link
                                    to="/cadastro"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center px-3 py-3 bg-purple-700 text-white font-bold rounded-lg shadow-sm"
                                >
                                    Criar Conta Grátis
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* --- CONTEÚDO DA PÁGINA --- */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-[#0f0b1f] text-white border-t border-purple-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-500/30">
                                    <Microscope className="h-6 w-6 text-purple-400" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-white">
                                    BioExploradores
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                                Uma plataforma de extensão universitária
                                conectando a ciência acadêmica com a curiosidade
                                do ensino básico.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">
                                Plataforma
                            </h3>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li>
                                    <Link
                                        to="/equipe"
                                        className="hover:text-purple-300 transition-colors"
                                    >
                                        Nossa Equipe
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/planos"
                                        className="hover:text-purple-300 transition-colors"
                                    >
                                        Planos Escolares
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/apresentacao"
                                        className="hover:text-purple-300 transition-colors"
                                    >
                                        Projeto Original
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">
                                Suporte
                            </h3>
                            <ul className="space-y-3 text-slate-400 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-purple-300 transition-colors"
                                    >
                                        Central de Ajuda
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-purple-300 transition-colors"
                                    >
                                        Para Escolas
                                    </a>
                                </li>
                                <li>
                                    <span className="text-slate-600">
                                        Patos de Minas, MG
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                        <p>
                            &copy; {new Date().getFullYear()} BioExploradores.
                            Todos os direitos reservados.
                        </p>
                        <p className="mt-2 md:mt-0">
                            Desenvolvido com React & Supabase
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
