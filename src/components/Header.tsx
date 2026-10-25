import React from 'react'
import { Shield, Sparkles, Terminal, Cpu, CheckCircle2, User, ExternalLink } from 'lucide-react'
import { CandidateProfile } from '../types'

interface HeaderProps {
  profile: CandidateProfile
  activeTab: string
  setActiveTab: (tab: string) => void
  onQuickScan: () => void
  onLaunchCopilot: () => void
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeTab,
  setActiveTab,
  onQuickScan,
  onLaunchCopilot
}) => {
  const tabs = [
    { id: 'board', label: 'Super Board', count: 6 },
    { id: 'tailor', label: 'Differential ATS Studio', icon: Sparkles },
    { id: 'pipeline', label: 'Pipeline & Copilot', icon: Terminal },
    { id: 'interview', label: 'Interview Simulator', icon: User },
    { id: 'upskill', label: 'Upskill Heatmap', icon: Cpu },
    { id: 'security', label: 'Security Shield', icon: Shield },
  ]

  return (
    <header className="border-b border-[#1F2E4D] bg-[#0A0F1D]/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 border-b border-[#1F2E4D]/60 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono font-medium">SECURITY SHIELD: ACTIVE</span>
            </div>
            <span className="text-[#1F2E4D]">•</span>
            <div className="flex items-center gap-1.5 text-amber-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-mono">HEADLESS DOM VERIFIER: READY</span>
            </div>
            <span className="text-[#1F2E4D]">•</span>
            <div className="hidden md:flex items-center gap-1.5 text-indigo-400 font-mono">
              <span>ZERO-TOKEN COMPILER: READY</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Profile: <strong className="text-slate-200">{profile.name}</strong> ({profile.yearsOfExperience} YoE)</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-[11px] border border-amber-500/20">
              5D FIT SCORING ON
            </span>
          </div>
        </div>

        {/* Main Header Brand & Quick Triggers */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-indigo-600 to-emerald-500 p-[1.5px] shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-[#080C15] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white font-sans">
                  SUPER JOB SEARCH BOARD
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  vamshicreates × ai-job-search
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct ATS Discovery • Deterministic Security Shield • Zero-Token Resume Patches • Approval-Gated Pre-Fill
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onQuickScan}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#121B2F] hover:bg-[#1A2640] border border-[#26385C] text-slate-200 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scan Any Posting</span>
            </button>
            <button
              onClick={onLaunchCopilot}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Copilot</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-0.5 pt-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-amber-400 text-white bg-[#121A2D]'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#0E1524]'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-[#1F2E4D] text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
