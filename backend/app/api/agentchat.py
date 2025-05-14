# backend/app/api/agentchat.py
from fastapi import APIRouter, HTTPException
from backend.app.agentic.autogen_agentchat import process_user_message
from backend.app.models.schemas import UserMessage, AgentResponse

router = APIRouter()

@router.post("/agentchat", response_model=AgentResponse)
async def agentchat(user_message: UserMessage):
    try:
        # Process the user message
        result = await process_user_message(user_message.message)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))