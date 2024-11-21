import React from 'react';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';

interface Communication {
  id: string;
  type: 'email' | 'chat' | 'call';
  sender: string;
  recipient: string;
  subject?: string;
  content: string;
  timestamp: string;
}

const mockCommunications: Communication[] = [
  {
    id: '1',
    type: 'email',
    sender: 'Sarah Johnson',
    recipient: 'John Smith',
    subject: 'Application Status Update',
    content: 'Your application has been received and is currently under review.',
    timestamp: '2024-03-15T10:30:00'
  },
  {
    id: '2',
    type: 'chat',
    sender: 'John Smith',
    recipient: 'Sarah Johnson',
    content: 'When can I expect to hear back about my application?',
    timestamp: '2024-03-14T15:45:00'
  },
  {
    id: '3',
    type: 'call',
    sender: 'Sarah Johnson',
    recipient: 'John Smith',
    content: 'Discussed application requirements and next steps',
    timestamp: '2024-03-13T11:00:00'
  }
];

const CommunicationLog = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5" />;
      case 'call':
        return <Phone className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Communication History</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Send className="w-4 h-4" />
          New Message
        </button>
      </div>

      <div className="space-y-4">
        {mockCommunications.map((comm) => (
          <div
            key={comm.id}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{getIcon(comm.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    {comm.subject && (
                      <p className="font-medium text-gray-900">{comm.subject}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {comm.sender} → {comm.recipient}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(comm.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{comm.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationLog;