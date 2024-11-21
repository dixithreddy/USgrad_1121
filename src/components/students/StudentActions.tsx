import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { ROLES } from '../../constants/roles';

interface StudentActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

const StudentActions: React.FC<StudentActionsProps> = ({
  onEdit,
  onDelete,
  onViewDetails
}) => {
  const { hasPermission } = usePermissions();
  const isEmployee = hasPermission(ROLES.EMPLOYEE);

  return (
    <div className="flex gap-3">
      {(hasPermission('edit_students') || !isEmployee) && (
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          Edit
        </button>
      )}
      
      {!isEmployee && (
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800"
          title="Delete"
        >
          Delete
        </button>
      )}
      
      <button
        onClick={onViewDetails}
        className="text-gray-600 hover:text-gray-800"
        title="View Details"
      >
        View Details
      </button>
    </div>
  );
};