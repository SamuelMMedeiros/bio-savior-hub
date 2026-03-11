import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Gamepad2,
    Brain,
    Microscope,
    CheckCircle2,
} from "lucide-react";

export function HomePage() {
    return (
        <div className="flex flex-col">
            {/* --- HERO SECTION (Identidade Visual Original) --- */}
            <section className="relative bg-[#0f0b1f] text-white overflow-hidden">
                {/* Gradiente de Fundo (Baseado no original) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0b1f] to-[#1b1133] z-0"></div>

                {/* Elementos Decorativos Abstratos */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-purple-900/50 border border-purple-500/50 text-purple-300 text-sm font-semibold mb-6 backdrop-blur-md">
                            Projeto de Extensão Universitária &bull; Patos de
                            Minas
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            A Biologia saiu do livro <br /> e virou{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                Aventura
                            </span>
                            .
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                            Transforme o estudo para o ENEM em um jogo. Explore
                            o Cerrado, faça experimentos virtuais e aprenda com
                            cientistas reais.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/cadastro"
                                className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/50 transition-all flex items-center justify-center gap-2 text-lg transform hover:-translate-y-1"
                            >
                                Começar Aventura Grátis <ArrowRight size={20} />
                            </Link>
                            <Link
                                to="/planos"
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all flex items-center justify-center"
                            >
                                Sou Escola / Professor
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- FEATURES --- */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Como funciona o BioExploradores?
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Unimos a tecnologia dos games com o rigor da ciência
                            acadêmica.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-purple-100 transition-all duration-300">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Gamepad2 className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Aprenda Jogando
                            </h3>
                            <p className="text-gray-600">
                                Complete missões, ganhe medalhas e suba no
                                ranking. O conteúdo de citologia e botânica
                                nunca foi tão divertido.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-purple-100 transition-all duration-300">
                            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <Microscope className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Ciência Real
                            </h3>
                            <p className="text-gray-600">
                                Nada de desenhos genéricos. Use fotos reais de
                                microscopia e dados coletados em campo pela
                                nossa equipe de pesquisadores.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-purple-100 transition-all duration-300">
                            <div className="w-14 h-14 bg-fuchsia-100 rounded-xl flex items-center justify-center mb-6">
                                <Brain className="w-7 h-7 text-fuchsia-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Foco no ENEM
                            </h3>
                            <p className="text-gray-600">
                                Inteligência Artificial que cria resumos e
                                listas de exercícios personalizados baseados nas
                                suas dificuldades.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROVA SOCIAL / ESCOLAS --- */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <span className="text-purple-600 font-bold uppercase tracking-wider text-sm">
                            Para Instituições
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                            Leve o laboratório para dentro da sua sala de aula.
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Escolas parceiras têm acesso ao Painel do Professor,
                            onde é possível criar turmas, monitorar o desempenho
                            dos alunos e gerar relatórios de aprendizagem
                            alinhados à BNCC.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Gestão completa de turmas e notas",
                                "Banco de questões validado por universitários",
                                "Jogos ao vivo (Quiz) para engajar a turma",
                                "Preços acessíveis para escolas públicas e privadas",
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 text-gray-700 font-medium"
                                >
                                    <CheckCircle2 className="text-purple-500 w-5 h-5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/planos"
                            className="text-purple-700 font-bold hover:text-purple-800 inline-flex items-center gap-2 group"
                        >
                            Conhecer planos escolares{" "}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-purple-100 rounded-3xl transform rotate-3 scale-95 z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800"
                            alt="Professor com alunos"
                            className="relative z-10 rounded-2xl shadow-xl border-4 border-white"
                        />
                    </div>
                </div>
            </section>

            {/* --- CTA FINAL --- */}
            <section className="py-24 bg-gradient-to-r from-purple-800 to-indigo-900 text-center text-white px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Pronto para começar?
                </h2>
                <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">
                    Junte-se a outros alunos de Patos de Minas e região que já
                    estão aprendendo biologia de um jeito novo.
                </p>
                <Link
                    to="/cadastro"
                    className="inline-block px-10 py-4 bg-white text-purple-800 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1"
                >
                    Criar Minha Conta Grátis
                </Link>
            </section>
        </div>
    );
}
