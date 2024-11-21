import React from 'react';

interface GeographicMapProps {
  data: Array<{
    country: string;
    students: number;
  }>;
}

const GeographicMap: React.FC<GeographicMapProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.country} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-gray-700">{item.country}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${(item.students / Math.max(...data.map(d => d.students))) * 100}%`
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-16 text-right">
              {item.students} students
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeographicMap;