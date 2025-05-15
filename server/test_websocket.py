import asyncio
import websockets
import os

async def test_websocket():
    uri = "ws://https://adventis.lokam.ai/api/v1/ws/agentchat"  # Updated to match the server's WebSocket endpoint
    async with websockets.connect(uri) as websocket:
        # Overwrite the markdown file when a new connection is created
        with open("websocket_responses.md", "w") as file:
            file.write("# WebSocket Responses\n\n")

        # Send a test message
        message = """I need an investment portfolio for a client with the following profile:
    - 45-year-old professional
    - Income: $200,000/year
    - Investment horizon: 20 years
    - Risk tolerance: Moderate
    - Goal: Retirement planning
    Please analyze and provide a comprehensive investment proposal.""" 
        
        await websocket.send(message)
        
        # Receive responses until the connection is closed
        try:
            while True:
                response = await websocket.recv()
                print(f"Received: {response}")
                
                # Append each response to the markdown file
                with open("websocket_responses.md", "a") as file:
                    file.write(f"## Response\n\n{response}\n\n")
        except websockets.exceptions.ConnectionClosedOK:
            print("Connection closed normally.")

asyncio.run(test_websocket())