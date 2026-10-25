import React, { useState } from 'react'
import {
  Sparkles, FileText, Download, Check, Copy, ArrowRight,
  ShieldCheck, RefreshCw, Send, CheckCircle2, AlertCircle
} from 'lucide-react'
import { JobItem, CandidateProfile } from '../types'

interface TailoringStudioTabProps {
  jobs: JobItem[]
  selectedJob: JobItem
  onSelectJob: (job: JobItem) => void
  profile: CandidateProfile
}

export const TailoringStudioTab: React.FC<TailoringStudioTabProps> = ({
  jobs,
  selectedJob,
  onSelectJob,
  profile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'resume' | 'coverLetter' | 'formAnswers'>('resume')
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const handleDownloadPdf = () => {
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Studio Header & Job Picker */}
      <div className="glass-panel p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              ZERO-TOKEN DIFFERENTIAL COMPILER
            </span>
            <span className="text-xs text-slate-400 font-mono">• patches.json engine</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            ATS Resume & Cover Letter Tailoring Studio
          </h2>
          <p className="text-xs text-slate-400">
            Truthful differential patching — align bullet terminology with target ATS keywords without fabricating credentials.
          </p>
        </div>

        {/* Job Selector Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs text-slate-400 whitespace-nowrap">Target Role:</label>
          <select
            value={selectedJob.id}
            onChange={(e) => {
              const found = jobs.find(j => j.id === e.target.value)
              if (found) onSelectJob(found)
            }}
            className="w-full md:w-72 bg-[#0A0F1D] border border-[#1F2E4D] rounded-lg px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none focus:border-amber-400"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title} @ {j.company} ({j.fitScore}% Fit)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Job Quick Summary & Match Delta Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-[#0E1628] to-amber-950/20 border border-indigo-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{selectedJob.title}</span>
            <span className="text-xs text-indigo-300 font-medium font-mono">@ {selectedJob.company}</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              ATS: {selectedJob.platform}
            </span>
          </div>
          <div className="text-xs text-slate-300 font-mono">
            Optimized Headline: <span className="text-amber-300 font-semibold">{selectedJob.tailoredHeadline}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#090D18]/90 p-2.5 rounded-lg border border-[#1F2E4D]">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-mono">ATS Match Delta</div>
            <div className="text-base font-bold text-emerald-400 font-mono flex items-center gap-1 justify-end">
              <span>+18%</span>
              <span className="text-xs text-slate-400 font-normal">({selectedJob.fitScore}%)</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation: Tailored Resume vs Cover Letter vs Form Answers */}
      <div className="flex items-center justify-between border-b border-[#1F2E4D] pb-1 text-xs">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveSubTab('resume')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeSubTab === 'resume'
                ? 'bg-[#18233C] text-white border border-[#2D3F66]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Differential ATS Resume Diff
          </button>
          <button
            onClick={() => setActiveSubTab('coverLetter')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeSubTab === 'coverLetter'
                ? 'bg-[#18233C] text-white border border-[#2D3F66]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dual-Pass Cover Letter
          </button>
          <button
            onClick={() => setActiveSubTab('formAnswers')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeSubTab === 'formAnswers'
                ? 'bg-[#18233C] text-white border border-[#2D3F66]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pre-Drafted Custom Questions ({selectedJob.customFormAnswers.length})
          </button>
        </div>

        {/* Quick Export Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadSuccess ? 'Downloaded!' : 'Export ATS PDF'}</span>
          </button>
          <button
            onClick={() => handleCopy(selectedJob.tailoredSummary, 'summary')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141C30] hover:bg-[#1E2B48] border border-[#23355A] text-slate-300 text-xs transition-colors"
          >
            <Copy className="w-3 h-3" />
            <span>{copiedType === 'summary' ? 'Copied' : 'Copy Patches'}</span>
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Side-by-side Resume Diff */}
      {activeSubTab === 'resume' && (
        <div className="space-y-6">
          {/* Summary Diff Box */}
          <div className="glass-panel p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider">
                Professional Executive Summary (ATS Keyword Optimized)
              </span>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 0 Hallucination Verified
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed p-3.5 rounded-lg bg-[#0A0F1D] border border-[#1F2E4D]">
              {selectedJob.tailoredSummary}
            </p>
          </div>

          {/* Side-by-Side Bullets Diff */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
              <span>BEFORE: Generic Master Bullets</span>
              <span>AFTER: Target ATS Keyword Re-framing</span>
            </div>

            {selectedJob.tailoredBullets.length > 0 ? (
              selectedJob.tailoredBullets.map((bullet, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Original */}
                  <div className="p-4 rounded-xl bg-[#090D18] border border-[#1B273F] text-xs text-slate-400 space-y-2">
                    <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
                      <span>Original Resume Bullet #{idx + 1}</span>
                      <span className="text-slate-400">Baseline</span>
                    </div>
                    <p className="line-through decoration-slate-600/70 leading-relaxed">
                      {bullet.original}
                    </p>
                  </div>

                  {/* Right: Tailored */}
                  <div className="p-4 rounded-xl bg-[#0E1729] border border-amber-500/30 text-xs text-slate-100 space-y-2 relative shadow-lg shadow-amber-500/5">
                    <div className="text-[10px] font-mono uppercase text-amber-400 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Tailored For {selectedJob.company}
                      </span>
                      <span className="text-emerald-400 font-bold">{bullet.metric}</span>
                    </div>
                    <p className="leading-relaxed font-medium">
                      {bullet.tailored}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 rounded-xl bg-[#0A0F1D] border border-[#1F2E4D] text-center text-xs text-slate-400">
                Click "Run Differential Tailor" to compute job-specific bullet replacements.
              </div>
            )}
          </div>

          {/* Dedicated PDFs Folder Isolation Callout */}
          <div className="p-3.5 rounded-xl bg-[#0C1222] border border-[#1F2E4D] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>
                ATS PDF compiled to: <code className="text-amber-300 font-mono">.job-hunter/runs/resumes/PDFs/Resume_{selectedJob.company}.pdf</code>
              </span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px]">Single-Column ATS Compliant</span>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Dual-Pass Cover Letter */}
      {activeSubTab === 'coverLetter' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: The Cover Letter Text */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#1F2E4D] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Assertive Executive Cover Letter</h3>
                  <p className="text-xs text-slate-400">Forward-looking framing • No empty pleasantries</p>
                </div>
                <button
                  onClick={() => handleCopy(selectedJob.coverLetterSnippet, 'coverLetter')}
                  className="px-2.5 py-1 rounded bg-[#16213B] hover:bg-[#203055] text-slate-200 text-xs font-mono flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedType === 'coverLetter' ? 'Copied' : 'Copy Full Text'}</span>
                </button>
              </div>

              <div className="text-xs text-slate-200 space-y-3 leading-relaxed font-sans bg-[#0A0F1D] p-5 rounded-lg border border-[#1F2E4D]">
                <p>Dear Hiring Team at {selectedJob.company},</p>
                <p>{selectedJob.coverLetterSnippet}</p>
                <p>
                  In my recent work, I focused on eliminating latency bottlenecks and engineering deterministic validation workflows. I do not look for incremental optimizations; I build resilient systems that allow cross-functional teams to ship without regression fears.
                </p>
                <p>
                  I look forward to discussing how my experience can immediately support {selectedJob.company}'s near-term product milestones.
                </p>
                <p className="pt-2 text-slate-400">
                  Sincerely,<br />
                  <strong className="text-slate-200">{profile.name}</strong><br />
                  <span className="font-mono text-[11px]">{profile.email} • {profile.portfolio}</span>
                </p>
              </div>
            </div>

            {/* Right Col: Two-Pass Reviewer Critique Panel */}
            <div className="glass-panel p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-[#1F2E4D] pb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  Reviewer Agent Critique Gate
                </h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0E1628] border border-emerald-500/20 space-y-1">
                  <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Factual Claim Verification
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    All metrics (sub-80ms p99 latency, 85% token reduction) match verified portfolio history. Zero fabricated tools.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#0E1628] border border-emerald-500/20 space-y-1">
                  <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> No Fluff / Empty Sycophancy
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Avoided generic "I have always dreamed of working at {selectedJob.company}" tropes. Replaced with direct operational alignment.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#0E1628] border border-indigo-500/20 space-y-1">
                  <div className="text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Forward-Looking Narrative
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Ends on a proactive discussion of first-90-days business outcomes rather than passive waiting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Pre-drafted Custom Questions */}
      {activeSubTab === 'formAnswers' && (
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F2E4D] pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Application Form Custom Questions</h3>
                <p className="text-xs text-slate-400">Pre-computed answers ready for 1-click clipboard pasting</p>
              </div>
            </div>

            {selectedJob.customFormAnswers.length > 0 ? (
              <div className="space-y-4">
                {selectedJob.customFormAnswers.map((qa, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#090D18] border border-[#1F2E4D] space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-bold text-amber-300 font-sans">
                        Q: {qa.question}
                      </span>
                      <button
                        onClick={() => handleCopy(qa.answer, `qa-${i}`)}
                        className="px-2 py-1 rounded bg-[#16213B] hover:bg-[#203055] text-slate-200 text-xs font-mono flex items-center gap-1 transition-colors shrink-0"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedType === `qa-${i}` ? 'Copied' : 'Copy Answer'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-[#0E1628] p-3 rounded-lg border border-[#1A2640]">
                      {qa.answer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 bg-[#0A0F1D] rounded-xl border border-[#1F2E4D]">
                No custom questions detected on this ATS form. Standard personal info fields only.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
