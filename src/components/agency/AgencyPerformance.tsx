import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { month: 'Jan', applications: 45, conversions: 35 },
  { month: 'Feb', applications: 52, conversions: 42 },
  { month: 'Mar', applications: 48, conversions: 38 },
  { month: 'Apr', applications: 65, conversions: 52 },
  { month: 'May', applications: 53, conversions: 45 },
  { month: 'Jun', applications: 59, conversions: 48 }
];

const AgencyPerformance = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="applications" name="Applications" fill="#3B82F6" />
          <Bar dataKey="conversions" name="Successful Conversions" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgencyPerformance;