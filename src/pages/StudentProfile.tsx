import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  MessageSquare, 
  Clock,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit2
} from 'lucide-react';
import StudentTimeline from '../components/students/StudentTimeline';
import DocumentRepository from '../components/students/DocumentRepository';
import CommunicationLog from '../components/students/CommunicationLog';
import ApplicationHistory from '../components/students/ApplicationHistory';
import StudentStatusCard from '../components/students/StudentStatusCard';

const mockStudent = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  country: 'United States',
  status: 'Active',
  targetUniversity: 'Stanford University',
  targetProgram: 'MS Computer Science',
  applicationProgress: 75,
  assignedAgent: 'Sarah Johnson',
  lastActivity: '2024-03-15T10:30:00'
};

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'communications' | 'applications'>('timeline');

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'communications', label: 'Communications', icon: MessageSquare },
    { id: 'applications', label: 'Applications', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{mockStudent.name}</h1>
          <p className="mt-2 text-gray-600">Student Profile</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{mockStudent.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{mockStudent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{mockStudent.country}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Target University</span>
                  <p className="text-gray-900">{mockStudent.targetUniversity}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Target Program</span>
                  <p className="text-gray-900">{mockStudent.targetProgram}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Assigned Agent</span>
                  <p className="text-gray-900">{mockStudent.assignedAgent}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b px-4">
              <div className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-4 flex items-center gap-2 border-b-2 font-medium ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'timeline' && <StudentTimeline />}
              {activeTab === 'documents' && <DocumentRepository />}
              {activeTab === 'communications' && <CommunicationLog />}
              {activeTab === 'applications' && <ApplicationHistory />}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <StudentStatusCard student={mockStudent} />
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Send Message
              </button>
              <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Schedule Meeting
              </button>
              <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Upload Document
              </button>
              <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Create Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;