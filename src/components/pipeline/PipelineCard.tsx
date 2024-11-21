import React from 'react';
import { Calendar, Flag } from 'lucide-react';
import { PipelineItem } from '../../types';
import { format } from 'date-fns';

interface PipelineCardProps {
  item: PipelineItem;
}

const PipelineCard: React.FC<PipelineCardProps> = ({ item }) => {
  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 cursor-move hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900">{item.studentName}</h4>
        <Flag className={`w-4 h-4 ${getPriorityColor(item.priority)}`} />
      </div>
      <div className="text-sm text-gray-500 mb-2">
        {item.targetUniversity} • {item.program}
      </div>
      <div className="text-xs text-gray-400">{item.country}</div>
      <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Due {format(new Date(item.deadline), 'MMM d')}</span>
        </div>
        <div>
          Last updated {format(new Date(item.lastActivity), 'MMM d')}
        </div>
      </div>
    </div>
  );
};

export default PipelineCard;