import React, { useState, useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { connectWebSocket } from '../services/api'; 
import { InvestorAI } from './InvestorAI';
import MessageRenderer from './MessageRenderer';
import ReactMarkdown from 'react-markdown';

library.add(faSpinner);

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  message_type: string;
  isActive?: boolean;
  models_usage?: {
    prompt_tokens: number;
    completion_tokens: number;
  };
}

interface ChatInterfaceProps {
  messages: Message[];
  onReceiveMessage: (message: Message) => void;
}

export default function ChatInterface({ messages, onReceiveMessage }: ChatInterfaceProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const chatContainerId = useId();

  const handleSendMessage = (content: string) => {
    if (!socket) {
      const ws = connectWebSocket(
        (messageContent) => {
          if (messageContent === "PROCESS COMPLETE") {
            setIsLoading(false);
            setLastMessage(messages[messages.length - 1]?.content || null);
            ws.close();
          } else {
            setIsLoading(false);
            const newMessage: Message = {
              id: `msg-${Date.now()}`,
              sender: 'assistant',
              content: messageContent,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              message_type: JSON.parse(messageContent).message_type,
              models_usage: JSON.parse(messageContent).models_usage,
            };
            onReceiveMessage(newMessage);
            setIsLoading(true);
          }
        }
      );
      setSocket(ws);

      ws.onopen = () => {
        console.log('WebSocket connection opened');
        setIsLoading(true);
        ws.send(content);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setIsLoading(false);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsLoading(false);
      };
    } else if (socket.readyState === WebSocket.OPEN) {
      setIsLoading(true);
      socket.send(content);
    } else {
      console.error('WebSocket is not open');
      setIsLoading(false);
    }
  };

  return (
    <div key={chatContainerId} className="flex flex-col h-full bg-[#121212]" suppressHydrationWarning>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageRenderer key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="text-center flex items-center justify-center">
            <FontAwesomeIcon icon="spinner" spin className="mr-2" />
            Thinking...
          </div>
        )}
        {lastMessage && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <ReactMarkdown>{lastMessage}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700 bg-[#121212]">
        <InvestorAI onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}