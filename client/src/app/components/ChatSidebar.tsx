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
  const samplePrompt = `I need an investment portfolio for a client with the following profile:
    - 45-year-old professional
    - Income: $200,000/year
    - Investment horizon: 20 years
    - Risk tolerance: Moderate
    - Goal: Retirement planning
    Please analyze and provide a comprehensive investment proposal.`;


  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white transition-all duration-300 w-64 md:w-72 lg:w-80">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="font-bold text-xl">{companyName}</h1>
      </div>

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

      <div className="px-4 py-2">
        <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-l-full rounded-r-full py-2 transition-colors w-full px-4">
          <FontAwesomeIcon icon={faPlus} className="h-5 w-5 mr-2" />
          Chat
        </button>
      </div>

      <div className="mt-4">
        <h2 className="px-4 py-2 text-gray-400 text-xs uppercase">
          Prompt Template
        </h2>
        <ul className="space-y-1 px-2">
          {chatHistory.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => onChatSelect(chat.id)}
                className={`flex items-center w-full rounded-md py-2 px-2 ${
                  chat.isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#2a2a2a]'
                } transition-colors`}
              >
                {chat.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between bg-[#2a2a2a] text-white rounded-md p-2">
          <pre className="whitespace-pre-wrap text-sm">{samplePrompt}</pre>
        </div>
      </div>

      <div className="mt-4 flex-grow">
        <h2 className="px-4 py-2 text-gray-400 text-xs uppercase">
          Agents
        </h2>
        <ul className="space-y-1 px-2">
          <li>
            <button
              className="flex items-center w-full rounded-md py-2 px-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Investment AI
            </button>
          </li>
        </ul>
      </div>

      <div className="p-4 mt-auto">
        <div className="flex items-center justify-between bg-[#2a2a2a] text-white rounded-md p-2">
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}