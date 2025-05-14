import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from './ChatInterface'; // Import the Message interface

interface MessageRendererProps {
  message: Message; // Use the Message interface
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    console.log('Debug: Message received:', message);
  }, [message]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderModelUsage = (modelsUsage: { prompt_tokens: number; completion_tokens: number } | undefined) => {
    if (!modelsUsage) return null;
    return (
      <div className="text-gray-400 text-sm">
        Model Usage: Prompt Tokens: {modelsUsage.prompt_tokens}, Completion Tokens: {modelsUsage.completion_tokens}
      </div>
    );
  };

  const renderContent = () => {
    switch (message.message_type) {
      case 'TextMessage':
        let parsedContent;
        try {
          parsedContent = JSON.parse(message.content);
        } catch (error) {
          console.error('Error parsing message content:', error);
          return <div>Error parsing message content</div>;
        }
  
        return (
          <div className="p-4 bg-[#2a2a2a] rounded-lg text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded">Agent: {parsedContent.source || 'N/A'}</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">Message Type: {parsedContent.message_type || 'N/A'}</span>
              {parsedContent.models_usage && (
                <span className="bg-gray-500 text-white px-2 py-1 rounded">
                  Model Usage: Prompt Tokens: {parsedContent.models_usage.prompt_tokens}, Completion Tokens: {parsedContent.models_usage.completion_tokens}
                </span>
              )}
            </div>
            <button onClick={toggleExpand} className="text-blue-500">
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
            {isExpanded && (
              <div className="mt-2">
                <ReactMarkdown>{parsedContent.content}</ReactMarkdown>
              </div>
            )}
          </div>
        );

      case 'ToolCallRequestEvent':
        let parsedRequestContent;
        try {
          parsedRequestContent = JSON.parse(message.content);
        } catch (error) {
          console.error('Error parsing message content:', error);
          return <div>Error parsing message content</div>;
        }
      
        return (
          <div className="p-4 bg-[#2a2a2a] rounded-lg text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded">Agent: {parsedRequestContent.source || 'N/A'}</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">Message Type: {parsedRequestContent.message_type || 'N/A'}</span>
              {parsedRequestContent.models_usage && (
                <span className="bg-gray-500 text-white px-2 py-1 rounded">
                  Model Usage: Prompt Tokens: {parsedRequestContent.models_usage.prompt_tokens}, Completion Tokens: {parsedRequestContent.models_usage.completion_tokens}
                </span>
              )}
            </div>
            <button onClick={toggleExpand} className="text-blue-500">
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
            {isExpanded && (
              <div className="mt-2">
                {parsedRequestContent.content.map((call: { id: string; name: string; arguments: string }, index: number) => (
                  <div key={index} className="mb-2">
                    <div>ID: {call.id}</div>
                    <div>Name: {call.name}</div>
                    <div>Arguments: {call.arguments}</div>
                    {index < parsedRequestContent.content.length - 1 && <hr className="my-2 border-gray-600" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'ToolCallExecutionEvent':
        let parsedExecutionContent;
        try {
          parsedExecutionContent = JSON.parse(message.content);
        } catch (error) {
          console.error('Error parsing message content:', error);
          return <div>Error parsing message content</div>;
        }
      
        return (
          <div className="p-4 bg-[#2a2a2a] rounded-lg text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded">Agent: {parsedExecutionContent.source || 'N/A'}</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">Message Type: {parsedExecutionContent.message_type || 'N/A'}</span>
              {parsedExecutionContent.models_usage && (
                <span className="bg-gray-500 text-white px-2 py-1 rounded">
                  Model Usage: Prompt Tokens: {parsedExecutionContent.models_usage.prompt_tokens}, Completion Tokens: {parsedExecutionContent.models_usage.completion_tokens}
                </span>
              )}
            </div>
            <button onClick={toggleExpand} className="text-blue-500">
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
            {isExpanded && (
              <div className="mt-2">
                {parsedExecutionContent.content.map((execution: { name: string; call_id: string; is_error: boolean; content: { link: string; title: string; snippet: string }[] }, index: number) => (
                  <div key={index} className="mb-4">
                    <div>Name: {execution.name}</div>
                    <div>Call ID: {execution.call_id}</div>
                    <div>Is Error: {execution.is_error ? 'Yes' : 'No'}</div>
                    <div className="mt-2">
                      {Array.isArray(execution.content) ? (
                        execution.content.map((action: { link: string; title: string; snippet: string }, actionIndex: number) => (
                          <div key={actionIndex} className="mb-2">
                            <a href={action.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                              {action.title}
                            </a>
                            <p>{action.snippet}</p>
                          </div>
                        ))
                      ) : (
                        <p></p>
                      )}
                    </div>
                    {index < parsedExecutionContent.content.length - 1 && <hr className="my-2 border-gray-600" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'TaskResult':
        return (
          <div>
            {renderModelUsage(message.models_usage)}
            <div className="mt-2">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        );

      default:
        return <div>Unknown message type</div>;
    }
  };

  return <div className="p-4 bg-[#2a2a2a] rounded-lg text-white">{renderContent()}</div>;
};

export default MessageRenderer;