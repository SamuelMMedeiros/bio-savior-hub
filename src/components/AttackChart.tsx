// src/components/AttackChart.tsx
import React from "react";
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
    return (
        <div className="w-full h-[300px] max-w-full mx-auto sm:max-w-none sm:mx-0">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid horizontal={false} vertical={false} />
                    <XAxis dataKey="bairro" />
                    <YAxis />
                    <Tooltip />
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
