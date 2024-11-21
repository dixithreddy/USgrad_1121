import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  student: string;
  type: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review Application Documents',
    dueDate: '2024-03-20',
    priority: 'high',
    student: 'John Smith',
    type: 'Document Review'
  },
  {
    id: '2',
    title: 'Schedule Interview Preparation',
    dueDate: '2024-03-22',
    priority: 'medium',
    student: 'Emma Wilson',
    type: 'Interview'
  }
];

const TasksList = () => {
  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <div className="space-y-4">
      {mockTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-start gap-4">
            <Clock className={`w-5 h-5 mt-1 ${getPriorityColor(task.priority)}`} />
            <div>
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-500">Student: {task.student}</p>
              <p className="text-sm text-gray-500">Type: {task.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </p>
            </div>
            <button className="text-green-600 hover:text-green-700">
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;