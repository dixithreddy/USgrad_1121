import React from 'react';
import { Users, DollarSign, FileText, TrendingUp, CheckCircle } from 'lucide-react';

const AgencyStats = () => {
  const stats = [
    {
      title: 'Total Applications',
      value: '156',
      subValue: '↑ 12% vs last month',
      trend: { value: 12, isPositive: true },
      icon: FileText,
      color: 'text-blue-600',
      metrics: [
        { label: 'Submitted', value: '124' },
        { label: 'In Progress', value: '32' }
      ]
    },
    {
      title: 'Success Rate',
      value: '78%',
      subValue: '↑ 5% vs last month',
      trend: { value: 5, isPositive: true },
      icon: CheckCircle,
      color: 'text-green-600',
      metrics: [
        { label: 'Accepted', value: '98' },
        { label: 'Pending', value: '28' }
      ]
    },
    {
      title: 'Revenue Generated',
      value: '$245,000',
      subValue: '↑ 15% vs last month',
      trend: { value: 15, isPositive: true },
      icon: DollarSign,
      color: 'text-purple-600',
      metrics: [
        { label: 'This Month', value: '$45,000' },
        { label: 'Last Month', value: '$38,000' }
      ]
    },
    {
      title: 'Commission Earned',
      value: '$85,750',
      subValue: '↑ 8% vs last month',
      trend: { value: 8, isPositive: true },
      icon: TrendingUp,
      color: 'text-yellow-600',
      metrics: [
        { label: 'This Month', value: '$15,750' },
        { label: 'Pending', value: '$12,500' }
      ]
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
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className={`text-sm ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.subValue}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              {stat.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-sm text-gray-500">{metric.label}</div>
                  <div className="text-base font-semibold text-gray-900">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgencyStats;