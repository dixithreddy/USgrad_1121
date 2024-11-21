import React from 'react';
import { FileText, Download, Eye, Trash2, Upload } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'rejected';
  size: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Official_Transcript.pdf',
    type: 'PDF',
    category: 'Academic',
    uploadDate: '2024-03-15',
    status: 'verified',
    size: '2.4 MB'
  },
  {
    id: '2',
    name: 'Passport_Scan.pdf',
    type: 'PDF',
    category: 'Identity',
    uploadDate: '2024-03-14',
    status: 'verified',
    size: '1.8 MB'
  },
  {
    id: '3',
    name: 'Statement_of_Purpose.docx',
    type: 'DOCX',
    category: 'Application',
    uploadDate: '2024-03-13',
    status: 'pending',
    size: '524 KB'
  }
];

const DocumentRepository = () => {
  const getStatusColor = (status: string) => {
    const colors = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Documents</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-500">{doc.size}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{doc.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentRepository;