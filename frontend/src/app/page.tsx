'use client';

import { useState } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatInterface from './components/ChatInterface';
import InvestorAI from './components/InvestorAI'; // Import the new component


const mockChatHistory = [
  {
    id: '1',
    title: 'About Lokam AI',
    timestamp: '2h ago',
    isActive: true,
  },
  // ... other chat history items
];

const mockMessages = [
  {
    id: '1',
    sender: 'user' as const,
    content: 'Tell me about Lokam AI and what you offer',
    timestamp: '02:12 am',
  },
  // ... other mock messages
];

export default function Home() {
  const [messages, setMessages] = useState(mockMessages);
  const [activeChat, setActiveChat] = useState('1');

  const handleChatSelect = (id: string) => {
    console.log(`Selected chat: ${id}`);
    setActiveChat(id);
  };

  const handleSendMessage = (content: string) => {
    const newUserMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newUserMessage]);
  };

  const handleReceiveMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleSelectResponseOption = (messageId: string, optionId: string) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { ...message, selectedOption: optionId } 
          : message
      )
    );
  };

  return (
    <main className="flex h-screen bg-[#1a1a1a]">
      <ChatSidebar 
        companyName="Lokam.ai" 
        chatHistory={mockChatHistory} 
        onChatSelect={handleChatSelect} 
      />
      <div className="flex-1 border-l border-gray-700">
        <InvestorAI /> {/* Use the new InvestorAI component */}
      </div>
    </main>
  );
}