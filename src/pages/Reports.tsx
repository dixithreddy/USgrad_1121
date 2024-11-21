import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Map, 
  Users,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import SuccessRateChart from '../components/reports/SuccessRateChart';
import UniversityDistribution from '../components/reports/UniversityDistribution';
import ProgramPopularity from '../components/reports/ProgramPopularity';
import GeographicPerformance from '../components/reports/GeographicPerformance';
import TeamPerformance from '../components/reports/TeamPerformance';
import RevenueChart from '../components/reports/RevenueChart';
import ConversionFunnel from '../components/reports/ConversionFunnel';
import ReportFilters from '../components/reports/ReportFilters';

const Reports = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState('last_30_days');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="last_year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {showFilters && <ReportFilters onClose={() => setShowFilters(false)} />}

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Success Rate Analysis</h2>
          <SuccessRateChart />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">University Distribution</h2>
          <UniversityDistribution />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Program Popularity</h2>
          <ProgramPopularity />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Geographic Performance</h2>
          <GeographicPerformance />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Revenue Trends</h2>
          <RevenueChart />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Conversion Analytics</h2>
          <ConversionFunnel />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Team Performance</h2>
        <TeamPerformance />
      </div>
    </div>
  );
};

export default Reports;