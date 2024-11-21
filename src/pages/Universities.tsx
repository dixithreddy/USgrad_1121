import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import SearchBar from '../components/universities/SearchBar';
import UniversityTable from '../components/universities/UniversityTable';
import UniversityModal from '../components/universities/UniversityModal';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { toast } from 'react-hot-toast';

const Universities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const { addData, updateData, deleteData } = useSupabaseData('universities');

  const handleEdit = (id: string) => {
    const university = universities.find(u => u.id === id);
    if (university) {
      setSelectedUniversity(university);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await deleteData(id);
        toast.success('University deleted successfully');
        window.location.reload();
      } catch (error) {
        toast.error('Error deleting university');
        console.error('Error:', error);
      }
    }
  };

  const handleModalSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        contact_phone: `${data.country_code}${data.contact_phone}`
      };

      if (selectedUniversity) {
        await updateData(selectedUniversity.id, formattedData);
      } else {
        await addData(formattedData);
      }

      setIsModalOpen(false);
      setSelectedUniversity(null);
      window.location.reload();
    } catch (error) {
      console.error('Error saving university:', error);
      toast.error('Error saving university');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Universities</h1>
          <p className="mt-2 text-gray-600">Manage your partner universities and their programs</p>
        </div>
        <button
          onClick={() => {
            setSelectedUniversity(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add University
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <UniversityTable
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchTerm={searchTerm}
        />
      </div>

      <UniversityModal
        university={selectedUniversity}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUniversity(null);
        }}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Universities;