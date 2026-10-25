import React from 'react'
import { Sparkles } from 'lucide-react'

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-lavender-200 shadow-clean">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-lavender-600 via-lavender-700 to-lavender-800 flex items-center justify-center text-white shadow-button">
            <span className="font-greek font-black text-xl text-white">Ω</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-surface-darkText font-greek">
                JobGod
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-lavender-100 text-lavender-700 border border-lavender-200 font-greek">
                ORACLE EDITION
              </span>
            </div>
            <p className="text-[11px] text-surface-mutedText hidden sm:block">
              “Let me get you a job.” • The 10 Best Matches For You
            </p>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-3 text-xs font-medium text-surface-mutedText">
          <div className="hidden sm:flex items-center gap-2 text-lavender-800 bg-lavender-50 px-3.5 py-1.5 rounded-full border border-lavender-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>JobGod Online</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-700 font-bold font-greek tracking-wider">White & Lavender</span>
        </div>
      </div>
    </header>
  )
}
