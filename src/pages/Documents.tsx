import React, { useState } from 'react';
import { Plus, Upload, FolderOpen } from 'lucide-react';
import DocumentList from '../components/documents/DocumentList';
import DocumentUploadModal from '../components/documents/DocumentUploadModal';
import DocumentFolderNav from '../components/documents/DocumentFolderNav';
import SearchBar from '../components/documents/SearchBar';

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

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Stanford_Agreement_2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    category: 'University Agreements',
    uploadedBy: 'John Smith',
    uploadDate: '2024-03-10',
    status: 'approved'
  },
  {
    id: '2',
    name: 'Student_Visa_Guidelines.docx',
    type: 'DOCX',
    size: '1.8 MB',
    category: 'Visa Documents',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2024-03-09',
    status: 'approved'
  },
  {
    id: '3',
    name: 'Agent_Contract_Template.pdf',
    type: 'PDF',
    size: '1.2 MB',
    category: 'Agent Documents',
    uploadedBy: 'Mike Wilson',
    uploadDate: '2024-03-08',
    status: 'pending'
  }
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDocuments = mockDocuments.filter(doc => 
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || doc.category === selectedCategory)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="mt-2 text-gray-600">Manage and organize all your documents in one place</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <FolderOpen className="w-5 h-5" />
            New Folder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <DocumentFolderNav 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="col-span-9">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <DocumentList documents={filteredDocuments} />
          </div>
        </div>
      </div>

      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={(data) => {
          console.log('Upload document:', data);
          setIsUploadModalOpen(false);
        }}
      />
    </div>
  );
};

export default Documents;