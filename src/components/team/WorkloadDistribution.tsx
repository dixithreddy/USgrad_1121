import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TeamMemberWorkload {
  name: string;
  tasks: number;
  capacity: number;
}

const mockData: TeamMemberWorkload[] = [
  { name: 'John S.', tasks: 12, capacity: 15 },
  { name: 'Sarah J.', tasks: 8, capacity: 12 },
  { name: 'Mike W.', tasks: 10, capacity: 12 },
  { name: 'Emma L.', tasks: 6, capacity: 10 },
  { name: 'David C.', tasks: 9, capacity: 12 }
];

const WorkloadDistribution = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={mockData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tasks" name="Current Tasks" fill="#3B82F6" />
          <Bar dataKey="capacity" name="Capacity" fill="#E5E7EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkloadDistribution;