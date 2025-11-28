# EMA Architecture & Technology Deep Dive

This document provides a technical deep dive into **EMA (Enterprise Multi-Agent Assistant)**, explaining how it functions as a "Universal AI Employee" rather than just a chatbot.

## 1. The Core Concept: "Universal AI Employee"

Unlike traditional automation (RPA) which follows rigid rules, or simple chatbots that just answer questions, EMA is an **Agentic System**. It has:
*   **Agency**: The ability to make decisions and take actions (e.g., "This claim looks risky, I should flag it" or "This document is valid, I will extract the data").
*   **State**: It remembers the context of the claim as it moves through different stages.
*   **Specialization**: It uses distinct "agents" for different tasks, mimicking a human team.

## 2. The Agentic Architecture (LangGraph)

EMA is built using **LangGraph**, a library for building stateful, multi-actor applications with LLMs.

### Visualizing the Workflow

```mermaid
graph TD
    Start([New Claim / FNOL]) --> Orchestrator{Orchestrator Agent}
    
    Orchestrator -->|Needs Info| EvidenceExtractor[Evidence Extractor]
    Orchestrator -->|Check Rules| PolicyInterpreter[Policy Interpreter]
    Orchestrator -->|Suspicious| FraudDetector[Fraud Detector]
    
    EvidenceExtractor -->|Structured Data| Orchestrator
    PolicyInterpreter -->|Coverage Status| Orchestrator
    FraudDetector -->|Risk Score| Orchestrator
    
    Orchestrator -->|All Clear| AutoApprove([Auto-Approve & Pay])
    Orchestrator -->|Issues Found| HumanReview([Flag for Human Review])
```

### The "Brain" (Orchestrator Pattern)
Instead of one giant prompt trying to do everything, we break the workflow into specialized nodes.

#### The Agents (Nodes)
1.  **Orchestrator Node**: The manager. It receives the initial claim (FNOL) and decides which specialist needs to see it.
    *   *Input*: "New claim for a rear-end collision."
    *   *Decision*: "Send to Evidence Extractor."
2.  **Evidence Extractor Agent**: The researcher. It looks at unstructured data (PDFs, images, text descriptions).
    *   *Task*: "Read this repair estimate PDF."
    *   *Output*: Structured JSON (Line items, Total Cost, Vendor Name).
3.  **Policy Interpreter Agent**: The lawyer. It compares the extracted evidence against the insurance policy.
    *   *Task*: "Does the policy cover OEM parts for a 2015 Honda?"
    *   *Output*: "Coverage Verified" or "Policy Violation Detected".
4.  **Fraud Detector Agent**: The security guard. It looks for patterns.
    *   *Task*: "Is the labor rate of $150/hr standard for this region?"
    *   *Output*: "Risk Flag: Labor rate 40% above average."

### The Workflow (Edges)
The "State" (a dictionary containing messages, claim data, and errors) is passed along "Edges" between these nodes.
*   `Start` -> `Orchestrator` -> `Evidence Extractor` -> `Policy Interpreter` -> `Fraud Detector` -> `End`

## 3. Technology Stack Explained

### System Architecture Diagram

```mermaid
graph LR
    subgraph Frontend [Next.js Frontend]
        UI[Dashboard UI]
        API_Client[API Client]
    end
    
    subgraph Backend [FastAPI Backend]
        API[API Endpoints]
        Orchestrator[LangGraph Orchestrator]
        Agents[Specialized Agents]
    end
    
    subgraph Cloud [Cloud Services]
        Azure[Azure OpenAI (GPT-4o)]
        SupabaseDB[(Supabase DB)]
        SupabaseStore[Supabase Storage]
    end
    
    UI --> API_Client
    API_Client -->|JSON| API
    API --> Orchestrator
    Orchestrator --> Agents
    Agents -->|Prompts| Azure
    Agents -->|SQL| SupabaseDB
    Agents -->|Files| SupabaseStore
```

### Frontend: The "Command Center"
*   **Next.js 14 (App Router)**: Chosen for its server-side rendering (SEO/Performance) and easy API integration.
*   **Tailwind CSS**: For rapid, responsive, and professional UI development.
*   **React Hooks**: Manages the real-time state of the dashboard (e.g., polling for status updates).

### Backend: The "Nervous System"
*   **FastAPI (Python)**: The industry standard for AI backends. It handles HTTP requests from the frontend and triggers the AI agents.
*   **LangChain & LangGraph**: The framework that structures the LLM calls. It handles the "memory" and the "chaining" of different prompts.
*   **Pydantic**: Ensures data validation. When the AI extracts data, Pydantic forces it into a strict schema (e.g., ensuring "Cost" is always a number, not a string).

### Intelligence: The "Brain"
*   **Azure OpenAI Service**: We use **GPT-4o** (and GPT-4o-mini for lighter tasks).
    *   *Why Azure?* Enterprise-grade security, compliance, and speed.
    *   *Why GPT-4o?* Its multimodal capabilities (reading text and seeing images) are crucial for analyzing claim documents and photos.

### Data Layer: The "Memory"
*   **Supabase (PostgreSQL)**: Stores the structured claim data (Policy Holder, Status, Risk Score).
*   **Supabase Storage**: Acts as the "File Cabinet" for storing the raw PDF documents and images uploaded by users.

## 4. The Complete Process Flow

1.  **Ingestion (FNOL)**:
    *   User clicks "New Claim".
    *   Frontend sends data to FastAPI.
    *   Supabase records the initial claim entry.

2.  **Triage (The "Magic" Moment)**:
    *   As soon as the claim is saved, the **Orchestrator** wakes up.
    *   It reads the incident description.
    *   It assigns an initial "Severity" (Low/Medium/High) and "Confidence Score".

3.  **Deep Analysis (Human-in-the-loop)**:
    *   Adjuster uploads a PDF estimate.
    *   **Evidence Extractor** (GPT-4o) reads the PDF pixel-by-pixel.
    *   It converts "messy" PDF text into clean JSON.
    *   **Fraud Detector** checks this JSON against rules (e.g., "If labor > $100, flag it").

4.  **Action**:
    *   The Adjuster sees the AI's work: "Risk Factors: None".
    *   Adjuster clicks "Approve".
    *   EMA drafts the payment email and updates the database status to "Closed".
