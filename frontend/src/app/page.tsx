'use client';

import { useState } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatInterface from './components/ChatInterface';

const mockChatHistory = [
  {
    id: '1',
    title: 'About Lokam AI',
    timestamp: '2h ago',
    isActive: true,
  },
  {
    id: '2',
    title: 'AI Solutions',
    timestamp: '1d ago',
  },
  {
    id: '3',
    title: 'Our Process',
    timestamp: '3d ago',
  },
  {
    id: '4',
    title: 'Featured Projects',
    timestamp: '1w ago',
  },
  {
    id: '5',
    title: 'Our Team',
    timestamp: '2w ago',
  },
];

const mockMessages = [
  {
    id: '1',
    sender: 'user' as const,
    content: 'Tell me about Lokam AI and what you offer',
    timestamp: '02:12 am',
  },
  {
    id: '2',
    sender: 'assistant' as const,
    content: '🌍 **Lokam AI** is an AI consulting company helping mid-sized businesses unlock growth and efficiency using custom, secure, and production-grade AI solutions.',
    timestamp: '1.2s',
    responseOptions: [
      {
        id: 'opt-1',
        content: '**Our Services**\n1. **Data Strategy** – We help you turn your data into a business advantage.\n2. **Custom AI Development** – We build AI solutions tailored to your business needs.\n3. **AI Consulting** – We provide expert guidance on GenAI adoption.'
      },
      {
        id: 'opt-2',
        content: '**Our Process**\n1. **Identify Use Cases** – We spot high-impact opportunities for AI.\n2. **Design Custom Solutions** – We blueprint AI solutions to fit your vision.\n3. **Develop & Train** – We build robust systems trained on your data.'
      },
      {
        id: 'opt-3',
        content: '**Featured Projects**\n🛍️ **E-commerce Shopping Assistant** – Conversational AI for online shopping\n📣 **AI Social Media Agent** – Predictive content planning & automation\n📄 **Invoice Automation** – Extract, validate, and process invoices with AI'
      }
    ]
  },
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
    
    setTimeout(() => {
      const newAssistantMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant' as const,
        content: 'Here\'s what I found about that:',
        timestamp: '0.5s',
        responseOptions: [
          {
            id: `opt-${Date.now()}-1`,
            content: '**Our Services**\n1. **Data Strategy** – We help you turn your data into a business advantage.\n2. **Custom AI Development** – We build AI solutions tailored to your business needs.\n3. **AI Consulting** – We provide expert guidance on GenAI adoption.'
          },
          {
            id: `opt-${Date.now()}-2`,
            content: '**Our Process**\n1. **Identify Use Cases** – We spot high-impact opportunities for AI.\n2. **Design Custom Solutions** – We blueprint AI solutions to fit your vision.\n3. **Develop & Train** – We build robust systems trained on your data.'
          },
          {
            id: `opt-${Date.now()}-3`,
            content: '**Featured Projects**\n🛍️ **E-commerce Shopping Assistant** – Conversational AI for online shopping\n📣 **AI Social Media Agent** – Predictive content planning & automation\n📄 **Invoice Automation** – Extract, validate, and process invoices with AI'
          }
        ]
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
    }, 1500);
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
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          onSelectResponseOption={handleSelectResponseOption}
        />
      </div>
    </main>
  );
}
