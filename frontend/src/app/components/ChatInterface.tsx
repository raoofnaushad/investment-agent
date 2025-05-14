import React, { useState, useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faPaperPlane, faPaperclip, faThumbsUp);

interface ResponseOption {
  id: string;
  content: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  responseOptions?: ResponseOption[];
  selectedOption?: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onSelectResponseOption?: (messageId: string, optionId: string) => void;
}

const formatBoldText = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

export default function ChatInterface({ 
  messages, 
  onSendMessage,
  onSelectResponseOption 
}: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setIsLoading(true);
      onSendMessage(inputMessage);
      setInputMessage('');
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSelectOption = (messageId: string, optionId: string) => {
    if (onSelectResponseOption) {
      onSelectResponseOption(messageId, optionId);
    }
  };

  const getMessageContent = (message: Message): string => {
    if (message.selectedOption && message.responseOptions) {
      const selectedOption = message.responseOptions.find(opt => opt.id === message.selectedOption);
      return selectedOption ? selectedOption.content : message.content;
    }
    return message.content;
  };

  return (
    <div key={chatContainerId} className="flex flex-col h-full bg-[#121212]" suppressHydrationWarning>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'user' ? (
              <div className="max-w-[80%] rounded-lg p-4 bg-blue-600 text-white">
                <div 
                  className="text-sm whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: formatBoldText(message.content) }}
                />
              </div>
            ) : (
              <div className="max-w-[95%] w-full">
                {message.responseOptions && !message.selectedOption ? (
                  <div className="space-y-3">
                    <div className="rounded-lg p-4 bg-[#2a2a2a] text-gray-100">
                      <div 
                        className="text-sm whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: formatBoldText(message.content) }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                      {message.responseOptions.map((option, index) => (
                        <div 
                          key={option.id} 
                          className={`rounded-lg p-4 bg-[#2a2a2a] text-gray-100 hover:bg-[#3a3a3a] cursor-pointer border border-gray-700 h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                            index === 0 ? 'border-l-blue-500 border-l-4' : 
                            index === 1 ? 'border-l-purple-500 border-l-4' : 
                            'border-l-green-500 border-l-4'
                          }`}
                          onClick={() => handleSelectOption(message.id, option.id)}
                        >
                          <div className="flex flex-col h-full">
                            <div 
                              className="text-sm whitespace-pre-line flex-grow"
                              dangerouslySetInnerHTML={{ __html: formatBoldText(option.content) }}
                            />
                            <div className="flex justify-end mt-3">
                              <button 
                                className="text-gray-400 hover:text-gray-200 bg-[#1a1a1a] hover:bg-[#333333] w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectOption(message.id, option.id);
                                }}
                              >
                                <FontAwesomeIcon icon={faThumbsUp} className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg p-4 bg-[#2a2a2a] text-gray-100">
                    <div 
                      className="text-sm whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: formatBoldText(getMessageContent(message)) }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-4 bg-[#2a2a2a]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700 bg-[#121212]">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-grow flex items-center bg-[#2a2a2a] rounded-full pr-2">
            <button 
              type="button" 
              className="p-2 text-gray-400 hover:text-gray-300"
              aria-label="Attach file"
            >
              <FontAwesomeIcon icon={faPaperclip} className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about Lokam AI's services and solutions..."
              className="flex-grow px-2 py-2 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          
          <button
            type="submit"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
} 