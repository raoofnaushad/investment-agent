// src/app/services/api.ts

export function connectWebSocket(onMessage: (message: string) => void, onOpen?: () => void, onClose?: () => void, onError?: (error: Event) => void) {
    const wsUrl = process.env.REACT_APP_WS_URL || 'wss://adventis.lokam.ai/api/v1/ws/agentchat';
    // const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/api/v1/ws/agentchat';
    
    const ws = new WebSocket(wsUrl);
  
    ws.onopen = () => {
      console.log('WebSocket connection opened');
      if (onOpen) onOpen();
    };
  
    ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      onMessage(event.data);
    };
  
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      if (onClose) onClose();
    };
  
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      console.error('WebSocket readyState:', ws.readyState);
      console.error('WebSocket URL:', ws.url);
      if (onError) onError(error);
    };
  
    return ws;
  }