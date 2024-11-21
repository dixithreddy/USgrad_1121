import React from 'react';
import { DollarSign, TrendingUp, CreditCard, Wallet } from 'lucide-react';

const FinancialStats = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$245,000',
      trend: { value: 12, isPositive: true },
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Outstanding Invoices',
      value: '$32,500',
      trend: { value: 8, isPositive: false },
      icon: CreditCard,
      color: 'text-yellow-600'
    },
    {
      title: 'Paid Commissions',
      value: '$85,750',
      trend: { value: 15, isPositive: true },
      icon: Wallet,
      color: 'text-blue-600'
    },
    {
      title: 'Average Deal Size',
      value: '$12,250',
      trend: { value: 5, isPositive: true },
      icon: TrendingUp,
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

export default FinancialStats;