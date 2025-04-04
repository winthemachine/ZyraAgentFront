import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AreaChart, Area, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Button } from "../ui/button";
import CompareDropdown from "../app/CompareDropdown";
import { ArrowRight } from "lucide-react";


type Timeframe = "5h" | "24h" | "1w" | "1m" | "1y";
type MetricTab = "win-rate" | "token" | "portfolio";
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
    { name: "7h", value: 45 }
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

const PnLChart = ({
    data = defaultData,
    className,
}: PnLChartProps) => {
    const [_timeframe, _setTimeframe] = React.useState<Timeframe>("5h");
    const [activeTab, setActiveTab] = React.useState<MetricTab>("win-rate");
    const [selectedTimeframe, setSelectedTimeframe] = React.useState("24h");

    
    
    
    

    const handleTabChange = (value: MetricTab) => {
        setActiveTab(value);
        
    };

    return (
        <Card
            className={`bg-inherit text-white border border-[#9C46EB] rounded-[20px] pb-6 shadow-none ${className}`}
        >
            <CardHeader className="">
                <div className="flex items-center justify-end gap-6 font-normal mr-[30px] max-md:mr-2.5 mb-7">
                    <CompareDropdown />
                    <button className="self-stretch gap-[11px] lg:text-lg text-[rgba(156,70,235,1)] whitespace-nowrap my-auto text-xs flex items-center justify-center">
                        <span>Expand</span>
                        <ArrowRight className="w-4 h-4 text-[rgba(156,70,235,1)]" />
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <Tabs
                        defaultValue={activeTab}
                        onValueChange={(value) => handleTabChange(value as MetricTab)}
                        className="w-full"
                    >
                        <TabsList className="bg-transparent border-t rounded-none w-full border-[#2A2A35] justify-start pt-0">
                            <TabsTrigger
                                value="pnl"
                                className="text-xs text-[#777] data-[state=active]:text-[#9C46EB] data-[state=active]:bg-inherit data-[state=active]:border-t data-[state=active]:border-[#9C46EB] rounded-none"
                            >
                                PnL
                            </TabsTrigger>
                            <TabsTrigger
                                value="win-rate"
                                className="text-xs text-[#777] data-[state=active]:text-[#9C46EB] data-[state=active]:bg-inherit data-[state=active]:border-t data-[state=active]:border-[#9C46EB] rounded-none"
                            >
                                Win Rate
                            </TabsTrigger>
                            <TabsTrigger
                                value="token"
                                className="text-xs text-[#777] data-[state=active]:text-[#9C46EB] data-[state=active]:bg-inherit data-[state=active]:border-t data-[state=active]:border-[#9C46EB] rounded-none"
                            >
                                Token
                            </TabsTrigger>
                            <TabsTrigger
                                value="portfolio"
                                className="text-xs text-[#777] data-[state=active]:text-[#9C46EB] data-[state=active]:bg-inherit data-[state=active]:border-t data-[state=active]:border-[#9C46EB] rounded-none"
                            >
                                Portfolio
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>

            <CardContent className="max-lg:px-2">
                {/* Chart container */}
                <div className="h-[300px] w-full">
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
                <div className="">
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

export default PnLChart;