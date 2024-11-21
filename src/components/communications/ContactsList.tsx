import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  type: 'student' | 'agent' | 'university';
  status: 'online' | 'offline';
  lastMessage: string;
  unread: number;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    type: 'student',
    status: 'online',
    lastMessage: 'Thanks for the update!',
    unread: 2
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    type: 'agent',
    status: 'offline',
    lastMessage: 'I'll send the documents tomorrow',
    unread: 0
  },
  {
    id: '3',
    name: 'Stanford University',
    type: 'university',
    status: 'online',
    lastMessage: 'Application received',
    unread: 1
  }
];

const ContactsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'student' | 'agent' | 'university'>('all');

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || contact.type === filter)
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="flex space-x-2">
          {['all', 'student', 'agent', 'university'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === type
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                {contact.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
                  {contact.unread > 0 && (
                    <span className="ml-2 bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {contact.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsList;