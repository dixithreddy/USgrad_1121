import React from 'react';
import { Globe } from 'lucide-react';

interface RegionData {
  region: string;
  applications: number;
  success_rate: number;
  revenue: number;
}

const mockData: RegionData[] = [
  {
    region: 'Asia Pacific',
    applications: 450,
    success_rate: 82,
    revenue: 850000
  },
  {
    region: 'North America',
    applications: 320,
    success_rate: 78,
    revenue: 620000
  },
  {
    region: 'Europe',
    applications: 280,
    success_rate: 75,
    revenue: 520000
  },
  {
    region: 'South America',
    applications: 180,
    success_rate: 70,
    revenue: 320000
  },
  {
    region: 'Africa',
    applications: 120,
    success_rate: 68,
    revenue: 220000
  }
];

const GeographicPerformance = () => {
  return (
    <div className="space-y-4">
      {mockData.map((region) => (
        <div key={region.region} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">{region.region}</h3>
                <p className="text-sm text-gray-500">
                  {region.applications} applications
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                ${region.revenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                {region.success_rate}% success rate
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${region.success_rate}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeographicPerformance;