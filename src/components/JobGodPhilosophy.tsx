import React from 'react'
import { CheckCircle2, ShieldCheck, Zap, Compass } from 'lucide-react'

export const JobGodPhilosophy: React.FC = () => {
  return (
    <section className="py-12 border-t border-lavender-200/80 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Big Typography (Twain.ai Signature Element) */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-bold font-greek uppercase tracking-widest text-lavender-700">
            THE JOBGOD DOCTRINE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-surface-darkText font-greek tracking-tight leading-[1.15]">
            To the hiring team, your fit is the only thing that matters.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Job seekers waste weeks sending hundreds of applications into black-hole portals. JobGod changes the physics: we inspect the live form, strip out the noise, and hand you strictly the 10 verified opportunities where you are already an unfair match.
          </p>
        </div>

        {/* 3 Twain-Style Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl bg-surface-subtle border border-lavender-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center font-bold font-greek text-base">
              I
            </div>
            <h3 className="text-lg font-bold text-surface-darkText font-greek">
              Direct ATS Portals Only
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              No third-party recruiters taking a 20% cut. No spam agencies reposting old requisitions. Every link goes directly to the company's verified Greenhouse, Lever, Ashby, or LinkedIn page.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl bg-surface-subtle border border-lavender-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center font-bold font-greek text-base">
              II
            </div>
            <h3 className="text-lg font-bold text-surface-darkText font-greek">
              Strictly 10 High-Fit Matches
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              You do not need 500 rejection emails. You need 10 conversations. JobGod stops after finding the top 10 positions that fit your exact skills, years of experience, and desired compensation.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl bg-surface-subtle border border-lavender-200/90 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center font-bold font-greek text-base">
              III
            </div>
            <h3 className="text-lg font-bold text-surface-darkText font-greek">
              No Stealth On-Site Traps
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              We verify the job body for hidden 5-day office mandates, non-sponsorship clauses, and relocation demands before presenting it to you. Complete transparency on every card.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
