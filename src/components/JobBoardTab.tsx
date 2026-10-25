import React, { useState } from 'react'
import {
  Search, Shield, CheckCircle2, AlertTriangle, ExternalLink,
  Sparkles, Filter, ChevronRight, X, ArrowUpRight, Copy, Terminal, AlertOctagon
} from 'lucide-react'
import { JobItem } from '../types'

interface JobBoardTabProps {
  jobs: JobItem[]
  onSelectJobForTailoring: (job: JobItem) => void
  onSelectJobForCopilot: (job: JobItem) => void
}

export const JobBoardTab: React.FC<JobBoardTabProps> = ({
  jobs,
  onSelectJobForTailoring,
  onSelectJobForCopilot
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All')
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All')
  const [minScore, setMinScore] = useState<number>(0)
  const [onlySecurityClean, setOnlySecurityClean] = useState(false)
  const [inspectedJob, setInspectedJob] = useState<JobItem | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const platforms = ['All', 'Greenhouse', 'Lever', 'Ashby', 'LinkedIn', 'Indeed', 'Wellfound']
  const workModes = ['All', 'Remote', 'Hybrid', 'On-site']

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.dimensions.skillsMatch.matched.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesPlatform = selectedPlatform === 'All' || job.platform === selectedPlatform
    const matchesWorkMode = selectedWorkMode === 'All' || job.workMode === selectedWorkMode
    const matchesScore = job.fitScore >= minScore
    const matchesSecurity = !onlySecurityClean || job.securityClean

    return matchesSearch && matchesPlatform && matchesWorkMode && matchesScore && matchesSecurity
  })

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="glass-panel p-4 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search across Greenhouse, Lever, Ashby, LinkedIn, Indeed by role, company, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0A0F1D] border border-[#1F2E4D] rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/70 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A0F1D] border border-[#1F2E4D] text-xs text-slate-300 cursor-pointer hover:border-slate-600 transition-colors">
              <input
                type="checkbox"
                checked={onlySecurityClean}
                onChange={(e) => setOnlySecurityClean(e.target.checked)}
                className="rounded border-[#1F2E4D] text-amber-500 focus:ring-amber-400 bg-[#080C15]"
              />
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Security Shield Clean Only</span>
            </label>
          </div>
        </div>

        {/* Filters pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#1F2E4D]/60 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Platform:
            </span>
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedPlatform === p
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                    : 'bg-[#121B2F] text-slate-400 hover:text-slate-200 border border-[#1F2E4D]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Mode:</span>
              {workModes.map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedWorkMode(m)}
                  className={`px-2 py-0.5 rounded text-[11px] ${
                    selectedWorkMode === m
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Min Fit:</span>
              <select
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="bg-[#0A0F1D] border border-[#1F2E4D] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
              >
                <option value={0}>All Scores</option>
                <option value={80}>≥ 80% (High Match)</option>
                <option value={90}>≥ 90% (Top Tier)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & Quick Status */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <span className="text-slate-200 font-semibold">{filteredJobs.length}</span> verified requisitions
          {selectedPlatform !== 'All' && <span> on <strong className="text-amber-400">{selectedPlatform}</strong></span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> DOM Button Physically Verified
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> 5D Fit Scored
          </span>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => {
          const isHighMatch = job.fitScore >= 85
          const isMediumMatch = job.fitScore >= 65 && job.fitScore < 85

          return (
            <div
              key={job.id}
              className={`glass-panel p-5 rounded-xl transition-all relative flex flex-col justify-between border ${
                job.securityClean
                  ? 'hover:border-amber-400/40 hover:bg-[#121B2F]/80'
                  : 'border-rose-900/60 bg-rose-950/10'
              }`}
            >
              <div>
                {/* Card Top: Platform + Fit Score Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#16213B] text-slate-300 border border-[#23355A]">
                      {job.platform}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      job.workMode === 'Remote'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : job.workMode === 'Hybrid'
                        ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        : 'bg-slate-700/30 text-slate-300 border border-slate-600/30'
                    }`}>
                      {job.workMode}
                    </span>
                  </div>

                  <div className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs flex items-center gap-1 shadow-sm ${
                    isHighMatch
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : isMediumMatch
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    <span>{job.fitScore}%</span>
                  </div>
                </div>

                {/* Role Title and Company */}
                <h3 className="font-bold text-base text-white tracking-tight line-clamp-1 mb-0.5">
                  {job.title}
                </h3>
                <div className="text-xs text-slate-300 font-medium mb-3 flex items-center justify-between">
                  <span>{job.company}</span>
                  <span className="text-slate-400 font-mono text-[11px]">{job.postedDate}</span>
                </div>

                {/* Salary & Location */}
                <div className="p-2.5 rounded-lg bg-[#0A0F1D]/70 border border-[#1A2640] mb-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-300 font-medium">
                    <span className="text-amber-400 font-mono">{job.salaryRange}</span>
                    <span className="text-slate-400 text-[11px]">{job.location}</span>
                  </div>
                </div>

                {/* Security and DOM badges */}
                <div className="flex items-center gap-2 mb-3 text-[11px]">
                  {job.securityClean ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <Shield className="w-3 h-3" /> Clean Security Gate
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      <AlertOctagon className="w-3 h-3" /> Security Flags Detected
                    </span>
                  )}
                  {job.domVerified && (
                    <span className="flex items-center gap-1 text-sky-400 font-mono bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Active DOM
                    </span>
                  )}
                </div>

                {/* Matched Skills pills */}
                <div className="mb-4">
                  <div className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
                    <span>Matched Core Skills:</span>
                    <span className="font-mono text-amber-400">{job.dimensions.skillsMatch.matched.length} matched</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.dimensions.skillsMatch.matched.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#16213B] text-slate-300 border border-[#23355A]">
                        {skill}
                      </span>
                    ))}
                    {job.dimensions.skillsMatch.matched.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                        +{job.dimensions.skillsMatch.matched.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Knockout / Caution alert preview */}
                {job.knockoutRisks.length > 0 && (
                  <div className="mb-3 p-2 rounded bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-300 flex items-start gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{job.knockoutRisks[0]}</span>
                  </div>
                )}
                {job.cautions.length > 0 && job.knockoutRisks.length === 0 && (
                  <div className="mb-3 p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{job.cautions[0]}</span>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#1F2E4D]/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => setInspectedJob(job)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#121A2D] hover:bg-[#1A2640] border border-[#23355A] text-slate-300 text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <span>Inspect 5D Fit</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectJobForTailoring(job)}
                    className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 transition-colors title='Differential Tailor'"
                    title="Open in Differential ATS Tailor Studio"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectJobForCopilot(job)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>Auto-Fill</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Inspect 5D Fit Modal / Drawer */}
      {inspectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-2xl border border-slate-700 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#1F2E4D] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-[#16213B] text-slate-300 border border-[#23355A]">
                    {inspectedJob.platform}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    HTTP 200 • Verified Active Requisition
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">{inspectedJob.title}</h2>
                <p className="text-sm text-slate-300">{inspectedJob.company} • {inspectedJob.location} • <span className="text-amber-400 font-mono">{inspectedJob.salaryRange}</span></p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Overall Fit Score</div>
                  <div className="text-2xl font-bold text-amber-400 font-mono">{inspectedJob.fitScore}%</div>
                </div>
                <button
                  onClick={() => setInspectedJob(null)}
                  className="p-1.5 rounded-lg bg-[#121B2F] hover:bg-[#1A2640] text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Direct Requisition Link & Copy Bar */}
            <div className="p-3 rounded-lg bg-[#0A0F1D] border border-[#1F2E4D] flex items-center justify-between gap-3 text-xs">
              <div className="truncate font-mono text-slate-300">
                <span className="text-slate-400">Direct Requisition URL: </span>
                <span className="text-sky-400 underline">{inspectedJob.url}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(inspectedJob.url)}
                  className="px-2.5 py-1 rounded bg-[#16213B] hover:bg-[#203055] text-slate-200 transition-colors flex items-center gap-1 font-mono text-[11px]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedUrl === inspectedJob.url ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <a
                  href={inspectedJob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-colors flex items-center gap-1 text-[11px]"
                >
                  <span>Open ATS Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 5-Dimension Fit Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                5-Dimension Candidate Match Radar
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* D1: Technical Skills */}
                <div className="p-3 rounded-xl bg-[#0E1526] border border-[#1A2640] space-y-2">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-200">1. Technical & Core Skills</span>
                    <span className="font-mono text-amber-400 font-bold">{inspectedJob.dimensions.skillsMatch.score}%</span>
                  </div>
                  <div className="w-full bg-[#1A2640] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${inspectedJob.dimensions.skillsMatch.score}%` }}></div>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-emerald-400">Matched ({inspectedJob.dimensions.skillsMatch.matched.length}):</strong> {inspectedJob.dimensions.skillsMatch.matched.join(', ')}
                  </div>
                  {inspectedJob.dimensions.skillsMatch.missing.length > 0 && (
                    <div className="text-[11px] text-slate-400">
                      <strong className="text-amber-400">Missing/Secondary:</strong> {inspectedJob.dimensions.skillsMatch.missing.join(', ')}
                    </div>
                  )}
                </div>

                {/* D2: Experience Domain */}
                <div className="p-3 rounded-xl bg-[#0E1526] border border-[#1A2640] space-y-2">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-200">2. Direct Experience & Domain</span>
                    <span className="font-mono text-indigo-400 font-bold">{inspectedJob.dimensions.experienceDomain.score}%</span>
                  </div>
                  <div className="w-full bg-[#1A2640] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${inspectedJob.dimensions.experienceDomain.score}%` }}></div>
                  </div>
                  <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-0.5">
                    {inspectedJob.dimensions.experienceDomain.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                {/* D3: Seniority & YoE */}
                <div className="p-3 rounded-xl bg-[#0E1526] border border-[#1A2640] space-y-2">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-200">3. Seniority & YoE Alignment</span>
                    <span className="font-mono text-sky-400 font-bold">{inspectedJob.dimensions.seniorityYoE.score}%</span>
                  </div>
                  <div className="w-full bg-[#1A2640] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full rounded-full" style={{ width: `${inspectedJob.dimensions.seniorityYoE.score}%` }}></div>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Role requires <strong className="text-slate-200">{inspectedJob.dimensions.seniorityYoE.requiredYoE}+ years</strong>. Candidate has <strong className="text-emerald-400">{inspectedJob.dimensions.seniorityYoE.candidateYoE} verified years</strong>.
                  </div>
                </div>

                {/* D4: Location & Logistics */}
                <div className="p-3 rounded-xl bg-[#0E1526] border border-[#1A2640] space-y-2">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-200">4. Location & Work Mode Fit</span>
                    <span className="font-mono text-emerald-400 font-bold">{inspectedJob.dimensions.locationLogistics.score}%</span>
                  </div>
                  <div className="w-full bg-[#1A2640] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${inspectedJob.dimensions.locationLogistics.score}%` }}></div>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {inspectedJob.dimensions.locationLogistics.details}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Shield & Integrity Gate Findings */}
            <div className={`p-4 rounded-xl border ${
              inspectedJob.securityClean
                ? 'bg-emerald-500/5 border-emerald-500/20'
                : 'bg-rose-500/10 border-rose-500/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Shield className={`w-4 h-4 ${inspectedJob.securityClean ? 'text-emerald-400' : 'text-rose-400'}`} />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-200">
                  Deterministic Security & Integrity Gate (`posting_guard.py`)
                </h4>
              </div>
              {inspectedJob.securityClean ? (
                <p className="text-xs text-slate-300">
                  ✅ <strong>0 Prompt Injections Detected</strong>: Verified clean against Unicode bidirectional overrides, hidden CSS layers (<code className="text-slate-400">display:none</code>, <code className="text-slate-400">font-size:0</code>), zero-width characters, and instruction tampering. Safe to ingest.
                </p>
              ) : (
                <div className="space-y-1.5 text-xs text-rose-300">
                  <p className="font-semibold">⚠️ Suspicious patterns flagged in job description payload:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {inspectedJob.securityFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Knockout Risks and Cautions */}
            {(inspectedJob.knockoutRisks.length > 0 || inspectedJob.cautions.length > 0) && (
              <div className="p-4 rounded-xl bg-[#0E1526] border border-[#1A2640] space-y-3 text-xs">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
                  Application Caution & Knockout Recon
                </h4>
                {inspectedJob.knockoutRisks.map((k, i) => (
                  <div key={i} className="flex items-start gap-2 text-rose-300 bg-rose-500/10 p-2 rounded border border-rose-500/20">
                    <AlertOctagon className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    <span><strong>Knockout Warning:</strong> {k}</span>
                  </div>
                ))}
                {inspectedJob.cautions.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-amber-300 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#1F2E4D] flex items-center justify-between">
              <button
                onClick={() => setInspectedJob(null)}
                className="px-4 py-2 rounded-lg bg-[#121B2F] hover:bg-[#1A2640] text-slate-300 text-xs font-medium transition-colors"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const job = inspectedJob
                    setInspectedJob(null)
                    onSelectJobForTailoring(job)
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tailor ATS Resume</span>
                </button>
                <button
                  onClick={() => {
                    const job = inspectedJob
                    setInspectedJob(null)
                    onSelectJobForCopilot(job)
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Launch Auto-Fill Copilot</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
