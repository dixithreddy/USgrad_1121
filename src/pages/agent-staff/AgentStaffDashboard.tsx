import React from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock 
} from 'lucide-react';
import AssignedStudentsList from '../../components/agent-staff/AssignedStudentsList';
import ApplicationsOverview from '../../components/agent-staff/ApplicationsOverview';
import TasksList from '../../components/agent-staff/TasksList';

const AgentStaffDashboard = () => {
  const stats = [
    {
      title: 'Assigned Students',
      value: '12',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Applications',
      value: '8',
      icon: FileText,
      color: 'text-yellow-600'
    },
    {
      title: 'Completed Applications',
      value: '45',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Pending Tasks',
      value: '5',
      icon: Clock,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your assigned students and applications</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">{stat.title}</span>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
          <ApplicationsOverview />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
          <TasksList />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Assigned Students</h2>
        <AssignedStudentsList />
      </div>
    </div>
  );
};

export default AgentStaffDashboard;