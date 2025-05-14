# backend/app/main.py
from fastapi import FastAPI
from app.api.agentchat import router as agentchat_router
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

app.include_router(agentchat_router, prefix="/api/v1")