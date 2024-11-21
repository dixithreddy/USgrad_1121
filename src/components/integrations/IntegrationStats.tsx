import React from 'react';
import { Zap, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const IntegrationStats = () => {
  const stats = [
    {
      title: 'Active Integrations',
      value: '8',
      trend: { value: 2, isPositive: true },
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      title: 'Connected Services',
      value: '12',
      trend: { value: 3, isPositive: true },
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Failed Connections',
      value: '2',
      trend: { value: 1, isPositive: false },
      icon: XCircle,
      color: 'text-red-600'
    },
    {
      title: 'API Calls Today',
      value: '2,458',
      trend: { value: 15, isPositive: true },
      icon: RefreshCw,
      color: 'text-purple-600'
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