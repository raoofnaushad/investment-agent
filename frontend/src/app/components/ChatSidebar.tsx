import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  isActive?: boolean;
}

interface ChatSidebarProps {
  companyName: string;
  chatHistory: ChatHistoryItem[];
  onChatSelect: (id: string) => void;
}

export default function ChatSidebar({ companyName, chatHistory, onChatSelect }: ChatSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col h-full bg-[#1a1a1a] text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && <h1 className="font-bold text-xl">{companyName}</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1 rounded hover:bg-gray-700"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full bg-[#2a2a2a] text-white rounded-l-full rounded-r-full py-2 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-2.5 top-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="px-4 py-2">
        <button className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-l-full rounded-r-full py-2 transition-colors ${isCollapsed ? 'w-10 mx-auto' : 'w-full px-4'}`}>
          {isCollapsed ? (
            <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} className="h-5 w-5 mr-2" />
              New Chat
            </>
          )}
        </button>
      </div>

      <div className="mt-4">
        {!isCollapsed && (
          <h2 className="px-4 py-2 text-gray-400 text-xs uppercase">
            CHAT HISTORY
          </h2>
        )}
      </div>

      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-1 px-2">
          {chatHistory.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => onChatSelect(chat.id)}
                className={`flex items-center w-full rounded-md py-2 px-2 ${
                  chat.isActive 
                    ? 'bg-[#2a2a2a] text-white' 
                    : 'text-gray-300 hover:bg-[#2a2a2a]'
                } transition-colors ${isCollapsed ? 'justify-center' : 'justify-between'}`}
              >
                {isCollapsed ? (
                  <div className="w-6 h-6 flex items-center justify-center bg-[#2a2a2a] rounded-full text-xs">
                    {chat.title.charAt(0)}
                  </div>
                ) : (
                  <>
                    <span className="truncate">{chat.title}</span>
                    <span className="text-xs text-gray-400">{chat.timestamp}</span>
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 