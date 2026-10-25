# Super Job Search Board 🎯⚡

**The Unified AI Career Command Center**  
Synthesizing the rapid headless ATS auto-filler of [`vamshicreates/job-hunter`](https://github.com/vamshicreates/job-hunter) with the deep reasoning and security gates of [`ai-job-search-dev/ai-job-search`](https://github.com/ai-job-search-dev/ai-job-search).

---

## 🚀 Key Modules & Capabilities

1. **Super Board Discovery & Triage**
   - Multi-board aggregation across Greenhouse, Lever, Ashby, LinkedIn, Indeed, and Wellfound.
   - Headless Chrome/Edge DOM verification confirming HTTP 200 and physically clickable apply buttons.
   - 5-Dimension Candidate Fit Radar (0–100% Score across Skills, Experience, Seniority, Logistics, and Culture).

2. **Deterministic Security Shield (`posting_guard.py`)**
   - Scans untrusted job listings for prompt-injection payloads, zero-width Unicode characters, hidden CSS layers (`display:none`, `font-size:0px`), and ghost job patterns before processing.

3. **Zero-Token Differential ATS Studio**
   - Side-by-side Diff visualizer comparing generic resume bullets against ATS keyword-tailored bullets.
   - Truthful re-framing with zero hallucinations or fabricated credentials.
   - Dual-pass Drafter + Reviewer cover letter generator.
   - 1-click ATS single-column PDF export to isolated `PDFs/` folders.

4. **Approval-Gated Pre-Fill Application Copilot**
   - Interactive Kanban pipeline: `Discovered` ➔ `Tailored` ➔ `Ready` ➔ `Applied` ➔ `Interview` ➔ `Offer`.
   - 1-Click Clipboard launcher for candidate details and custom question answers.
   - Drag-to-bookmarks **⚡ AutoFill Application** bookmarklet.
   - Strict Non-Negotiable Guardrail: Automatically pauses right before the final **Submit** button for human approval.
   - Follow-up tracker: Automatically identifies quiet applications (>10 days) and drafts respectful follow-up notes.

5. **STAR Interview Preparation Simulator**
   - Stage-specific interview dossiers for recruiter screens, technical architecture rounds, system design, and executive sessions.
   - Structured STAR behavioral examples (Situation, Task, Action, Result).
   - "You Don't Have [X]" bridge answers that acknowledge gaps without apology and demonstrate proof of rapid ramp-up.
   - High-conviction reverse interview questions to ask the hiring team.

6. **Market Upskill & Career Gap Heatmap**
   - Frequency radar of demanded skills across all active target requisitions vs. verified profile.
   - Quantified ramp-up time investments (hours) and curated study roadmaps.

---

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

The preview server runs at `http://localhost:5174/`.
