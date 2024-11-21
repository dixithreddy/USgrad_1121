import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockData = [
  { month: 'Jan', applications: 100, accepted: 75, success_rate: 75 },
  { month: 'Feb', applications: 120, accepted: 95, success_rate: 79 },
  { month: 'Mar', applications: 150, accepted: 125, success_rate: 83 },
  { month: 'Apr', applications: 130, accepted: 110, success_rate: 85 },
  { month: 'May', applications: 160, accepted: 140, success_rate: 88 },
  { month: 'Jun', applications: 180, accepted: 160, success_rate: 89 }
];

const SuccessRateChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="applications"
            name="Total Applications"
            stroke="#3B82F6"
            strokeWidth={2}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="accepted"
            name="Accepted"
            stroke="#10B981"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="success_rate"
            name="Success Rate (%)"
            stroke="#F59E0B"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SuccessRateChart;