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
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                data={data}
                margin={{top: 10, right: 10, bottom: 10, left: 10}}>
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
