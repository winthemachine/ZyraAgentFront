"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface DistributionData {
  name: string
  value: number
  color: string
}

export default function DistributionChart() {
  const [data] = useState<DistributionData[]>([
    { name: "ETH", value: 25.2, color: "#9c46eb" },
    { name: "ETH", value: 21.2, color: "#3676ef" },
    { name: "ETH", value: 15.5, color: "#f7a81e" },
    { name: "ETH", value: 10, color: "#126249" },
    { name: "ETH", value: 7.2, color: "#2f0555" },
    { name: "ETH", value: 20.9, color: "#26a17b" },
  ])

  return (
    <Card className="w-full max-w-[469px] bg-inherit border-[#9C46EB] rounded-3xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[#ffffff] text-2xl font-medium">Distribution</CardTitle>
        <a href="#" className="text-[#9c46eb] text-lg hover:underline">
          View all
        </a>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center justify-between pt-6 pb-8">
        <div className="w-[186px] h-[186px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={90} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="gap-4 mt-8 md:mt-0 grid lg:grid-cols-1 grid-cols-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }}></div>
              <span className="text-[#ffffff] text-lg">{item.name}</span>
              <span className="text-[#ffffff] text-lg ml-2">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}