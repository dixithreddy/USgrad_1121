import React from 'react';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  TrendingUp,
  Calendar,
  FileText,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  monthlyApplications: [
    { month: 'Jan', applications: 65, conversions: 45 },
    { month: 'Feb', applications: 85, conversions: 55 },
    { month: 'Mar', applications: 120, conversions: 80 },
    { month: 'Apr', applications: 90, conversions: 65 },
    { month: 'May', applications: 110, conversions: 75 },
    { month: 'Jun', applications: 130, conversions: 95 },
  ],
  recentApplications: [
    {
      student: 'John Smith',
      program: 'MS Computer Science',
      university: 'Stanford University',
      status: 'Under Review'
    },
    {
      student: 'Emma Wilson',
      program: 'MBA',
      university: 'Harvard University',
      status: 'Submitted'
    },
    {
      student: 'Michael Chen',
      program: 'MS Data Science',
      university: 'MIT',
      status: 'Accepted'
    }
  ],
  upcomingDeadlines: [
    {
      student: 'Sarah Johnson',
      university: 'UC Berkeley',
      deadline: '2024-03-20',
      type: 'Document Submission'
    },
    {
      student: 'David Lee',
      university: 'Columbia University',
      deadline: '2024-03-25',
      type: 'Application Deadline'
    }
  ]
};

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '245',
      trend: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Universities',
      value: '18',
      trend: '+5%',
      icon: GraduationCap,
      color: 'bg-green-500'
    },
    {
      title: 'Active Agents',
      value: '32',
      trend: '+8%',
      icon: UserCheck,
      color: 'bg-purple-500'
    },
    {
      title: 'Success Rate',
      value: '68%',
      trend: '+3%',
      icon: TrendingUp,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.trend}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Application Trends</h2>
            <select className="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" name="Applications" fill="#3B82F6" />
                <Bar dataKey="conversions" name="Conversions" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-4">
            {mockData.upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{deadline.student}</p>
                  <p className="text-sm text-gray-600">{deadline.university}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {deadline.type} - {new Date(deadline.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Applications</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">View all applications</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockData.recentApplications.map((app, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.university}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;