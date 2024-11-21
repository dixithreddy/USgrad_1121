import React, { useState } from 'react';
import { Send, Paperclip, Image, Smile } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'sent' | 'received';
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'John Smith',
    content: 'Hi, I have a question about the application process.',
    timestamp: '10:30 AM',
    type: 'received'
  },
  {
    id: '2',
    sender: 'You',
    content: 'Of course! How can I help you?',
    timestamp: '10:31 AM',
    type: 'sent'
  },
  {
    id: '3',
    sender: 'John Smith',
    content: 'What documents do I need to submit for the visa application?',
    timestamp: '10:32 AM',
    type: 'received'
  }
];

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-semibold">JS</span>
          </div>
          <div>
            <h3 className="font-semibold">John Smith</h3>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.type === 'sent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Image className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;