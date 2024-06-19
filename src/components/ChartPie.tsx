'use client'
import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];

const ChartPie: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
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
