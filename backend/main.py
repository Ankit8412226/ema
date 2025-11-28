from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Main FastAPI app
app = FastAPI()

# CORS setup
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
#       IMPORTS (FIXED)
# -----------------------------
# All imports must point to backend.*
from backend.agent import get_agent_response
from backend.mock_data import CLAIMS, ANALYTICS
from backend.agents.claims_agent import analyze_claim_document
from backend.supabase_client import supabase


# -----------------------------
#       REQUEST MODELS
# -----------------------------

class ChatRequest(BaseModel):
    message: str
    thread_id: str = "default"


class DocumentRequest(BaseModel):
    text: str


class NewClaim(BaseModel):
    id: str
    policyHolder: str
    incidentDate: str
    status: str
    severity: str
    vehicle: str
    confidence: int
    documentUrl: str | None = None


# -----------------------------
#       ROUTES
# -----------------------------

@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = await get_agent_response(request.message, request.thread_id)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/analyze")
async def analyze_document(request: DocumentRequest):
    result = await analyze_claim_document(request.text)
    return result


@app.get("/claims")
async def get_claims():
    if not supabase:
        return CLAIMS
        
    try:
        response = supabase.table("claims").select("*").order("created_at", desc=True).execute()
        if response.data and len(response.data) > 0:
            return response.data
        return CLAIMS  # fallback
    except Exception as e:
        print(f"Supabase error: {e}")
        return CLAIMS


@app.get("/claims/{claim_id}")
async def get_claim(claim_id: str):
    if supabase:
        try:
            response = supabase.table("claims").select("*").eq("id", claim_id).execute()
            if response.data:
                return response.data[0]
        except Exception:
            pass

    # fallback to mock data
    for claim in CLAIMS:
        if claim["id"] == claim_id:
            return claim

    raise HTTPException(status_code=404, detail="Claim not found")


@app.post("/claims")
async def create_claim(claim: NewClaim):
    claim_data = claim.dict()

    if not supabase:
        CLAIMS.insert(0, claim_data)
        return claim

    try:
        supabase.table("claims").insert(claim_data).execute()
    except Exception as e:
        print(f"Supabase insert error: {e}")
        CLAIMS.insert(0, claim_data)

    return claim


@app.get("/analytics")
async def get_analytics():
    return ANALYTICS


# -----------------------------
#  IMPORTANT: Remove uvicorn!
# -----------------------------
# ❌ Do NOT include uvicorn.run() for Vercel
# Vercel loads the `app` object automatically
