# backend/app/main.py
from fastapi import FastAPI
from backend.app.api.agentchat import router as agentchat_router

app = FastAPI()

app.include_router(agentchat_router, prefix="/api/v1")