import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { BarChart2, Filter } from 'lucide-react';
import PipelineCard from '../components/pipeline/PipelineCard';
import PipelineFilters from '../components/pipeline/PipelineFilters';
import PipelineStats from '../components/pipeline/PipelineStats';
import { PipelineStage, PipelineItem } from '../types';

const mockPipeline: Record<PipelineStage, PipelineItem[]> = {
  inquiry: [
    {
      id: '1',
      studentName: 'John Smith',
      country: 'USA',
      targetUniversity: 'Stanford University',
      program: 'MS Computer Science',
      deadline: '2024-08-15',
      lastActivity: '2024-03-10',
      priority: 'high'
    },
    {
      id: '2',
      studentName: 'Emma Wilson',
      country: 'UK',
      targetUniversity: 'MIT',
      program: 'MS Data Science',
      deadline: '2024-09-01',
      lastActivity: '2024-03-12',
      priority: 'medium'
    }
  ],
  documentation: [
    {
      id: '3',
      studentName: 'Raj Patel',
      country: 'India',
      targetUniversity: 'Carnegie Mellon',
      program: 'MS Software Engineering',
      deadline: '2024-07-30',
      lastActivity: '2024-03-11',
      priority: 'high'
    }
  ],
  application: [
    {
      id: '4',
      studentName: 'Liu Wei',
      country: 'China',
      targetUniversity: 'UC Berkeley',
      program: 'MS AI',
      deadline: '2024-08-30',
      lastActivity: '2024-03-09',
      priority: 'medium'
    }
  ],
  interview: [],
  decision: [
    {
      id: '5',
      studentName: 'Ana Silva',
      country: 'Brazil',
      targetUniversity: 'Harvard',
      program: 'MBA',
      deadline: '2024-07-15',
      lastActivity: '2024-03-08',
      priority: 'low'
    }
  ],
  visa: [],
  enrolled: [
    {
      id: '6',
      studentName: 'Mohammed Ahmed',
      country: 'UAE',
      targetUniversity: 'Stanford University',
      program: 'MS Finance',
      deadline: '2024-06-30',
      lastActivity: '2024-03-07',
      priority: 'medium'
    }
  ]
};

const Pipeline = () => {
  const [pipeline, setPipeline] = useState(mockPipeline);
  const [showFilters, setShowFilters] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceStage = result.source.droppableId as PipelineStage;
    const destStage = result.destination.droppableId as PipelineStage;
    
    const newPipeline = { ...pipeline };
    const [movedItem] = newPipeline[sourceStage].splice(result.source.index, 1);
    newPipeline[destStage].splice(result.destination.index, 0, movedItem);
    
    setPipeline(newPipeline);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pipeline</h1>
          <p className="mt-2 text-gray-600">Track and manage student applications through different stages</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <BarChart2 className="w-5 h-5" />
            Analytics
          </button>
        </div>
      </div>

      {showFilters && <PipelineFilters onClose={() => setShowFilters(false)} />}

      <PipelineStats pipeline={pipeline} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-7 gap-4 overflow-x-auto pb-6">
          {Object.entries(pipeline).map(([stage, items]) => (
            <div key={stage} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700 capitalize">{stage}</h3>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">
                  {items.length}
                </span>
              </div>
              <Droppable droppableId={stage}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3 min-h-[200px]"
                  >
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <PipelineCard item={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Pipeline;