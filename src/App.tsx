import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Contexto de Autenticação (NOVO)
import { AuthProvider } from "./contexts/AuthContext";

// Layouts e Componentes
import { RootLayout } from "./layouts/RootLayout";
import { AppLayout } from "./layouts/AppLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import OriginalSite from "./components/legacy/OriginalSite";

// Páginas
import { HomePage } from "./pages/public/HomePage";
import { TeamPage } from "./pages/public/TeamPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { StudentDashboard } from "./pages/app/StudentDashboard";
import { GamePage } from "./pages/app/GamePage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ContentCreatorPage } from "./pages/admin/ContentCreatorPage";
import { ClassroomsPage } from "./pages/admin/ClassroomsPage";
import { BattleManagerPage } from "./pages/admin/BattleManagerPage";
import { BattleArenaPage } from "./pages/admin/BattleArenaPage";
import { ClassroomDetailsPage } from "./pages/admin/ClassroomDetailsPage";
import { ShopPage } from "./pages/app/ShopPage";
import { CoursePlannerPage } from "./pages/admin/CoursePlannerPage";

// Placeholders
const PricingPage = () => (
    <div className="p-10 text-center">
        <h1>Página de Planos</h1>
    </div>
);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />

                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* --- 1. ROTAS DO NOVO SITE --- */}
                            <Route path="/" element={<RootLayout />}>
                                <Route index element={<HomePage />} />
                                <Route path="equipe" element={<TeamPage />} />
                                <Route
                                    path="planos"
                                    element={<PricingPage />}
                                />
                            </Route>

                            {/* --- 2. ROTAS DE AUTENTICAÇÃO --- */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/cadastro"
                                element={<RegisterPage />}
                            />

                            {/* --- ÁREA LOGADA DO ALUNO (/app) --- */}
                            {/* O AppLayout protege todas as rotas dentro dele */}
                            <Route path="/app" element={<AppLayout />}>
                                {/* Dashboard Principal (Home do Aluno) */}
                                <Route index element={<StudentDashboard />} />
                                <Route
                                    path="jogar/:moduleId"
                                    element={<GamePage />}
                                />

                                {/* Aqui adicionaremos depois: /app/missoes, /app/perfil */}
                                <Route
                                    path="missoes"
                                    element={
                                        <div className="p-8">
                                            Mapa de Missões (Em breve)
                                        </div>
                                    }
                                />
                                <Route
                                    path="conquistas"
                                    element={
                                        <div className="p-8">
                                            Conquistas (Em breve)
                                        </div>
                                    }
                                />
                                <Route
                                    path="perfil"
                                    element={
                                        <div className="p-8">
                                            Perfil do Usuário (Em breve)
                                        </div>
                                    }
                                />
                                <Route path="loja" element={<ShopPage />} />
                            </Route>

                            {/* --- ÁREA ADMINISTRATIVA (Professores/Donos) --- */}
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<AdminDashboard />} />
                                <Route
                                    path="conteudo/novo"
                                    element={<ContentCreatorPage />}
                                />
                                <Route
                                    path="turmas/:id"
                                    element={<ClassroomDetailsPage />}
                                />

                                {/* Futuras rotas */}
                                <Route
                                    path="turmas"
                                    element={<ClassroomsPage />}
                                />
                                <Route
                                    path="conteudo"
                                    element={
                                        <div>Lista de Conteúdos (Em breve)</div>
                                    }
                                />
                                <Route
                                    path="conteudo/novo"
                                    element={
                                        <div>
                                            Criador de Conteúdo IA (Em breve)
                                        </div>
                                    }
                                />
                                <Route
                                    path="global"
                                    element={
                                        <div>
                                            Gestão Global do Site (Em breve)
                                        </div>
                                    }
                                />
                                <Route
                                    path="batalha/gerenciar/:assignmentId"
                                    element={<BattleManagerPage />}
                                />
                                <Route
                                    path="batalha/aovivo/:assignmentId"
                                    element={<BattleArenaPage />}
                                />
                                <Route
                                    path="planejamento"
                                    element={<CoursePlannerPage />}
                                />
                            </Route>

                            {/* --- 3. O SITE ORIGINAL (Legado) --- */}
                            <Route
                                path="/apresentacao/*"
                                element={<OriginalSite />}
                            />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
}

export default App;
