import React, { useEffect, useState } from 'react';
import { performanceMonitor } from '../../utils/monitoring';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricData {
  name: string;
  value: number;
}

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);

  useEffect(() => {
    // Update metrics every 5 seconds
    const interval = setInterval(() => {
      performanceMonitor.recordMemoryUsage();
      // Add other periodic metrics here
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700">{metric.name}</h3>
            <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;