import React, { useState } from 'react';

interface InvestorAIProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export const InvestorAI: React.FC<InvestorAIProps> = ({ onSendMessage, isLoading }) => {
  const [inputMessage, setInputMessage] = useState<string>(
    `I need an investment portfolio for a client with the following profile:
    - 45-year-old professional
    - Income: $200,000/year
    - Investment horizon: 20 years
    - Risk tolerance: Moderate
    - Goal: Retirement planning
    Please analyze and provide a comprehensive investment proposal.`
  );
  const [isFirstMessage, setIsFirstMessage] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
      setIsFirstMessage(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Investment AI</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            rows={isFirstMessage ? 10 : 3}
            className="w-full bg-[#2a2a2a] text-white rounded-lg p-2 focus:outline-none resize-none"
            placeholder="Type here..."
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}