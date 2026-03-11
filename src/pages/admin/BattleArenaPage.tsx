/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { Crown, Trophy, Swords } from "lucide-react";

export function BattleArenaPage() {
    const { assignmentId } = useParams();
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        fetchLiveScores();

        // --- MAGIA DO REALTIME ---
        const channel = supabase
            .channel("battle_room")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "battle_members" },
                (payload) => {
                    console.log("Movimento na arena!", payload);
                    fetchLiveScores(); // Recarrega os placares quando algo muda
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [assignmentId]);

    async function fetchLiveScores() {
        // Busca times e soma os pontos dos membros
        const { data: teamsData } = await supabase
            .from("battle_teams")
            .select(
                `
        id, name, color, captain_id,
        members:battle_members(id, current_score, student:profiles(full_name))
      `
            )
            .eq("assignment_id", assignmentId);

        if (teamsData) {
            // Calcula total do time
            const formatted = teamsData
                .map((t: any) => ({
                    ...t,
                    totalScore: t.members.reduce(
                        (acc: number, m: any) => acc + (m.current_score || 0),
                        0
                    ),
                }))
                .sort((a: any, b: any) => b.totalScore - a.totalScore); // Ordena pelo maior score

            setTeams(formatted);
        }
    }

    // O melhor time atual
    const leader = teams[0];

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-black uppercase tracking-widest flex items-center justify-center gap-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 animate-pulse">
                    <Swords size={64} className="text-red-500" /> Arena de
                    Batalha
                </h1>
                <p className="text-slate-400 mt-2 text-xl">
                    Acompanhamento em Tempo Real
                </p>
            </div>

            {/* PÓDIO / GRÁFICO DE BARRAS */}
            <div className="flex-1 flex items-end justify-center gap-8 px-10 pb-10">
                {teams.map((team, index) => {
                    // Lógica visual para destacar o líder
                    const isLeader = index === 0;
                    const height = Math.max(
                        100,
                        (team.totalScore / (leader?.totalScore || 1)) * 500
                    );

                    return (
                        <motion.div
                            key={team.id}
                            layout
                            initial={{ height: 0 }}
                            animate={{ height: `${height}px` }}
                            className="w-48 flex flex-col justify-end relative group"
                        >
                            {/* Score flutuante */}
                            <div className="text-center mb-4 font-black text-3xl">
                                {team.totalScore}
                            </div>

                            {/* Barra */}
                            <div
                                className={`w-full rounded-t-2xl relative shadow-[0_0_30px_rgba(0,0,0,0.5)] ${
                                    isLeader ? "animate-pulse" : ""
                                }`}
                                style={{
                                    height: "100%",
                                    backgroundColor: team.color,
                                    boxShadow: isLeader
                                        ? `0 0 50px ${team.color}`
                                        : "none",
                                }}
                            >
                                {isLeader && (
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-yellow-400">
                                        <Crown size={48} fill="currentColor" />
                                    </div>
                                )}

                                {/* Info do Time na Barra */}
                                <div className="absolute bottom-4 left-0 right-0 text-center">
                                    <h3 className="font-bold text-xl drop-shadow-md text-white">
                                        {team.name}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* RANKING INDIVIDUAL (Top Players da Rodada) */}
            <div className="mt-8 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Trophy className="text-yellow-400" /> Destaques da Rodada
                    (MVP)
                </h3>
                <div className="flex gap-6 overflow-x-auto pb-2">
                    {/* Aqui você poderia mapear todos os membros de todos os times e ordenar */}
                    <div className="flex items-center gap-3 bg-slate-700/50 px-4 py-2 rounded-full border border-slate-600">
                        <span className="font-bold text-yellow-400">1º</span>
                        <span>Ana Clara (Equipe Vermelha)</span>
                        <span className="font-mono font-bold">1200 XP</span>
                    </div>
                    {/* ... mais destaques ... */}
                </div>
            </div>
        </div>
    );
}
