import React from 'react';
import { format } from 'date-fns';
import { MapPin, Monitor, Clock } from 'lucide-react';

interface LoginActivity {
  id: string;
  timestamp: string;
  ipAddress: string;
  location: {
    country: string;
    city: string;
  };
  userAgent: string;
  status: 'success' | 'failed';
}

interface LoginActivityProps {
  activities: LoginActivity[];
}

const LoginActivity: React.FC<LoginActivityProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Login Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {format(new Date(activity.timestamp), 'PPpp')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {activity.location.city}, {activity.location.country}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {activity.userAgent}
                  </span>
                </div>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginActivity;