import React from 'react';
import { Mail, MessageSquare, Phone, FileText } from 'lucide-react';

interface Communication {
  id: string;
  type: 'email' | 'chat' | 'call' | 'document';
  contact: string;
  subject: string;
  preview: string;
  date: string;
  status: 'sent' | 'received' | 'missed';
}

interface CommunicationHistoryProps {
  type: 'email' | 'all';
}

const mockCommunications: Communication[] = [
  {
    id: '1',
    type: 'email',
    contact: 'John Smith',
    subject: 'Application Status Update',
    preview: 'Your application has been successfully submitted...',
    date: '2024-03-10 14:30',
    status: 'sent'
  },
  {
    id: '2',
    type: 'chat',
    contact: 'Sarah Johnson',
    subject: 'Visa Documentation',
    preview: 'Can you please provide the list of required documents...',
    date: '2024-03-10 13:15',
    status: 'received'
  },
  {
    id: '3',
    type: 'call',
    contact: 'Mike Wilson',
    subject: 'Interview Preparation',
    preview: 'Discussed interview preparation tips and requirements',
    date: '2024-03-10 11:45',
    status: 'missed'
  }
];

const CommunicationHistory: React.FC<CommunicationHistoryProps> = ({ type }) => {
  const filteredCommunications = type === 'email' 
    ? mockCommunications.filter(comm => comm.type === 'email')
    : mockCommunications;

  const getIcon = (commType: string) => {
    const icons = {
      email: <Mail className="w-5 h-5" />,
      chat: <MessageSquare className="w-5 h-5" />,
      call: <Phone className="w-5 h-5" />,
      document: <FileText className="w-5 h-5" />
    };
    return icons[commType as keyof typeof icons];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      sent: 'text-green-600',
      received: 'text-blue-600',
      missed: 'text-red-600'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="divide-y">
        {filteredCommunications.map((comm) => (
          <div
            key={comm.id}
            className="p-4 hover:bg-gray-50 cursor-pointer flex items-start gap-4"
          >
            <div className={`${getStatusColor(comm.status)} mt-1`}>
              {getIcon(comm.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{comm.contact}</h4>
                  <p className="text-sm font-medium text-gray-700">{comm.subject}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                  {new Date(comm.date).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 truncate">{comm.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationHistory;