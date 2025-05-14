# backend/app/api/agentchat.py
from fastapi import APIRouter, WebSocket, HTTPException
from app.agentic.autogen_agentchat import process_user_message
from app.models.schemas import UserMessage, AgentResponse

router = APIRouter()

@router.post("/agentchat", response_model=AgentResponse)
async def agentchat(user_message: UserMessage):
    try:
        # Process the user message
        result = await process_user_message(user_message.message)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.websocket("/ws/agentchat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Data Received: {data}")  # Debugging line
            # Process the data and send updates
            await process_user_message(data, websocket)
    except Exception as e:
        print(f"Error: {e}")  # Log the error
        await websocket.close()