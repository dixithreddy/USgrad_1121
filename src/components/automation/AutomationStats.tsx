import React from 'react';
import { Clock, CheckCircle, AlertCircle, Activity } from 'lucide-react';

const AutomationStats = () => {
  const stats = [
    {
      title: 'Active Automations',
      value: '12',
      trend: { value: 2, isPositive: true },
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      title: 'Tasks Completed',
      value: '1,458',
      trend: { value: 15, isPositive: true },
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Failed Tasks',
      value: '23',
      trend: { value: 5, isPositive: false },
      icon: AlertCircle,
      color: 'text-red-600'
    },
    {
      title: 'Scheduled Tasks',
      value: '45',
      trend: { value: 8, isPositive: true },
      icon: Clock,
      color: 'text-yellow-600'
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

export default AutomationStats;