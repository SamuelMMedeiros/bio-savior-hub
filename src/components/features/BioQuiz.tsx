import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
    CheckCircle,
    XCircle,
    Trophy,
    ArrowRight,
    ArrowLeft,
    Loader2,
    Microscope,
    Clock,
    Zap,
    Coins,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

interface Option {
    id: string;
    text: string;
    is_correct: boolean;
}

interface Question {
    id: string;
    text: string;
    explanation: string;
    time_limit: number;
    options: Option[];
}

interface BioQuizProps {
    moduleId: string;
}

export function BioQuiz({ moduleId }: BioQuizProps) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const assignmentId = searchParams.get("assignmentId");

    // Dados
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    // Estado do Jogo
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [rewards, setRewards] = useState({ xp: 0, coins: 0 }); // Novas recompensas
    const [isSaving, setIsSaving] = useState(false);

    // Estado da Questão Atual
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // 1. CARREGAR PERGUNTAS
    useEffect(() => {
        async function fetchQuestions() {
            if (!moduleId) return;
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from("game_questions")
                    .select(
                        `
            id, text, explanation, time_limit,
            options:game_answers (id, text, is_correct)
          `
                    )
                    .eq("module_id", moduleId);

                if (error) throw error;

                if (data && data.length > 0) {
                    const shuffled = data.sort(() => Math.random() - 0.5);
                    setQuestions(shuffled);
                    if (shuffled[0].time_limit > 0)
                        setTimeLeft(shuffled[0].time_limit);
                } else {
                    toast.error("Módulo vazio.");
                    navigate("/app");
                }
            } catch (err) {
                console.error(err);
                toast.error("Erro ao carregar.");
            } finally {
                setLoading(false);
            }
        }
        fetchQuestions();
    }, [moduleId]);

    const question = questions[currentQuestionIndex];
    const progress =
        questions.length > 0
            ? (currentQuestionIndex / questions.length) * 100
            : 0;
    const hasTimer = question?.time_limit > 0;

    // 2. TIMER
    useEffect(() => {
        if (isAnswerChecked || !question || !hasTimer) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }
        setTimeLeft(question.time_limit);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [currentQuestionIndex, isAnswerChecked]);

    const handleTimeUp = () => {
        setIsAnswerChecked(true);
        toast.warning("Tempo esgotado!");
        setCombo(0);
    };

    // 3. VERIFICAÇÃO
    const checkAnswer = async () => {
        if (timerRef.current) clearInterval(timerRef.current);

        const isCorrect = question.options.find(
            (opt) => opt.id === selectedOption
        )?.is_correct;

        setIsAnswerChecked(true);

        if (isCorrect) {
            const timeBonus = hasTimer
                ? Math.floor((timeLeft / question.time_limit) * 50)
                : 0;
            const comboBonus = combo * 10;
            const pointsEarned = 100 + timeBonus + comboBonus;

            const newScore = score + pointsEarned;
            setScore(newScore);
            setCombo((prev) => prev + 1);

            confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });

            // Atualiza Batalha em Tempo Real
            if (assignmentId && user) updateBattleScore(pointsEarned);
        } else {
            setCombo(0);
        }
    };

    const updateBattleScore = async (points: number) => {
        try {
            const { data: teams } = await supabase
                .from("battle_teams")
                .select("id")
                .eq("assignment_id", assignmentId);
            const teamIds = teams?.map((t) => t.id) || [];
            if (teamIds.length > 0) {
                const { data: currentMember } = await supabase
                    .from("battle_members")
                    .select("current_score")
                    .in("team_id", teamIds)
                    .eq("student_id", user?.id)
                    .single();
                if (currentMember) {
                    await supabase
                        .from("battle_members")
                        .update({
                            current_score:
                                (currentMember.current_score || 0) + points,
                            last_updated: new Date().toISOString(),
                        })
                        .in("team_id", teamIds)
                        .eq("student_id", user?.id);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        } else {
            finishGame();
        }
    };

    // 4. FINALIZAR JOGO (Integração com RPC)
    const finishGame = async () => {
        setShowResult(true);
        setIsSaving(true);

        if (!user) return;

        try {
            // Chama a função SQL criada
            const { data, error } = await supabase.rpc("finish_game", {
                p_module_id: moduleId,
                p_score: score,
                p_assignment_id: assignmentId || null,
            });

            if (error) throw error;

            // Salva o que a função retornou para exibir na tela
            setRewards({
                xp: data.xp_earned,
                coins: data.coins_earned,
            });

            // Mais confetes para celebrar o dinheiro
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                });
            }, 500);
        } catch (err) {
            console.error("Erro ao salvar progresso:", err);
            toast.error("Erro ao salvar progresso.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin text-purple-600 w-10 h-10" />
            </div>
        );

    // --- TELA DE RESULTADO ---
    if (showResult) {
        return (
            <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl text-center border-4 border-purple-100 animate-in zoom-in">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Trophy className="w-12 h-12 text-yellow-600" />
                </div>

                <h2 className="text-3xl font-black text-slate-800 mb-2">
                    Missão Cumprida!
                </h2>
                <p className="text-slate-500 mb-8">Confira suas recompensas:</p>

                {isSaving ? (
                    <div className="py-10 flex flex-col items-center">
                        <Loader2
                            className="animate-spin text-purple-600 mb-2"
                            size={32}
                        />
                        <p className="text-sm font-bold text-slate-400">
                            Contabilizando prêmios...
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {/* Card XP */}
                        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex flex-col items-center">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                                Experiência
                            </span>
                            <div className="text-3xl font-black text-purple-700">
                                +{rewards.xp}
                            </div>
                            <span className="text-xs font-bold text-purple-400">
                                XP
                            </span>
                        </div>

                        {/* Card Coins */}
                        <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 flex flex-col items-center">
                            <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">
                                BioCoins
                            </span>
                            <div className="text-3xl font-black text-yellow-600 flex items-center gap-1">
                                +{rewards.coins}{" "}
                                <Coins
                                    size={20}
                                    fill="currentColor"
                                    className="text-yellow-500"
                                />
                            </div>
                            <span className="text-xs font-bold text-yellow-600">
                                Moedas
                            </span>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => navigate("/app/loja")}
                        className="w-full py-3 bg-yellow-400 text-yellow-900 rounded-xl font-bold shadow-md hover:bg-yellow-500 transition-all flex items-center justify-center gap-2"
                    >
                        <Coins size={18} /> Ir para a Loja
                    </button>
                    <button
                        onClick={() => navigate("/app")}
                        className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                    >
                        Voltar para a Base
                    </button>
                </div>
            </div>
        );
    }

    // --- RENDER DO JOGO (Mantido igual) ---
    const timerPercentage = hasTimer
        ? (timeLeft / question.time_limit) * 100
        : 100;
    let timerColor = "bg-green-500";
    if (timerPercentage < 50) timerColor = "bg-yellow-500";
    if (timerPercentage < 20) timerColor = "bg-red-500";

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6 pb-20">
            {/* HEADER */}
            <div className="sticky top-0 bg-slate-50/90 backdrop-blur-sm z-10 py-4 mb-4">
                <div className="flex items-center gap-4 mb-3">
                    <button
                        onClick={() => navigate("/app")}
                        className="p-2 rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-purple-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <div className="flex items-center gap-1 font-black text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
                        <Zap
                            size={16}
                            className="text-yellow-500 fill-yellow-500"
                        />
                        <span>{score}</span>
                    </div>
                </div>

                {hasTimer && (
                    <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                        <Clock
                            size={18}
                            className={
                                timerPercentage < 20
                                    ? "text-red-500 animate-pulse"
                                    : "text-slate-400"
                            }
                        />
                        <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full ${timerColor}`}
                                animate={{ width: `${timerPercentage}%` }}
                                transition={{ duration: 1, ease: "linear" }}
                            />
                        </div>
                        <span
                            className={`text-sm font-bold w-8 text-right font-mono ${
                                timerPercentage < 20
                                    ? "text-red-600"
                                    : "text-slate-600"
                            }`}
                        >
                            {timeLeft}s
                        </span>
                    </div>
                )}
            </div>

            {/* CARD DA PERGUNTA */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative animate-in slide-in-from-bottom-4">
                <div className="p-6 md:p-10">
                    {combo > 1 && (
                        <div className="absolute top-6 right-6 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider rotate-3 animate-bounce">
                            {combo}x Combo!
                        </div>
                    )}

                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
                        {question.text}
                    </h3>

                    <div className="space-y-3">
                        {question.options.map((option) => {
                            let containerClass =
                                "border-slate-200 hover:border-purple-300 hover:bg-purple-50/50";
                            let textClass = "text-slate-600";
                            let icon = null;

                            if (selectedOption === option.id) {
                                containerClass =
                                    "border-purple-600 bg-purple-50 ring-2 ring-purple-100";
                                textClass = "text-purple-900 font-bold";
                            }

                            if (isAnswerChecked) {
                                if (option.is_correct) {
                                    containerClass =
                                        "border-green-500 bg-green-50 ring-1 ring-green-200";
                                    textClass = "text-green-800 font-bold";
                                    icon = (
                                        <CheckCircle
                                            size={20}
                                            className="text-green-600"
                                        />
                                    );
                                } else if (
                                    selectedOption === option.id &&
                                    !option.is_correct
                                ) {
                                    containerClass =
                                        "border-red-500 bg-red-50 ring-1 ring-red-200";
                                    textClass = "text-red-800 font-bold";
                                    icon = (
                                        <XCircle
                                            size={20}
                                            className="text-red-600"
                                        />
                                    );
                                } else {
                                    containerClass =
                                        "opacity-40 border-slate-100 grayscale";
                                }
                            }

                            return (
                                <button
                                    key={option.id}
                                    onClick={() =>
                                        !isAnswerChecked &&
                                        setSelectedOption(option.id)
                                    }
                                    disabled={isAnswerChecked}
                                    className={`w-full p-4 md:p-5 rounded-2xl border-2 text-left transition-all relative group flex items-center justify-between ${containerClass}`}
                                >
                                    <span
                                        className={`text-base md:text-lg ${textClass}`}
                                    >
                                        {option.text}
                                    </span>
                                    {icon}
                                </button>
                            );
                        })}
                    </div>

                    <AnimatePresence>
                        {isAnswerChecked && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-6 overflow-hidden"
                            >
                                <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 text-indigo-900 text-sm flex gap-4">
                                    <div className="bg-white p-2 rounded-xl h-fit shadow-sm text-indigo-600">
                                        <Microscope size={20} />
                                    </div>
                                    <div>
                                        <strong className="block mb-1 text-base font-bold text-indigo-800">
                                            Análise do Professor:
                                        </strong>
                                        <p className="leading-relaxed opacity-90">
                                            {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                    {!isAnswerChecked ? (
                        <button
                            onClick={checkAnswer}
                            disabled={!selectedOption}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full md:w-auto"
                        >
                            Confirmar Resposta
                        </button>
                    ) : (
                        <button
                            onClick={nextQuestion}
                            className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-black hover:scale-[1.02] transition-all flex items-center justify-center gap-2 w-full md:w-auto group"
                        >
                            {currentQuestionIndex < questions.length - 1
                                ? "Próxima Questão"
                                : "Finalizar Missão"}
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
