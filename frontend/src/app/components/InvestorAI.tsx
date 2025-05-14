import React, { useState } from 'react';

export default function InvestorAI() {
  const [age, setAge] = useState<number | null>(null);
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [investmentHorizon, setInvestmentHorizon] = useState<number | null>(null);
  const [riskTolerance, setRiskTolerance] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = () => {
    // Call the API with the collected data
    // apiCall({ age, employmentStatus, investmentHorizon, riskTolerance, goal });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Investment AI</h1>
      <p className="mb-4">Requirement: "I need an investment portfolio for a client with the following profile"</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Age:</label>
          <select value={age || ''} onChange={(e) => setAge(Number(e.target.value))}>
            <option value="" disabled>Select Age</option>
            {[...Array(81)].map((_, i) => (
              <option key={i} value={i + 20}>{i + 20}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label>Employment Status:</label>
          <select value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)}>
            <option value="" disabled>Select Status</option>
            <option value="Professional">Professional</option>
            <option value="Retired">Retired</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Consultant">Consultant</option>
          </select>
        </div>
        <div className="mb-4">
          <label>Investment Horizon (years):</label>
          <input type="number" value={investmentHorizon || ''} onChange={(e) => setInvestmentHorizon(Number(e.target.value))} />
        </div>
        <div className="mb-4">
          <label>Risk Tolerance:</label>
          <select value={riskTolerance} onChange={(e) => setRiskTolerance(e.target.value)}>
            <option value="" disabled>Select Tolerance</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="mb-4">
          <label>Goal:</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="" disabled>Select Goal</option>
            <option value="Retirement Planning">Retirement Planning</option>
            <option value="5-Year Goal">5-Year Goal</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
}