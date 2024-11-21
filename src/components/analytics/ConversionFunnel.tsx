import React from 'react';

interface ConversionFunnelProps {
  data: Array<{
    stage: string;
    count: number;
  }>;
}

const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ data }) => {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const percentage = (item.count / data[0].count) * 100;
        const width = (item.count / maxCount) * 100;

        return (
          <div key={item.stage} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">{item.stage}</span>
              <span className="text-gray-500">{item.count}</span>
            </div>
            <div className="relative h-8">
              <div
                className="absolute inset-y-0 left-0 bg-blue-600 rounded"
                style={{
                  width: `${width}%`,
                  opacity: 1 - index * 0.15
                }}
              ></div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600">
                {percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversionFunnel;