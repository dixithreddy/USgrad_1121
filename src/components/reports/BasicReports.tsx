import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  applications: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 48 },
    { month: 'Apr', count: 65 },
    { month: 'May', count: 53 },
    { month: 'Jun', count: 59 }
  ],
  statusDistribution: {
    pending: 25,
    inProgress: 40,
    completed: 35
  }
};

const BasicReports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Application Trends</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.applications}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Application Status Distribution</h2>
        <div className="grid grid-cols-3 gap-6">
          {Object.entries(mockData.statusDistribution).map(([status, count]) => (
            <div key={status} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-2 capitalize">{status}</div>
              <div className="text-2xl font-bold">{count}%</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${count}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicReports;