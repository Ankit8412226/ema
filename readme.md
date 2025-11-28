# EMA: The Universal AI Employee for Insurance Claims

![EMA Logo](frontend/public/Ema-full-logo-color.webp)

**EMA (Enterprise Multi-Agent Assistant)** is an autonomous, agentic AI system designed to revolutionize the insurance claims lifecycle. It moves beyond simple chatbots to act as a proactive "Universal AI Employee" that can execute complex workflows, analyze unstructured data, and make intelligent decisions.

---

## 🚨 The Problem

The insurance claims process is currently broken:

1.  **Slow Turnaround**: Simple claims can take weeks to settle due to manual data entry and review queues.
2.  **Fragmented Data**: Adjusters have to toggle between emails, PDF invoices, policy documents, and legacy mainframes.
3.  **High Operational Costs**: A significant portion of premiums goes towards administrative overhead rather than claims payout.
4.  **Inconsistent Decisions**: Different adjusters might interpret policies differently, leading to leakage or unfair denials.

## 💡 The Solution: EMA

EMA is not just a tool; it's an **autonomous agent** that sits alongside your human team.

*   **It Reads**: EMA uses Multimodal AI (GPT-4o) to read PDF estimates, handwritten notes, and crash photos just like a human would.
*   **It Thinks**: Using a graph-based architecture (LangGraph), EMA reasons about coverage, liability, and fraud risks.
*   **It Acts**: EMA can draft emails, schedule payments, and update claim statuses in the database.

---

## 🌟 Key Features

### 1. Autonomous Triage (FNOL)
EMA instantly ingests "First Notice of Loss" data. It analyzes the incident description and vehicle details to assign a **Risk Score** and **Severity Level** in milliseconds, prioritizing high-risk claims for human review.

### 2. Smart Document Analysis
Upload a raw PDF repair estimate from a body shop. EMA's **Evidence Extractor** agent will:
*   Extract every line item (parts, labor, tax).
*   Identify the vendor.
*   Compare labor rates against regional averages.
*   Flag non-OEM parts if the policy requires them.

### 3. Agentic Workflow
EMA isn't a single script. It's a team of specialized agents:
*   **Orchestrator**: The manager that routes tasks.
*   **Policy Interpreter**: The legal expert that verifies coverage.
*   **Fraud Detector**: The analyst that spots anomalies.

### 4. Interactive "Co-Pilot" Chat
Adjusters can chat with EMA to get answers without digging through files.
*   *"Why was this claim flagged?"*
*   *"Draft a rejection letter for the bumper repair."*
*   *"Summarize the policy limits for this customer."*

---

## 🏗️ Architecture & Technology

EMA is built on a modern, enterprise-grade stack designed for scalability and security.

> **[See the Full Architecture Deep Dive here](ARCHITECTURE.md)** for diagrams and detailed technical explanations.

*   **Frontend**: Next.js 14 (React) + Tailwind CSS
*   **Backend**: FastAPI (Python)
*   **AI Engine**: Azure OpenAI Service (GPT-4o)
*   **Orchestration**: LangChain & LangGraph
*   **Database**: Supabase (PostgreSQL)

---

## 🎬 Demo Walkthrough

Follow this flow to experience the full power of EMA:

### Scene 1: The Command Center
1.  Open the Dashboard. You'll see the **Claims Inbox**.
2.  Notice the "Risk Score" column. EMA has already pre-processed these claims.
3.  Click **"+ New Claim"** to simulate a new accident report. Watch it appear instantly with a calculated confidence score.

### Scene 2: Deep Analysis
1.  Click on a claim (e.g., `CLM-2025-001`).
2.  On the right, see the **Agent Activity Log**. This shows the "thought process" of the AI (e.g., "Verified Coverage", "Flagged Risk").
3.  Click **"View Policy Doc"** on the left.
4.  Click **"Analyze with AI"**. EMA will read the "mock" PDF invoice and extract structured data (Line Items, Total Cost) and run a Fraud Check.

### Scene 3: The Assistant
1.  Close the document modal.
2.  Switch the right-hand tab to **"EMA Assistant"**.
3.  Ask it a question: *"Draft an email to Alice confirming we received her claim."*
4.  EMA generates a professional, context-aware response.

---

## 📦 Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   Python (v3.11+)
*   Supabase Account
*   Azure OpenAI Access

### 1. Clone the Repository
```bash
git clone https://github.com/Kulraj69/ema.git
cd ema
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:
```env
AZURE_OPENAI_API_KEY=your_key
AZURE_OPENAI_ENDPOINT=your_endpoint
AZURE_OPENAI_API_VERSION=2024-08-01-preview
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

Run the server:
```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to launch EMA.

---

## 📄 License
MIT License.
