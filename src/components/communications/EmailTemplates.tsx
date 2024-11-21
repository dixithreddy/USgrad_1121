import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Copy } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  subject: string;
  category: string;
  lastModified: string;
  variables: string[];
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Application Confirmation',
    subject: 'Your Application Has Been Received',
    category: 'Applications',
    lastModified: '2024-03-15',
    variables: ['studentName', 'university', 'program']
  },
  {
    id: '2',
    name: 'Document Request',
    subject: 'Required Documents for Your Application',
    category: 'Documents',
    lastModified: '2024-03-14',
    variables: ['studentName', 'documentList', 'deadline']
  }
];

const EmailTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Email Templates</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {mockTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white border rounded-lg p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{template.subject}</p>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                {template.category}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Variables:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {template.variables.map((variable) => (
                  <span
                    key={variable}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs"
                  >
                    {variable}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Modified: {new Date(template.lastModified).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 text-blue-600 hover:text-blue-800">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1 text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplates;