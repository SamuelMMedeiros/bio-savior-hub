/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
    ShoppingBag,
    Coins,
    Lock,
    Check,
    Layout,
    Image as ImageIcon,
    Type,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Tipos
interface ShopItem {
    id: string;
    name: string;
    description: string;
    type: "avatar" | "border" | "title";
    price: number;
    asset_value: string;
}

export function ShopPage() {
    const { user } = useAuth();

    const [coins, setCoins] = useState(0);
    const [items, setItems] = useState<ShopItem[]>([]);
    const [inventory, setInventory] = useState<string[]>([]); // IDs dos itens comprados
    const [equipped, setEquipped] = useState({
        avatar: "",
        border: "",
        title: "",
    });

    const [loading, setLoading] = useState(true);
    const [buyingId, setBuyingId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"avatar" | "border" | "title">(
        "avatar"
    );

    useEffect(() => {
        fetchShopData();
    }, [user]);

    async function fetchShopData() {
        if (!user) return;
        try {
            // 1. Perfil (Moedas e Equipados)
            const { data: profile } = await supabase
                .from("profiles")
                .select(
                    "coins, equipped_avatar, equipped_border, equipped_title"
                )
                .eq("id", user.id)
                .single();

            if (profile) {
                setCoins(profile.coins || 0);
                setEquipped({
                    avatar: profile.equipped_avatar,
                    border: profile.equipped_border,
                    title: profile.equipped_title,
                });
            }

            // 2. Itens da Loja
            const { data: shopItems } = await supabase
                .from("shop_items")
                .select("*")
                .eq("is_active", true);
            setItems(shopItems || []);

            // 3. Inventário
            const { data: userInv } = await supabase
                .from("user_inventory")
                .select("item_id")
                .eq("user_id", user.id);
            setInventory(userInv?.map((i: any) => i.item_id) || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Comprar Item
    const handleBuy = async (item: ShopItem) => {
        if (coins < item.price) return toast.error("BioCoins insuficientes!");
        setBuyingId(item.id);

        try {
            const { data, error } = await supabase.rpc("buy_item", {
                p_item_id: item.id,
            });

            if (error) throw error;

            if (data.success) {
                toast.success(
                    "Compra realizada! Item adicionado ao inventário."
                );
                setCoins((prev) => prev - item.price);
                setInventory((prev) => [...prev, item.id]);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Erro na transação.");
        } finally {
            setBuyingId(null);
        }
    };

    // Equipar Item
    const handleEquip = async (item: ShopItem) => {
        const column =
            item.type === "avatar"
                ? "equipped_avatar"
                : item.type === "border"
                ? "equipped_border"
                : "equipped_title";

        // Otimistic Update (Atualiza visualmente antes do banco)
        setEquipped((prev) => ({ ...prev, [item.type]: item.asset_value }));

        try {
            await supabase
                .from("profiles")
                .update({ [column]: item.asset_value })
                .eq("id", user?.id);
            toast.success("Item equipado!");
        } catch (err) {
            toast.error("Erro ao equipar.");
        }
    };

    // Filtrar itens pela aba
    const filteredItems = items.filter((i) => i.type === activeTab);

    if (loading)
        return (
            <div className="flex justify-center p-20">
                <Loader2 className="animate-spin text-purple-600" />
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* CABEÇALHO DA LOJA */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                        <ShoppingBag className="text-purple-600" /> Loja de
                        Recompensas
                    </h1>
                    <p className="text-slate-500">
                        Troque suas conquistas por itens exclusivos.
                    </p>
                </div>

                <div className="bg-yellow-100 border-2 border-yellow-200 px-6 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
                    <div className="bg-yellow-400 p-2 rounded-full text-white shadow-inner">
                        <Coins size={24} fill="currentColor" />
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-yellow-700 uppercase tracking-wider">
                            Saldo Atual
                        </span>
                        <span className="block text-2xl font-black text-yellow-900">
                            {coins} BioCoins
                        </span>
                    </div>
                </div>
            </div>

            {/* ABAS DE CATEGORIA */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveTab("avatar")}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                        activeTab === "avatar"
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
                            : "bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    <ImageIcon size={20} /> Avatares
                </button>
                <button
                    onClick={() => setActiveTab("border")}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                        activeTab === "border"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                            : "bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    <Layout size={20} /> Molduras
                </button>
                <button
                    onClick={() => setActiveTab("title")}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                        activeTab === "title"
                            ? "bg-green-600 text-white shadow-lg shadow-green-200"
                            : "bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    <Type size={20} /> Títulos
                </button>
            </div>

            {/* GRADE DE ITENS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => {
                    const isOwned = inventory.includes(item.id);
                    const isEquipped = equipped[item.type] === item.asset_value;
                    const canAfford = coins >= item.price;

                    return (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -5 }}
                            className={`relative bg-white rounded-2xl border-2 p-6 flex flex-col items-center text-center shadow-sm transition-all
                        ${
                            isEquipped
                                ? "border-purple-500 ring-4 ring-purple-100"
                                : "border-slate-100"
                        }
                    `}
                        >
                            {/* Visualização do Item */}
                            <div className="mb-4 h-24 w-24 flex items-center justify-center relative">
                                {item.type === "avatar" && (
                                    <img
                                        src={item.asset_value}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-full bg-slate-100 object-cover border-2 border-slate-200"
                                    />
                                )}
                                {item.type === "border" && (
                                    <div
                                        className={`w-20 h-20 rounded-full bg-slate-200 ${item.asset_value}`}
                                    ></div>
                                )}
                                {item.type === "title" && (
                                    <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-700">
                                        {item.name}
                                    </span>
                                )}

                                {isEquipped && (
                                    <div className="absolute top-0 right-0 bg-purple-600 text-white p-1 rounded-full shadow-md">
                                        <Check size={12} strokeWidth={4} />
                                    </div>
                                )}
                            </div>

                            <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">
                                {item.name}
                            </h3>
                            <p className="text-xs text-slate-500 mb-4 h-8">
                                {item.description}
                            </p>

                            {/* Ações */}
                            <div className="w-full mt-auto">
                                {isOwned ? (
                                    <button
                                        onClick={() => handleEquip(item)}
                                        disabled={isEquipped}
                                        className={`w-full py-2 rounded-xl font-bold text-sm transition-all
                                    ${
                                        isEquipped
                                            ? "bg-green-100 text-green-700 cursor-default"
                                            : "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                                    }
                                `}
                                    >
                                        {isEquipped ? "Equipado" : "Equipar"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBuy(item)}
                                        disabled={
                                            !canAfford || buyingId === item.id
                                        }
                                        className={`w-full py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                                    ${
                                        canAfford
                                            ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-md shadow-yellow-200"
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    }
                                `}
                                    >
                                        {buyingId === item.id ? (
                                            <Loader2
                                                className="animate-spin"
                                                size={16}
                                            />
                                        ) : (
                                            <>
                                                {canAfford ? (
                                                    <ShoppingBag size={16} />
                                                ) : (
                                                    <Lock size={16} />
                                                )}
                                                {item.price}
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
