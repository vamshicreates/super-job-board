import React from 'react'
import { Cpu, BookOpen, Clock, ArrowUpRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import { marketSkillsHeatmap } from '../data/mockData'
import { CandidateProfile } from '../types'

interface UpskillHeatmapTabProps {
  profile: CandidateProfile
}

export const UpskillHeatmapTab: React.FC<UpskillHeatmapTabProps> = ({ profile }) => {
  const missingGaps = marketSkillsHeatmap.filter(s => s.candidateStatus === 'Missing Gap')
  const totalEstHours = missingGaps.reduce((acc, curr) => acc + curr.estHours, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
              MARKET DEMAND RADAR
            </span>
            <span className="text-xs text-slate-400 font-mono">• 6 scanned requisitions analyzed</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Career Upskill & Market Gap Heatmap
          </h2>
          <p className="text-xs text-slate-400">
            Real-time frequency analysis of skills demanded across high-fit target roles vs. your verified profile.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#090D18] p-3 rounded-lg border border-[#1F2E4D]">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Est. Ramp-Up Investment</div>
            <div className="text-base font-bold text-amber-400 font-mono">{totalEstHours} Hours Total</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Skills Heatmap Table */}
      <div className="glass-panel p-5 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-sky-400" />
          <span>Market Skill Frequency & Candidate Mastery Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F2E4D] text-slate-400 font-mono text-[11px] uppercase">
                <th className="pb-3 font-semibold">Skill / Technology</th>
                <th className="pb-3 font-semibold">Domain Category</th>
                <th className="pb-3 font-semibold">Market Demand</th>
                <th className="pb-3 font-semibold">Candidate Status</th>
                <th className="pb-3 font-semibold">Est. Hours</th>
                <th className="pb-3 font-semibold">Action Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2E4D]/60">
              {marketSkillsHeatmap.map((item, idx) => {
                const isMastered = item.candidateStatus === 'Mastered'
                const isMissing = item.candidateStatus === 'Missing Gap'

                return (
                  <tr key={idx} className="hover:bg-[#121B2F]/40 transition-colors">
                    <td className="py-3 font-bold text-white flex items-center gap-1.5">
                      <span>{item.skill}</span>
                    </td>
                    <td className="py-3 text-slate-400 font-mono">{item.category}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-[#16213B] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-400 h-full rounded-full"
                            style={{ width: `${item.marketDemand}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-slate-300 font-semibold">{item.marketDemand}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                        isMastered
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : isMissing
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {item.candidateStatus}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-slate-300">
                      {item.estHours > 0 ? `${item.estHours}h` : '0h (Met)'}
                    </td>
                    <td className="py-3 font-mono">
                      <span className={`text-[11px] font-bold ${
                        item.priority === 'High Growth'
                          ? 'text-amber-400'
                          : item.priority === 'Recommended'
                          ? 'text-sky-400'
                          : item.priority === 'Stretch'
                          ? 'text-indigo-400'
                          : 'text-slate-400'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Fast-Track Learning Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-xl space-y-3 border hover:border-amber-400/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
              PRIORITY #1 • 25 HOURS
            </span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <h4 className="font-bold text-white text-sm">Go (Golang) for Systems Scale</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Essential for Staff & Lead distributed infrastructure roles at Perplexity and Vercel. Bridges current Python concurrency patterns directly into high-throughput goroutine models.
          </p>
          <div className="text-[11px] text-amber-400 font-mono">
            Resource: "Build An Orchestrator in Go" + Tour of Go
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-3 border hover:border-sky-400/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
              PRIORITY #2 • 15 HOURS
            </span>
            <BookOpen className="w-4 h-4 text-sky-400" />
          </div>
          <h4 className="font-bold text-white text-sm">Kubernetes & Multi-Node Cluster Orchestration</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Strengthens your production credentials from single-node Docker containers to high-availability multi-tenant cloud orchestration.
          </p>
          <div className="text-[11px] text-sky-400 font-mono">
            Resource: Kelsey Hightower's "Kubernetes the Hard Way"
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-3 border hover:border-indigo-400/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              PRIORITY #3 • 20 HOURS
            </span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <h4 className="font-bold text-white text-sm">CRDTs & Local-First Sync Architecture</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Critical for desktop/web workflows at Linear and Cursor. Understand conflict-free replicated data types and optimistic local state machines.
          </p>
          <div className="text-[11px] text-indigo-400 font-mono">
            Resource: Ink & Switch Local-First Lab Papers
          </div>
        </div>
      </div>
    </div>
  )
}
