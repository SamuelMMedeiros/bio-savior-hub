import React, { useState } from "react";
import { AttackChart } from "./AttackChart";
import { AttackMap } from "./AttackMap";
import { ATTACK_DATA, CITY_PATOS } from "../data/attackData";

export function AttackDashboard() {
    const [selectedBairro, setSelectedBairro] = useState(CITY_PATOS);

    // Atualiza o mapa ao clicar em uma barra
    const handleBairroClick = (bairro: string) => {
        const bairroData = ATTACK_DATA.find((item) => item.bairro === bairro);
        if (bairroData) setSelectedBairro(bairroData);
    };

    return (
        /*md:flex-row - exibe o mapa e o gráfico lado a lado em telas grandes */
        <div className="flex flex-col gap-6 w-full">
            <div className="min-h-[400px]">
                <AttackChart
                    data={ATTACK_DATA}
                    onBairroClick={handleBairroClick}
                />
            </div>
            <div className="h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow">
                <AttackMap center={selectedBairro} />
            </div>
        </div>
    );
}
