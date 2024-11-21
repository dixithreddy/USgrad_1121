import React from 'react';
import { Users, CheckCircle, Clock, Activity } from 'lucide-react';

const TeamStats = () => {
  const stats = [
    {
      title: 'Total Team Members',
      value: '24',
      trend: { value: 2, isPositive: true },
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Members',
      value: '22',
      trend: { value: 0, isPositive: true },
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Average Response Time',
      value: '2.8h',
      trend: { value: 15, isPositive: true },
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'Team Efficiency',
      value: '94%',
      trend: { value: 5, isPositive: true },
      icon: Activity,
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

export default TeamStats;