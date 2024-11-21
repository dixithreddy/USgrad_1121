import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { format } from 'date-fns';

interface Comment {
  id: string;
  user: {
    name: string;
    role: string;
  };
  content: string;
  timestamp: string;
}

const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      role: 'Admissions Officer'
    },
    content: 'All required documents have been received and verified.',
    timestamp: '2024-03-15T10:30:00'
  },
  {
    id: '2',
    user: {
      name: 'Mike Wilson',
      role: 'Agent'
    },
    content: 'Student has completed the interview preparation session.',
    timestamp: '2024-03-14T15:45:00'
  }
];

interface ApplicationCommentsProps {
  applicationId: string;
}

const ApplicationComments: React.FC<ApplicationCommentsProps> = ({ applicationId }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    console.log('Submit comment:', { applicationId, content: newComment });
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {mockComments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {comment.user.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-medium text-gray-900">{comment.user.name}</span>
                  <span className="text-sm text-gray-500 ml-2">{comment.user.role}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(comment.timestamp), 'MMM d, yyyy h:mm a')}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 mt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </form>
    </div>
  );
};

export default ApplicationComments;