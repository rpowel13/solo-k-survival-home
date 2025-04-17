
import React from 'react';
import { formatCurrency } from '@/utils/metalPriceUtils';
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface YearlyGrowth {
  year: number;
  balance: number;
  contribution: number;
  growth: number;
}

interface RetirementChartProps {
  projectionData: YearlyGrowth[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3 border border-gray-200 shadow-lg rounded-md">
        <p className="font-bold">Year {label}</p>
        <p className="text-[#6E59A5]">
          Balance: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Annual Growth: {formatCurrency(payload[0].payload.growth)}
        </p>
      </div>
    );
  }
  return null;
};

export const RetirementChart = ({ projectionData }: RetirementChartProps) => {
  return (
    <div className="h-96 bg-white p-4 rounded-lg shadow-inner mb-264">
      <h3 className="text-lg font-semibold mb-4">Growth Projection Chart</h3>
      <div className="h-80">
        <ChartContainer config={{
          balance: { label: "Balance", color: "#6E59A5" },
          contribution: { label: "Contribution", color: "#33C3F0" },
          growth: { label: "Growth", color: "#F97316" }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={projectionData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Years', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
                label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="balance" 
                name="Balance" 
                stackId="1" 
                stroke="#6E59A5" 
                fill="#6E59A5" 
                fillOpacity={0.6} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
