import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { month: 'Jan', revenue: 35000, commission: 24500 },
  { month: 'Feb', revenue: 42000, commission: 29400 },
  { month: 'Mar', revenue: 38000, commission: 26600 },
  { month: 'Apr', revenue: 52000, commission: 36400 },
  { month: 'May', revenue: 45000, commission: 31500 },
  { month: 'Jun', revenue: 48000, commission: 33600 }
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;