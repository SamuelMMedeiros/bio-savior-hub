import React, { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { AttackData } from "../data/attackData";

interface AttackChartProps {
    data: AttackData[];
}

export function AttackChart({ data }: AttackChartProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div className="bg-white border border-green-200 rounded-lg p-2 shadow-sm text-sm">
                    <p className="font-medium text-green-900">{item.bairro}</p>
                    <p className="text-green-700">Ataques: {item.ataques}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full h-[300px] max-w-full mx-auto sm:max-w-none sm:mx-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: 10,
                            bottom: isMobile ? 0 : 20,
                        }}
                    >
                        <CartesianGrid horizontal={false} vertical={false} />
                        {!isMobile && <XAxis dataKey="bairro" />}
                        <YAxis />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "rgba(0,128,0,0.05)" }}
                        />
                        <Bar
                            dataKey="ataques"
                            name="Ataques"
                            fill="#16a34a"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {isMobile && (
                <p className="text-sm text-muted-foreground mt-2 text-center px-4">
                    Toque ou arraste o dedo sobre as barras para ver o bairro e
                    o número de ataques.
                </p>
            )}
        </div>
    );
}
