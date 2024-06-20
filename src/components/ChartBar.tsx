'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

interface DataItem {
  name: string;
  unit: number;
}

const ChartBar: React.FC<{ data: DataItem[] }> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis label={{ value: 'Jumlah ruas', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="unit" fill="#3B5CF0">
            <LabelList dataKey="unit" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBar;
