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
