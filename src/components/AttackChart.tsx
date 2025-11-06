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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div className="bg-white border border-green-200 rounded-lg p-2 shadow-sm text-sm">
                    <p className="font-medium text-green-900">{item.bairro}</p>
                    <p className="text-green-600">Ataques: {item.ataques}</p>
                </div>
            );
        }
        return null;
    };

    return (
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
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        content={<CustomTooltip />}
                        wrapperStyle={{
                            visibility: isMobile ? "visible" : "hidden",
                            pointerEvents: "none",
                        }}
                    />
                    <Bar
                        dataKey="ataques"
                        fill="#4f46e5"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
