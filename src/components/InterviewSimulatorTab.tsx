import React, { useState } from 'react'
import {
  Mic, User, Sparkles, MessageSquare, HelpCircle,
  CheckCircle2, ArrowRight, ShieldCheck, Copy
} from 'lucide-react'
import { JobItem, CandidateProfile } from '../types'

interface InterviewSimulatorTabProps {
  jobs: JobItem[]
  selectedJob: JobItem
  onSelectJob: (job: JobItem) => void
  profile: CandidateProfile
}

export const InterviewSimulatorTab: React.FC<InterviewSimulatorTabProps> = ({
  jobs,
  selectedJob,
  onSelectJob,
  profile
}) => {
  const [selectedStage, setSelectedStage] = useState<'screening' | 'technical' | 'system' | 'final'>('technical')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const starStories = [
    {
      id: 'star-1',
      question: `Walk me through a time you tackled high-throughput bottlenecks under tight deadlines in a role like ${selectedJob.title}.`,
      situation: `At ${profile.workExperience[0]?.company || 'my recent role'}, our ingestion pipeline experienced latency spikes under heavy concurrent workloads.`,
      task: `I took ownership of diagnosing the bottleneck and architecting a zero-regression solution within a two-week sprint.`,
      action: `I profiled the database queries, introduced Redis caching with aggressive invalidation policies, and optimized AST transformation routines in Python.`,
      result: `Reduced p99 latency by 38% and reduced API infrastructure token consumption by 85%, handling over 100k requests with zero downtime.`
    },
    {
      id: 'star-2',
      question: `Describe a situation where project requirements were ambiguous or conflicting across engineering and design stakeholders.`,
      situation: `We needed to release a complex multi-platform inspection workflow with tight security requirements, but technical specifications were rapidly shifting.`,
      task: `Establish clear component contracts, build automated verification testbeds, and maintain engineering velocity.`,
      action: `I built lightweight interactive prototypes, defined a shared JSON state schema, and instituted asynchronous pull request reviews.`,
      result: `Delivered the unified framework 4 days ahead of schedule, which subsequently became the company-wide architecture standard.`
    }
  ]

  const bridgeAnswers = [
    {
      id: 'bridge-1',
      probe: `Our stack relies heavily on Go and microservice service-meshes, but your primary background is in Python, TypeScript, and distributed pipelines.`,
      strategy: `Acknowledge directly ➔ Bridge to identical concurrency primitives ➔ Proof of rapid ramp-up`,
      script: `That's an accurate observation: my primary production systems were engineered around Python, FastAPI, and TypeScript. However, the core concurrency paradigms—goroutines vs. async event loops, channel synchronization, and connection pooling—are architectural concepts I work with daily. When ramping up on adjacent technologies previously, I reached production merge velocity within 10 days.`
    },
    {
      id: 'bridge-2',
      probe: `How do you stay aligned with distributed teammates across different timezones without excessive synchronous meetings?`,
      strategy: `Async-first documentation ➔ High-visibility PR contracts ➔ Transparent status logs`,
      script: `I prioritize async-first operational hygiene. Every architectural decision is recorded in concise RFCs with clear tradeoff rationale. Pull requests include explicit video walk-throughs or automated sandbox URLs, allowing teammates across any timezone to review without blocking.`
    }
  ]

  const questionsForInterviewer = [
    `What does success look like for the first 90 days in this ${selectedJob.title} position?`,
    `What is currently the single largest architectural bottleneck your team is actively refactoring at ${selectedJob.company}?`,
    `How does the engineering culture at ${selectedJob.company} balance rapid shipping velocity with test-driven regression prevention?`,
    `What surprised you most about joining ${selectedJob.company} compared to your expectations?`
  ]

  return (
    <div className="space-y-6">
      {/* Simulator Header */}
      <div className="glass-panel p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
              STAR INTERVIEW SIMULATOR
            </span>
            <span className="text-xs text-slate-400 font-mono">• stage-specific prep pack</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Interview Preparation & STAR Bridge Engine
          </h2>
          <p className="text-xs text-slate-400">
            Pre-computed STAR behavioral answers, gap bridge responses, and high-conviction questions for {selectedJob.company}.
          </p>
        </div>

        {/* Target Job Selector */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs text-slate-400 whitespace-nowrap">Target Role:</label>
          <select
            value={selectedJob.id}
            onChange={(e) => {
              const found = jobs.find(j => j.id === e.target.value)
              if (found) onSelectJob(found)
            }}
            className="w-full md:w-72 bg-[#0A0F1D] border border-[#1F2E4D] rounded-lg px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title} @ {j.company}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stage Switcher Pills */}
      <div className="flex items-center gap-2 border-b border-[#1F2E4D] pb-3 text-xs">
        <span className="text-slate-400 mr-2">Interview Stage:</span>
        {[
          { id: 'screening', label: '1. Recruiter Screen' },
          { id: 'technical', label: '2. Technical & Domain Round' },
          { id: 'system', label: '3. System Architecture' },
          { id: 'final', label: '4. Executive / Culture' }
        ].map(stage => (
          <button
            key={stage.id}
            onClick={() => setSelectedStage(stage.id as any)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedStage === stage.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 bg-[#0E1526] border border-[#1F2E4D]'
            }`}
          >
            {stage.label}
          </button>
        ))}
      </div>

      {/* STAR Behavioral Responses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Target Behavioral Questions (STAR Method)</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Mapped to {selectedJob.company} requirements</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {starStories.map((story) => (
            <div key={story.id} className="glass-panel p-5 rounded-xl space-y-3 flex flex-col justify-between border hover:border-amber-400/40 transition-colors">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-amber-300">
                    Q: "{story.question}"
                  </span>
                  <button
                    onClick={() => handleCopy(`${story.situation}\n${story.task}\n${story.action}\n${story.result}`, story.id)}
                    className="p-1 rounded bg-[#16213B] text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Copy response"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#0A0F1D] border border-[#1A2640]">
                    <strong className="text-slate-400 font-mono text-[11px] block mb-0.5">SITUATION</strong>
                    <p className="text-slate-200 leading-relaxed">{story.situation}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0A0F1D] border border-[#1A2640]">
                    <strong className="text-slate-400 font-mono text-[11px] block mb-0.5">TASK</strong>
                    <p className="text-slate-200 leading-relaxed">{story.task}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0A0F1D] border border-[#1A2640]">
                    <strong className="text-slate-400 font-mono text-[11px] block mb-0.5">ACTION</strong>
                    <p className="text-slate-200 leading-relaxed">{story.action}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0E1B2D] border border-emerald-500/30">
                    <strong className="text-emerald-400 font-mono text-[11px] block mb-0.5">MEASURABLE RESULT</strong>
                    <p className="text-emerald-200 font-medium leading-relaxed">{story.result}</p>
                  </div>
                </div>
              </div>

              {copiedId === story.id && (
                <div className="text-[11px] text-emerald-400 font-mono text-right">
                  Copied STAR framework to clipboard!
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* "You Don't Have [X]" Gap Bridge Scripts */}
      <div className="glass-panel p-5 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#1F2E4D] pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>"You Don't Have [X]" Gap Bridge Scripts</span>
            </h3>
            <p className="text-xs text-slate-400">Never apologize for missing tools; acknowledge, bridge, and prove rapid ramp-up.</p>
          </div>
        </div>

        <div className="space-y-3">
          {bridgeAnswers.map((b) => (
            <div key={b.id} className="p-4 rounded-xl bg-[#0A0F1D] border border-[#1F2E4D] space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-rose-300">
                  ⚠️ Potential Interview Probe: "{b.probe}"
                </span>
                <button
                  onClick={() => handleCopy(b.script, b.id)}
                  className="px-2 py-1 rounded bg-[#16213B] text-slate-300 text-xs font-mono hover:bg-[#203055] transition-colors shrink-0"
                >
                  {copiedId === b.id ? 'Copied' : 'Copy Script'}
                </button>
              </div>

              <div className="text-[11px] text-indigo-300 font-mono">
                Strategy: {b.strategy}
              </div>

              <p className="text-xs text-slate-200 leading-relaxed p-3 rounded-lg bg-[#0E1628] border border-[#1A2640]">
                "{b.script}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* High-Impact Questions for Interviewer */}
      <div className="glass-panel p-5 rounded-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <span>High-Conviction Questions to Ask the Interviewer</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {questionsForInterviewer.map((q, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-[#0A0F1D] border border-[#1A2640] text-slate-200 flex items-start gap-2">
              <span className="font-mono text-amber-400 font-bold">0{idx + 1}.</span>
              <span className="leading-relaxed">{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
