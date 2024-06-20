'use client'
import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface DataItem {
  name: string;
  unit: number;
}

const ChartPie: React.FC<{ data: DataItem[] }> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="unit"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            fill="#3B5CF0"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPie;
