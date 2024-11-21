import React from 'react';
import { 
  Users, 
  Settings, 
  Shield, 
  Activity,
  Database,
  AlertTriangle
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import SystemHealth from './SystemHealth';
import AuditLogs from './AuditLogs';
import BackupStatus from '../common/BackupStatus';

const AdminDashboard = () => {
  const { isAdmin } = usePermissions();

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Active Users',
      value: '156',
      trend: { value: 12, isPositive: true },
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'System Load',
      value: '23%',
      trend: { value: 5, isPositive: true },
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Active Sessions',
      value: '48',
      trend: { value: 8, isPositive: true },
      icon: Shield,
      color: 'text-purple-600'
    },
    {
      title: 'Database Size',
      value: '2.4 GB',
      trend: { value: 3, isPositive: false },
      icon: Database,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">System overview and management</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">{stat.title}</span>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <div
                className={`flex items-center text-sm ${
                  stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.trend.isPositive ? '↑' : '↓'} {Math.abs(stat.trend.value)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">System Health</h2>
          <SystemHealth />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Latest Backups</h2>
          <BackupStatus
            backup={{
              lastBackup: '2024-03-15 10:30 AM',
              status: 'success',
              size: '1.2 GB',
              location: 'AWS S3'
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent System Activity</h2>
        <AuditLogs />
      </div>
    </div>
  );
};

export default AdminDashboard;