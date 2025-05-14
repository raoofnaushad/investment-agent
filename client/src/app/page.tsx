'use client';

import { useState } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatInterface from './components/ChatInterface';
import { Message } from './components/ChatInterface';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChatSelect = (id: string) => {
    console.log(`Selected chat: ${id}`);
  };

  const handleReceiveMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <main className="flex h-screen bg-[#1a1a1a]">
      <ChatSidebar 
        companyName="Adventis.ai" 
        chatHistory={[]} 
        onChatSelect={handleChatSelect} 
      />
      <div className="flex-1 border-l border-gray-700 overflow-hidden">
        <ChatInterface 
          messages={messages} 
          onReceiveMessage={handleReceiveMessage}
        />
      </div>
    </main>
  );
}