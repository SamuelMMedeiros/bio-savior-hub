import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";

export function AppLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Barra Lateral Fixa (O componente detecta automaticamente que é aluno) */}
            <Sidebar />

            {/* Conteúdo Principal */}
            <main className="flex-1 ml-64 p-8 w-full overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}
