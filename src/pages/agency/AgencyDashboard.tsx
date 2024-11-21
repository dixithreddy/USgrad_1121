import React from 'react';
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp,
  Bell,
  Calendar,
  Clock
} from 'lucide-react';
import AgencyStats from '../../components/agency/AgencyStats';
import AgencyPerformance from '../../components/agency/AgencyPerformance';
import ApplicationsOverview from '../../components/agency/ApplicationsOverview';
import RevenueChart from '../../components/agency/RevenueChart';
import QuickActions from '../../components/agency/QuickActions';
import NotificationCenter from '../../components/agency/NotificationCenter';
import UpcomingDeadlines from '../../components/agency/UpcomingDeadlines';

const AgencyDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agency Dashboard</h1>
          <p className="mt-2 text-gray-600">Overview of your agency's performance and metrics</p>
        </div>
        <div className="flex gap-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Calendar className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AgencyStats />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Performance Overview</h2>
            <select className="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <AgencyPerformance />
        </div>

        <div className="space-y-6">
          <QuickActions />
          <NotificationCenter />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Revenue & Commission</h2>
          <RevenueChart />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <UpcomingDeadlines />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Applications</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">View all applications</button>
        </div>
        <ApplicationsOverview />
      </div>
    </div>
  );
};

export default AgencyDashboard;