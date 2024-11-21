import React from 'react';
import { FileText, Download, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  category: string;
  uploadedBy: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusText = (status: Document['status']) => {
    const statusMap = {
      approved: 'text-green-600',
      rejected: 'text-red-600',
      pending: 'text-yellow-600'
    };
    return statusMap[status];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{doc.name}</div>
                    <div className="text-sm text-gray-500">{doc.type}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">{doc.category}</td>
              <td className="px-6 py-4 text-gray-500">{doc.size}</td>
              <td className="px-6 py-4">
                <div>
                  <div className="text-gray-900">{doc.uploadedBy}</div>
                  <div className="text-sm text-gray-500">{doc.uploadDate}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className={`flex items-center ${getStatusText(doc.status)}`}>
                  {getStatusIcon(doc.status)}
                  <span className="ml-2 capitalize">{doc.status}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800" title="Download">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800" title="Delete">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;