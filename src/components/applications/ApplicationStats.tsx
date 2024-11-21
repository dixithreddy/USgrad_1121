import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ApplicationStats = () => {
  const stats = [
    {
      title: 'Total Applications',
      value: '156',
      trend: { value: 12, isPositive: true },
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Under Review',
      value: '45',
      trend: { value: 8, isPositive: true },
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'Accepted',
      value: '89',
      trend: { value: 15, isPositive: true },
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Rejected',
      value: '22',
      trend: { value: 3, isPositive: false },
      icon: AlertCircle,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">{stat.title}</span>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            <div
              className={`flex items-center text-sm ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.trend.isPositive ? '↑' : '↓'} {Math.abs(stat.trend.value)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStats;