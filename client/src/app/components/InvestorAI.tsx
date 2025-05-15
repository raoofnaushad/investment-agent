import React, { useState } from 'react';

interface InvestorAIProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export const InvestorAI: React.FC<InvestorAIProps> = ({ onSendMessage, isLoading }) => {
  // Form state for each field
  const [age, setAge] = useState(45);
  const [career, setCareer] = useState('Professional');
  const [income, setIncome] = useState(200000);
  const [horizon, setHorizon] = useState(20);
  const [risk, setRisk] = useState('Moderate');
  const [goal, setGoal] = useState('Retirement planning');

  // Construct the prompt string from form values
  const constructPrompt = () => (
    `I need an investment portfolio for a client with the following profile:
- ${age}-year-old ${career}
- Income: $${income.toLocaleString()}/year
- Investment horizon: ${horizon} years
- Risk tolerance: ${risk}
- Goal: ${goal}
Please analyze and provide a comprehensive investment proposal.`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(constructPrompt());
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Investment AI</h1>
      <form
        onSubmit={handleSubmit}
        className={isLoading ? "pointer-events-none opacity-60 blur-sm" : ""}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Age</label>
            <input
              type="number"
              value={age}
              min={18}
              max={100}
              onChange={e => setAge(Number(e.target.value))}
              className="w-full bg-[#2a2a2a] text-white rounded-lg p-2"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block mb-1">Career</label>
            <input
              type="text"
              value={career}
              onChange={e => setCareer(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white rounded-lg p-2"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block mb-1">Income (per year)</label>
            <input
              type="number"
              value={income}
              min={0}
              step={1000}
              onChange={e => setIncome(Number(e.target.value))}
              className="w-full bg-[#2a2a2a] text-white rounded-lg p-2"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block mb-1">Investment Horizon (years)</label>
            <input
              type="number"
              value={horizon}
              min={1}
              max={50}
              onChange={e => setHorizon(Number(e.target.value))}
              className="w-full bg-[#2a2a2a] text-white rounded-lg p-2"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block mb-1">Risk Tolerance</label>
            <select
              value={risk}
              onChange={e => setRisk(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white rounded-lg p-2"
              disabled={isLoading}
            >
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Goal</label>
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white rounded-lg p-2"
              disabled={isLoading}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
      {isLoading && (
        <div className="text-center mt-2 text-gray-400">Processing... Please wait.</div>
      )}
    </div>
  );
};