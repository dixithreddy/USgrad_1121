import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AgentTable from '../components/agents/AgentTable';
import AgentModal from '../components/agents/AgentModal';
import SearchBar from '../components/agents/SearchBar';
import { Agent } from '../types';

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'David Chen',
    email: 'david.chen@eduagent.com',
    region: 'East Asia',
    commissionRate: 70,
    performance: {
      conversionRate: 75,
      activeStudents: 28
    }
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@eduagent.com',
    region: 'Latin America',
    commissionRate: 70,
    performance: {
      conversionRate: 82,
      activeStudents: 35
    }
  }
];

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>();

  const handleEdit = (id: string) => {
    const agent = mockAgents.find(a => a.id === id);
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // In a real application, this would make an API call
    console.log('Delete agent:', id);
  };

  const handleModalSubmit = (data: Omit<Agent, 'id'>) => {
    // In a real application, this would make an API call
    console.log('Submit agent data:', data);
    setIsModalOpen(false);
    setSelectedAgent(undefined);
  };

  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agents</h1>
          <p className="mt-2 text-gray-600">Manage your recruitment agents and their performance</p>
        </div>
        <button
          onClick={() => {
            setSelectedAgent(undefined);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Agent
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <AgentTable
          agents={filteredAgents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AgentModal
        agent={selectedAgent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAgent(undefined);
        }}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Agents;