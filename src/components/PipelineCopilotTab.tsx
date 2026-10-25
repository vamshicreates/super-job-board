import React, { useState } from 'react'
import {
  Terminal, ShieldAlert, ArrowRight, ExternalLink, Clock,
  Mail, CheckCircle2, ChevronRight, Copy, Sparkles, AlertCircle
} from 'lucide-react'
import { JobItem, CandidateProfile } from '../types'

interface PipelineCopilotTabProps {
  jobs: JobItem[]
  onUpdateJobStatus: (jobId: string, newStatus: JobItem['status']) => void
  profile: CandidateProfile
}

export const PipelineCopilotTab: React.FC<PipelineCopilotTabProps> = ({
  jobs,
  onUpdateJobStatus,
  profile
}) => {
  const [selectedJobForCopilot, setSelectedJobForCopilot] = useState<JobItem>(jobs[0])
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<'followup' | 'thankyou' | null>(null)
  const [modalJob, setModalJob] = useState<JobItem | null>(null)

  const columns: { id: JobItem['status']; label: string; color: string }[] = [
    { id: 'discovered', label: 'Discovered', color: 'border-slate-600/40 text-slate-300' },
    { id: 'tailored', label: 'Tailored', color: 'border-indigo-500/40 text-indigo-300' },
    { id: 'ready', label: 'Ready to Apply', color: 'border-amber-500/40 text-amber-300' },
    { id: 'applied', label: 'Applied', color: 'border-sky-500/40 text-sky-300' },
    { id: 'interview', label: 'Interviewing', color: 'border-emerald-500/40 text-emerald-300' },
    { id: 'offer', label: 'Offer Received', color: 'border-yellow-400 text-yellow-300' }
  ]

  const handleCopy = (val: string, label: string) => {
    navigator.clipboard.writeText(val)
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // Quiet applications (>10 days)
  const quietJobs = jobs.filter(j => j.status === 'applied' && j.appliedDate && j.appliedDate <= '2026-10-15')

  return (
    <div className="space-y-6">
      {/* Header & Non-Negotiable Guardrail Banner */}
      <div className="glass-panel p-5 rounded-xl space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                APPROVAL-GATED APPLICATION COPILOT
              </span>
              <span className="text-xs text-slate-400 font-mono">• pause before submit</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Application Pipeline & Auto-Fill Copilot
            </h2>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Strict Rule: The copilot pre-fills your fields but <strong>never clicks Submit</strong> without your final review.</span>
          </div>
        </div>
      </div>

      {/* Quiet Applications Alert Banner */}
      {quietJobs.length > 0 && (
        <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-300">
            <Clock className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>{quietJobs.length} Quiet Applications</strong>: No response for over 10 days on <strong>{quietJobs.map(j => `${j.company}`).join(', ')}</strong>.
            </span>
          </div>
          <div className="flex items-center gap-2">
            {quietJobs.map(j => (
              <button
                key={j.id}
                onClick={() => {
                  setModalJob(j)
                  setActiveModal('followup')
                }}
                className="px-2.5 py-1 rounded bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-200 text-[11px] font-medium transition-colors"
              >
                Draft Follow-Up ({j.company})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {columns.map(col => {
          const colJobs = jobs.filter(j => j.status === col.id)
          return (
            <div key={col.id} className="glass-panel p-3 rounded-xl flex flex-col min-h-[420px]">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1F2E4D]">
                <span className={`text-xs font-bold font-mono uppercase ${col.color}`}>
                  {col.label}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#16213B] text-slate-300">
                  {colJobs.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {colJobs.map(job => (
                  <div
                    key={job.id}
                    className="p-3 rounded-lg bg-[#0A0F1D] border border-[#1A2640] hover:border-amber-400/50 transition-all space-y-2 cursor-pointer"
                    onClick={() => setSelectedJobForCopilot(job)}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-white line-clamp-1">{job.company}</span>
                      <span className="text-amber-400 font-mono text-[10px]">{job.fitScore}%</span>
                    </div>

                    <div className="text-xs text-slate-300 line-clamp-1">{job.title}</div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#1F2E4D]/60">
                      <span className="font-mono">{job.platform}</span>

                      {/* Stage changer quick arrows */}
                      <div className="flex items-center gap-1">
                        {col.id !== 'discovered' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              const prevIdx = columns.findIndex(c => c.id === col.id) - 1
                              if (prevIdx >= 0) onUpdateJobStatus(job.id, columns[prevIdx].id)
                            }}
                            className="p-0.5 hover:text-white"
                            title="Move back"
                          >
                            ←
                          </button>
                        )}
                        {col.id !== 'offer' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              const nextIdx = columns.findIndex(c => c.id === col.id) + 1
                              if (nextIdx < columns.length) onUpdateJobStatus(job.id, columns[nextIdx].id)
                            }}
                            className="p-0.5 text-amber-400 hover:text-amber-300"
                            title="Advance stage"
                          >
                            →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {colJobs.length === 0 && (
                  <div className="h-28 border border-dashed border-[#1F2E4D]/60 rounded-lg flex items-center justify-center text-[11px] text-slate-400">
                    Empty Stage
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Job Auto-Fill Copilot Tray */}
      <div className="glass-panel p-6 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[#1F2E4D] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE APPLICATION COPILOT
              </span>
              <span className="text-xs text-slate-400 font-mono">• {selectedJobForCopilot.platform}</span>
            </div>
            <h3 className="text-base font-bold text-white">
              {selectedJobForCopilot.title} @ {selectedJobForCopilot.company}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={selectedJobForCopilot.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Open Application Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                setModalJob(selectedJobForCopilot)
                setActiveModal('thankyou')
              }}
              className="px-3 py-1.5 rounded-lg bg-[#141C30] hover:bg-[#1E2B48] border border-[#23355A] text-slate-200 text-xs transition-colors"
            >
              Thank You Note
            </button>
          </div>
        </div>

        {/* 1-Click Clipboard Auto-Fill Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#0A0F1D] border border-[#1F2E4D] space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Full Name</span>
              <button
                onClick={() => handleCopy(profile.name, 'name')}
                className="text-amber-400 hover:underline font-mono"
              >
                {copiedField === 'name' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="font-semibold text-white">{profile.name}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#0A0F1D] border border-[#1F2E4D] space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Email</span>
              <button
                onClick={() => handleCopy(profile.email, 'email')}
                className="text-amber-400 hover:underline font-mono"
              >
                {copiedField === 'email' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="font-semibold text-white">{profile.email}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#0A0F1D] border border-[#1F2E4D] space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>LinkedIn URL</span>
              <button
                onClick={() => handleCopy(profile.linkedin, 'linkedin')}
                className="text-amber-400 hover:underline font-mono"
              >
                {copiedField === 'linkedin' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="font-semibold text-white truncate">{profile.linkedin}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#0A0F1D] border border-[#1F2E4D] space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>GitHub / Portfolio</span>
              <button
                onClick={() => handleCopy(profile.github, 'github')}
                className="text-amber-400 hover:underline font-mono"
              >
                {copiedField === 'github' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="font-semibold text-white truncate">{profile.github}</div>
          </div>
        </div>

        {/* Drag to Bookmarks AutoFill Bookmarklet */}
        <div className="p-4 rounded-xl bg-[#0B1120] border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>⚡ Drag to Bookmarks Bar: "Auto-Fill & Pause Before Submit"</span>
            </div>
            <p className="text-slate-400">
              Drag the button to your browser bookmarks bar. When on Greenhouse, Lever, or Ashby, click it to auto-fill candidate fields and highlight the submit button in green.
            </p>
          </div>

          <a
            href="javascript:(function(){const p={'name':'Vamshi Creates','email':'vamshi@vamshicreates.io','phone':'+1 (555) 234-5678','linkedin':'https://linkedin.com/in/vamshicreates','github':'https://github.com/vamshicreates'};for(let i of document.querySelectorAll('input,textarea')){let n=(i.name||i.id||'').toLowerCase();if(n.includes('name'))i.value=p.name;if(n.includes('email'))i.value=p.email;if(n.includes('phone'))i.value=p.phone;if(n.includes('linkedin'))i.value=p.linkedin;if(n.includes('github')||n.includes('website'))i.value=p.github;}let s=document.querySelector('button[type=submit],input[type=submit]');if(s){s.style.outline='4px solid #10b981';s.scrollIntoView({behavior:'smooth'});alert('Fields pre-filled! Please attach your tailored ATS PDF and click Submit when ready.');}})();"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shrink-0 shadow-md shadow-amber-500/20 cursor-grab hover:from-amber-400 hover:to-amber-500"
            onClick={(e) => {
              e.preventDefault()
              alert("Drag this button to your browser bookmarks bar to use it on any live application portal!")
            }}
          >
            ⚡ Auto-Fill Application
          </a>
        </div>
      </div>

      {/* Follow-up / Thank you modal */}
      {activeModal && modalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F2E4D] pb-3">
              <h3 className="font-bold text-white text-sm">
                {activeModal === 'followup' ? `Follow-Up Email Draft (${modalJob.company})` : `Post-Interview Thank You (${modalJob.company})`}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="p-4 rounded-lg bg-[#0A0F1D] border border-[#1F2E4D] text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
              {activeModal === 'followup' ? (
                `Subject: Following up on Application – ${modalJob.title} – ${modalJob.company}

Hi Hiring Team,

I hope you are having a productive week. I am following up on my application submitted recently for the ${modalJob.title} role at ${modalJob.company}.

I remain very excited about ${modalJob.company}'s roadmap and would welcome the chance to discuss how my hands-on background and verified outcomes can support your team's immediate milestones.

Please let me know if any additional details or work references would be helpful at this stage.

Best regards,
${profile.name}`
              ) : (
                `Subject: Thank you – ${modalJob.title} interview with ${modalJob.company}

Dear Hiring Team,

Thank you very much for taking the time to speak with me today regarding the ${modalJob.title} position at ${modalJob.company}.

I particularly enjoyed our discussion around engineering resilient architectures and shipping with zero downtime. It reinforced my enthusiasm for the team's mission.

Looking forward to the next steps!

Warm regards,
${profile.name}`
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 rounded-lg bg-[#141C30] text-slate-300 text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeModal === 'followup' ? 'Followup copied' : 'Thank you copied')
                  alert('Copied to clipboard!')
                  setActiveModal(null)
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
