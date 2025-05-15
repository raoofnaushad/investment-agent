from fastapi import APIRouter, WebSocket, HTTPException, WebSocketDisconnect
from app.agentic.autogen_agentchat import process_user_message
from app.models.schemas import UserMessage, AgentResponse

router = APIRouter()

@router.websocket("/ws/agentchat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Data Received: {data}")  # Debugging line
            # Process the data and send updates
            await process_user_message(data, websocket)
    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print(f"Error: {e}")  # Log the error
    finally:
        await websocket.close()