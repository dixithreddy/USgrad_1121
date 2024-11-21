import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Globe,
  DollarSign
} from 'lucide-react';

const mockData = {
  monthlyApplications: [
    { month: 'Jan', applications: 65, conversions: 45 },
    { month: 'Feb', applications: 85, conversions: 55 },
    { month: 'Mar', applications: 120, conversions: 80 },
    { month: 'Apr', applications: 90, conversions: 65 },
    { month: 'May', applications: 110, conversions: 75 },
    { month: 'Jun', applications: 130, conversions: 95 },
  ],
  programDistribution: [
    { name: 'Computer Science', value: 35 },
    { name: 'Engineering', value: 25 },
    { name: 'Business', value: 20 },
    { name: 'Data Science', value: 15 },
    { name: 'Other', value: 5 },
  ],
  geographicData: [
    { country: 'China', students: 150 },
    { country: 'India', students: 120 },
    { country: 'Brazil', students: 45 },
    { country: 'Nigeria', students: 30 },
    { country: 'Vietnam', students: 25 },
  ],
  conversionStages: [
    { stage: 'Inquiries', count: 1000 },
    { stage: 'Applications', count: 600 },
    { stage: 'Interviews', count: 400 },
    { stage: 'Offers', count: 250 },
    { stage: 'Enrollments', count: 180 },
  ]
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Comprehensive insights into recruitment performance</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Total Applications</span>
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">1,245</div>
          <div className="text-sm text-green-600 mt-2">↑ 12% vs last month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Active Students</span>
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold">856</div>
          <div className="text-sm text-green-600 mt-2">↑ 8% vs last month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Partner Universities</span>
            <GraduationCap className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold">32</div>
          <div className="text-sm text-green-600 mt-2">↑ 2 new this month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Revenue Generated</span>
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold">$425,800</div>
          <div className="text-sm text-green-600 mt-2">↑ 15% vs last month</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Application Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#3B82F6" />
                <Line type="monotone" dataKey="conversions" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Program Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.programDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {mockData.programDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Geographic Distribution</h2>
          </div>
          <div className="space-y-4">
            {mockData.geographicData.map((item) => (
              <div key={item.country} className="flex items-center justify-between">
                <span className="text-gray-600">{item.country}</span>
                <div className="flex items-center gap-4">
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(item.students / Math.max(...mockData.geographicData.map(d => d.students))) * 100}%`
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
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Conversion Funnel</h2>
          <div className="space-y-4">
            {mockData.conversionStages.map((stage, index) => {
              const percentage = (stage.count / mockData.conversionStages[0].count) * 100;
              return (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{stage.stage}</span>
                    <span className="text-gray-900 font-medium">{stage.count}</span>
                  </div>
                  <div className="relative h-2">
                    <div className="absolute inset-0 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${percentage}%`,
                          opacity: 1 - (index * 0.15)
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;