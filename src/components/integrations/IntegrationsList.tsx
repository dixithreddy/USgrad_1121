import React from 'react';
import { 
  Mail, 
  Calendar, 
  FileText, 
  CreditCard, 
  MessageSquare,
  Settings,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: 'email' | 'calendar' | 'storage' | 'payment' | 'communication';
  provider: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
  details: {
    account?: string;
    apiKey?: string;
    webhook?: string;
  };
}

const mockIntegrations: Integration[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    type: 'email',
    provider: 'Google',
    status: 'connected',
    lastSync: '2024-03-15 10:30:00',
    details: {
      account: 'admin@company.com'
    }
  },
  {
    id: 'gcal',
    name: 'Google Calendar',
    type: 'calendar',
    provider: 'Google',
    status: 'connected',
    lastSync: '2024-03-15 10:30:00',
    details: {
      account: 'admin@company.com'
    }
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    type: 'storage',
    provider: 'Dropbox',
    status: 'disconnected',
    details: {}
  },
  {
    id: 'stripe',
    name: 'Stripe',
    type: 'payment',
    provider: 'Stripe',
    status: 'connected',
    lastSync: '2024-03-15 10:00:00',
    details: {
      apiKey: '****sk_test',
      webhook: 'https://api.example.com/webhooks/stripe'
    }
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    type: 'communication',
    provider: 'Meta',
    status: 'connected',
    lastSync: '2024-03-15 10:15:00',
    details: {
      account: '+1234567890'
    }
  }
];

interface IntegrationsListProps {
  onConfigureIntegration: (id: string) => void;
}

const IntegrationsList: React.FC<IntegrationsListProps> = ({ onConfigureIntegration }) => {
  const getTypeIcon = (type: string) => {
    const icons = {
      email: Mail,
      calendar: Calendar,
      storage: FileText,
      payment: CreditCard,
      communication: MessageSquare
    };
    const Icon = icons[type as keyof typeof icons];
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {mockIntegrations.map((integration) => (
        <div 
          key={integration.id}
          className="bg-white border rounded-lg p-6 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                integration.status === 'connected' ? 'bg-blue-50' : 'bg-gray-50'
              }`}>
                {getTypeIcon(integration.type)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
                <p className="text-sm text-gray-500">Provider: {integration.provider}</p>
                {integration.details.account && (
                  <p className="text-sm text-gray-500">Account: {integration.details.account}</p>
                )}
                {integration.lastSync && (
                  <p className="text-sm text-gray-500">
                    Last synced: {new Date(integration.lastSync).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {integration.status === 'connected' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                )}
                <span className={`text-sm font-medium ${
                  integration.status === 'connected' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>
              <button
                onClick={() => onConfigureIntegration(integration.id)}
                className="text-gray-400 hover:text-gray-500"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};