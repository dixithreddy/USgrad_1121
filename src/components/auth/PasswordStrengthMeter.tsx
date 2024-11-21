import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface PasswordStrengthMeterProps {
  score: number;
  warning?: string;
  suggestions: string[];
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  score,
  warning,
  suggestions
}) => {
  const getColor = (score: number) => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    return colors[score] || colors[0];
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full ${
              index <= score ? getColor(score) : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {warning && (
        <div className="flex items-center gap-2 text-orange-600">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">{warning}</span>
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="text-sm text-gray-600 space-y-1">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;