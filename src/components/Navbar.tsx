import React from 'react'
import { Briefcase, Sparkles, CheckCircle2 } from 'lucide-react'

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-lavender-200 shadow-clean">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-600 to-lavender-800 flex items-center justify-center text-white shadow-button">
            <span className="font-greek font-black text-lg">X</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-surface-darkText font-greek">
                10x Job Hunt
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-lavender-100 text-lavender-700 border border-lavender-200 uppercase font-greek">
                Greek Modern Edition
              </span>
            </div>
            <p className="text-[11px] text-surface-mutedText hidden sm:block">
              Let me get you a job • Strictly the 10 best suitable job links
            </p>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-3 text-xs font-medium text-surface-mutedText">
          <a
            href="#search-section"
            className="hidden sm:flex items-center gap-1.5 text-lavender-700 hover:text-lavender-900 bg-lavender-50 px-3.5 py-1.5 rounded-full border border-lavender-200 transition-colors font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-lavender-600" />
            <span>Drop Resume</span>
          </a>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-700 font-bold font-greek tracking-wider">White & Lavender</span>
        </div>
      </div>
    </header>
  )
}
