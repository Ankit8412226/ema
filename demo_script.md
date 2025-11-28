# EMA Demo Script & Flow

## Introduction (The "Why")
**Speaker:** "Insurance claims are the moment of truth for customers, but they are bogged down by manual work and fragmented tools. Today, I'm going to show you **EMA**, the Universal AI Employee that doesn't just 'assist' but 'executes' the entire claims lifecycle autonomously."

---

## Scene 1: The Command Center (Dashboard)
**Action:** Start at `/` (Home).
**Script:** "This is the EMA Command Center. Unlike legacy dashboards that just show lists, this is an active workspace."
- **Point out:** "On the left, you see the **Claims Inbox**. Notice the 'Risk Score' column—EMA has already pre-triaged every incoming claim."
- **Action:** Click **"+ New Claim"**.
- **Script:** "When a new claim comes in (FNOL), EMA instantly ingests it. Let's look at a high-risk case."

---

## Scene 2: The Agentic Workflow (Claim Detail)
**Action:** Click on `CLM-2025-001` (Alice Johnson).
**Script:** "Here is the Claim 360 view. But look at the right side—the **Agent Activity Log**."
- **Point out:** "You can see EMA didn't just wait. It 'Analyzed Photos', 'Verified Coverage', and even 'Flagged Risk'. This happened *before* a human even opened the file. That's Agentic AI."

---

## Scene 3: Handling Unstructured Data (The "Wow" Moment)
**Action:** Click **"View Policy Doc"** (Left column).
**Script:** "Claims are messy—PDFs, invoices, photos. Legacy bots break here. EMA thrives here."
- **Action:** Click **"Analyze with AI"**.
- **Script:** "I'm uploading a raw repair estimate. Watch EMA read it in real-time using our Azure OpenAI backend."
- **Wait:** Let the spinner finish and data populate.
- **Script:** "Boom. It extracted every line item, calculated the total, and—crucially—checked it against the policy logic. It found a risk: 'Labor rate too high'."
- **Action:** Click **"Approve Estimate"**.
- **Script:** "I can override or approve with one click. Payment is scheduled. The loop is closed."

---

## Scene 4: Deep Dive & Chat (Restored Feature)
**Action:** Close the modal. Switch the right tab to **"EMA Assistant"**.
**Script:** "If I need to dig deeper, I don't dig through files. I just ask EMA."
- **Action:** Type: "Why was this flagged?" (Simulate chat).
- **Script:** "EMA has the full context of the claim, the policy, and the documents. It's like having your best adjuster sitting right next to you."

---

## Scene 5: Analytics (The Executive View)
**Action:** Click **"Analytics"** in the sidebar.
**Script:** "Finally, for the COO, we have the 30,000-foot view."
- **Point out:** "Auto-Approval Rate (45%) and Cost Savings. This isn't just efficiency; it's direct P&L impact."

---

## Closing
**Speaker:** "This is EMA. It turns the 2-week claims cycle into a 2-minute review. It handles the grunt work—reading, extracting, checking—so your humans can focus on the customer. Thank you."
