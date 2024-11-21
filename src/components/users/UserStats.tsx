import React from 'react';
import { Users, UserCheck, UserX, Shield } from 'lucide-react';

const UserStats = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '45',
      trend: { value: 12, isPositive: true },
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Users',
      value: '38',
      trend: { value: 8, isPositive: true },
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      title: 'Inactive Users',
      value: '7',
      trend: { value: 2, isPositive: false },
      icon: UserX,
      color: 'text-red-600'
    },
    {
      title: 'User Roles',
      value: '6',
      trend: { value: 1, isPositive: true },
      icon: Shield,
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

export default UserStats;