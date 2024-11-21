import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { PipelineStage, PipelineItem } from '../../types';

interface PipelineStatsProps {
  pipeline: Record<PipelineStage, PipelineItem[]>;
}

const PipelineStats: React.FC<PipelineStatsProps> = ({ pipeline }) => {
  const totalApplications = Object.values(pipeline).reduce(
    (sum, items) => sum + items.length,
    0
  );

  const stats = [
    {
      label: 'Total Applications',
      value: totalApplications,
      trend: { value: 12, isPositive: true }
    },
    {
      label: 'Conversion Rate',
      value: '68%',
      trend: { value: 5, isPositive: true }
    },
    {
      label: 'Avg. Processing Time',
      value: '18 days',
      trend: { value: 2, isPositive: false }
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
          <div className="flex items-end justify-between">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div
              className={`flex items-center text-sm ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.trend.isPositive ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{stat.trend.value}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PipelineStats;