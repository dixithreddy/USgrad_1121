import React from 'react';
import { 
  Folder, 
  GraduationCap, 
  Users, 
  UserCheck, 
  FileText,
  Paperclip,
  FileCheck
} from 'lucide-react';

interface DocumentFolderNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const DocumentFolderNav: React.FC<DocumentFolderNavProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const categories = [
    { id: 'all', name: 'All Documents', icon: FileText, count: 45 },
    { id: 'University Agreements', name: 'University Agreements', icon: GraduationCap, count: 12 },
    { id: 'Student Documents', name: 'Student Documents', icon: Users, count: 18 },
    { id: 'Agent Documents', name: 'Agent Documents', icon: UserCheck, count: 8 },
    { id: 'Visa Documents', name: 'Visa Documents', icon: FileCheck, count: 15 },
    { id: 'Templates', name: 'Templates', icon: Paperclip, count: 5 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </div>
            <span className="text-sm text-gray-500">{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DocumentFolderNav;