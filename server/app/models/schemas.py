# backend/app/models/schemas.py
from pydantic import BaseModel

class UserMessage(BaseModel):
    message: str

class AgentResponse(BaseModel):
    result: str