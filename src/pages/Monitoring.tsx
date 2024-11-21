import React from 'react';
import { Activity, Shield, FileText } from 'lucide-react';
import PerformanceMetrics from '../components/monitoring/PerformanceMetrics';
import AuditLog from '../components/monitoring/AuditLog';
import SecurityEvents from '../components/monitoring/SecurityEvents';

const Monitoring = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
          <p className="mt-2 text-gray-600">Monitor system performance, security, and user activity</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">System Status</h2>
            <Activity className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">CPU Usage</span>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Memory Usage</span>
                <span className="text-sm font-medium text-gray-900">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Disk Usage</span>
                <span className="text-sm font-medium text-gray-900">28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Security Overview</h2>
            <Shield className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Active Users</span>
              <span className="text-sm font-medium text-gray-900">124</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Failed Login Attempts</span>
              <span className="text-sm font-medium text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Security Alerts</span>
              <span className="text-sm font-medium text-gray-900">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Activity Summary</h2>
            <FileText className="w-6 h-6 text-purple-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Requests</span>
              <span className="text-sm font-medium text-gray-900">1,245</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Average Response Time</span>
              <span className="text-sm font-medium text-gray-900">235ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Error Rate</span>
              <span className="text-sm font-medium text-gray-900">0.12%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <PerformanceMetrics />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <SecurityEvents events={[]} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <AuditLog events={[]} />
      </div>
    </div>
  );
};

export default Monitoring;