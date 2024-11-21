import React from 'react';
import { MessageSquare, Mail, Bell, Clock } from 'lucide-react';

const CommunicationStats = () => {
  const stats = [
    {
      title: 'Active Conversations',
      value: '28',
      trend: { value: 12, isPositive: true },
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      title: 'Emails Sent Today',
      value: '156',
      trend: { value: 8, isPositive: true },
      icon: Mail,
      color: 'text-green-600'
    },
    {
      title: 'Pending Notifications',
      value: '12',
      trend: { value: 3, isPositive: false },
      icon: Bell,
      color: 'text-yellow-600'
    },
    {
      title: 'Avg. Response Time',
      value: '2.5h',
      trend: { value: 15, isPositive: true },
      icon: Clock,
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

export default CommunicationStats;