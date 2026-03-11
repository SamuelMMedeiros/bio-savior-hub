import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { BioQuiz } from "../../components/features/BioQuiz";

export function GamePage() {
    const { moduleId } = useParams<{ moduleId: string }>();

    if (!moduleId) {
        return <Navigate to="/app" replace />;
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
                <div
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[120px]"></div>
            </div>

            {/* ÁREA DO JOGO */}
            <div className="relative z-10 w-full flex-1 flex flex-col justify-center py-8">
                <BioQuiz moduleId={moduleId} />
            </div>
        </div>
    );
}
