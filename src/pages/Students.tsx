import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import StudentTable from '../components/students/StudentTable';
import StudentModal from '../components/students/StudentModal';
import SearchBar from '../components/students/SearchBar';
import { Student } from '../types';

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    country: 'India',
    status: 'Applied',
    targetUniversity: 'Stanford University',
    targetProgram: 'Master of Computer Science',
    applicationProgress: 65
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@email.com',
    country: 'China',
    status: 'Accepted',
    targetUniversity: 'MIT',
    targetProgram: 'Master of Engineering',
    applicationProgress: 100
  }
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();

  const handleEdit = (id: string) => {
    const student = mockStudents.find(s => s.id === id);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // In a real application, this would make an API call
    console.log('Delete student:', id);
  };

  const handleModalSubmit = (data: Omit<Student, 'id'>) => {
    // In a real application, this would make an API call
    console.log('Submit student data:', data);
    setIsModalOpen(false);
    setSelectedStudent(undefined);
  };

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.targetUniversity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="mt-2 text-gray-600">Track and manage student applications</p>
        </div>
        <button
          onClick={() => {
            setSelectedStudent(undefined);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <StudentTable
          students={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(undefined);
        }}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Students;