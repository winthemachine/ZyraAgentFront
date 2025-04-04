import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AreaChart, Area, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";


type Timeframe = "5h" | "24h" | "1w" | "1m" | "1y";
const timeframes = ["5h", "24h", "1w", "1m", "1y"];

interface ChartDataPoint {
    name: string;
    value: number;
}

interface PnLChartProps {
    data?: ChartDataPoint[];
    winRate?: number;
    comparisonText?: string;
    className?: string;
}


const defaultData: ChartDataPoint[] = [
    { name: "1h", value: 12 },
    { name: "2h", value: 78 },
    { name: "3h", value: 64 },
    { name: "4h", value: 90 },
    { name: "5h", value: 53 },
    { name: "6h", value: 67 },
    { name: "7h", value: 45 },
    { name: "8h", value: 89 },
    { name: "9h", value: 74 }
];



const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-border bg-[#1B1B23] p-3 text-white shadow-sm">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-base font-semibold text-[#A39DFF]">
                    {payload[0].value}%
                </p>
            </div>
        );
    }

    return null;
};

const PriceChart = ({
    data = defaultData,
    className,
}: PnLChartProps) => {
    const [_timeframe, _setTimeframe] = React.useState<Timeframe>("5h");
    const [selectedTimeframe, setSelectedTimeframe] = React.useState("24h");

    return (
        <Card
            className={`bg-inherit text-white border border-[#9C46EB] rounded-[20px] pb-6 shadow-none ${className}`}
        >
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="">
                    Price Chat
                </div>
                <Link to={'/top-holders'} className="text-[#9C46EB] text-end mb-6">View all</Link>
            </CardHeader>

           <CardContent className="max-lg:px-2">
                {/* Chart container */}
                <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#2A2A35"
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                domain={[0, 100]}
                                tickCount={5}
                                tick={{ fill: "#fff", fontSize: 18 }}
                                orientation="right"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D8B6F9" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#D8B6F9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#D8B6F9"
                                strokeWidth={2}
                                fill="url(#gradient)"
                            />

                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="mb-3">
                    <div className="flex space-x-2 border float-right mt-4 border-[#484848] rounded-md w-fit p-1">
                        {timeframes.map((timeframe) => (
                            <Button
                                key={timeframe}
                                onClick={() => setSelectedTimeframe(timeframe)}
                                className={`w-[20px] h-[20px] text-xs transition-colors ${selectedTimeframe === timeframe
                                    ? "bg-[#AEACAC] text-[#050510]"
                                    : "bg-transparent text-[#999]"
                                    }`}
                            >
                                {timeframe}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PriceChart;