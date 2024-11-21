import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface SystemService {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  uptime: string;
}

const mockServices: SystemService[] = [
  {
    name: 'API Server',
    status: 'healthy',
    latency: 45,
    uptime: '99.99%'
  },
  {
    name: 'Database',
    status: 'healthy',
    latency: 12,
    uptime: '99.95%'
  },
  {
    name: 'File Storage',
    status: 'degraded',
    latency: 150,
    uptime: '99.90%'
  },
  {
    name: 'Email Service',
    status: 'healthy',
    latency: 89,
    uptime: '99.99%'
  }
];

const SystemHealth = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'degraded':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'degraded':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <div className="space-y-4">
      {mockServices.map((service) => (
        <div
          key={service.name}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            {getStatusIcon(service.status)}
            <div>
              <h3 className="font-medium text-gray-900">{service.name}</h3>
              <p className={`text-sm ${getStatusColor(service.status)}`}>
                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Latency: {service.latency}ms</p>
            <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemHealth;