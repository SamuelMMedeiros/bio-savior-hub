import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";

export function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Barra Lateral Fixa */}
            <Sidebar />

            {/* Conteúdo Principal */}
            {/* ml-64 empurra o conteúdo para a direita para não ficar embaixo da sidebar */}
            <main className="flex-1 ml-64 p-8 w-full overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}
