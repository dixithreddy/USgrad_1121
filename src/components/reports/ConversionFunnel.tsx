import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FunnelStage {
  stage: string;
  count: number;
  conversion_rate: number;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

const mockData: FunnelStage[] = [
  {
    stage: 'Inquiries',
    count: 1000,
    conversion_rate: 100,
    trend: { value: 12, isPositive: true }
  },
  {
    stage: 'Applications',
    count: 750,
    conversion_rate: 75,
    trend: { value: 8, isPositive: true }
  },
  {
    stage: 'Documents Submitted',
    count: 600,
    conversion_rate: 60,
    trend: { value: 5, isPositive: true }
  },
  {
    stage: 'Interviews',
    count: 450,
    conversion_rate: 45,
    trend: { value: 3, isPositive: false }
  },
  {
    stage: 'Accepted',
    count: 300,
    conversion_rate: 30,
    trend: { value: 2, isPositive: true }
  }
];

const ConversionFunnel = () => {
  return (
    <div className="space-y-4">
      {mockData.map((stage, index) => (
        <div key={stage.stage} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{stage.count}</span>
              <div className={`flex items-center text-sm ${
                stage.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stage.trend.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="ml-1">{stage.trend.value}%</span>
              </div>
            </div>
          </div>
          <div className="relative h-4">
            <div className="absolute inset-0 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{
                  width: `${stage.conversion_rate}%`,
                  opacity: 1 - (index * 0.15)
                }}
              ></div>
            </div>
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
              {stage.conversion_rate}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversionFunnel;