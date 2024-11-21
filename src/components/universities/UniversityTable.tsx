import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseData } from '../../hooks/useSupabaseData';
import { toast } from 'react-hot-toast';

interface University {
  id: string;
  name: string;
  location: string;
  commission_rate: number;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
}

interface UniversityTableProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  searchTerm?: string;
}

const UniversityTable: React.FC<UniversityTableProps> = ({
  onEdit,
  onDelete,
  searchTerm = ''
}) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const { loading, error, fetchData } = useSupabaseData('universities');
  const navigate = useNavigate();

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    try {
      const data = await fetchData();
      setUniversities(data);
    } catch (err) {
      console.error('Error loading universities:', err);
      toast.error('Error loading universities');
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/universities/${id}`);
  };

  const filteredUniversities = universities.filter(university => {
    const searchLower = searchTerm.toLowerCase();
    return (
      university.name.toLowerCase().includes(searchLower) ||
      university.location.toLowerCase().includes(searchLower) ||
      university.contact_email?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <div className="p-4 text-center">Loading universities...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error loading universities: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUniversities.map((university) => (
            <tr key={university.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <button
                  onClick={() => handleViewDetails(university.id)}
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  {university.name}
                </button>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {university.location}
              </td>
              <td className="px-6 py-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {university.commission_rate}%
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm">
                  {university.contact_email && (
                    <div className="text-gray-900">{university.contact_email}</div>
                  )}
                  {university.contact_phone && (
                    <div className="text-gray-500">{university.contact_phone}</div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(university.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(university.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleViewDetails(university.id)}
                    className="text-gray-600 hover:text-gray-800"
                    title="View Details"
                  >
                    <ChevronRight className="w-5 h-5" />
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

export default UniversityTable;