import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { program: 'Computer Science', applications: 250, acceptance: 180 },
  { program: 'Business Admin', applications: 200, acceptance: 140 },
  { program: 'Data Science', applications: 180, acceptance: 120 },
  { program: 'Engineering', applications: 150, acceptance: 100 },
  { program: 'Finance', applications: 120, acceptance: 80 }
];

const ProgramPopularity = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="program" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="applications" name="Applications" fill="#3B82F6" />
          <Bar dataKey="acceptance" name="Acceptances" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgramPopularity;