import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockData = [
  { month: 'Jan', revenue: 125000, commission: 87500, expenses: 45000 },
  { month: 'Feb', revenue: 150000, commission: 105000, expenses: 48000 },
  { month: 'Mar', revenue: 180000, commission: 126000, expenses: 52000 },
  { month: 'Apr', revenue: 165000, commission: 115500, expenses: 50000 },
  { month: 'May', revenue: 195000, commission: 136500, expenses: 55000 },
  { month: 'Jun', revenue: 220000, commission: 154000, expenses: 58000 }
];

const RevenueChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Total Revenue"
            stroke="#3B82F6"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="commission"
            name="Commission"
            stroke="#10B981"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#F59E0B"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;