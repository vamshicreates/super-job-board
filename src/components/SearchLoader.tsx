import React, { useEffect, useState } from 'react'
import { Sparkles, Check, Search, ShieldCheck } from 'lucide-react'

export const SearchLoader: React.FC = () => {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 600)
    const t2 = setTimeout(() => setStep(3), 1300)
    const t3 = setTimeout(() => setStep(4), 2000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  const steps = [
    { num: 1, label: "Reading resume skills & experience" },
    { num: 2, label: "Searching live requisitions on Greenhouse, Lever, LinkedIn & Indeed" },
    { num: 3, label: "Verifying active apply buttons & location compatibility" },
    { num: 4, label: "Ranking your strictly 10 best-fit job links" },
  ]

  return (
    <div className="bg-white rounded-2xl border border-lavender-200 shadow-card p-8 text-center max-w-xl mx-auto my-8 space-y-6">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-lavender-100 flex items-center justify-center text-lavender-600 shadow-inner">
        <Sparkles className="w-7 h-7 text-lavender-600 animate-pulse" />
      </div>

      <div>
        <h3 className="text-lg font-bold text-surface-darkText">
          Hunting for your 10 Best Jobs...
        </h3>
        <p className="text-xs text-surface-mutedText mt-1">
          Our system is analyzing verified openings to find the exact top 10 positions for your profile.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-3 text-left max-w-md mx-auto pt-2">
        {steps.map((s) => {
          const isDone = step > s.num
          const isCurrent = step === s.num

          return (
            <div
              key={s.num}
              className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-lavender-50 border border-lavender-200 shadow-sm'
                  : isDone
                  ? 'bg-slate-50 opacity-80'
                  : 'opacity-40'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isDone
                  ? 'bg-emerald-500 text-white'
                  : isCurrent
                  ? 'bg-lavender-600 text-white animate-bounce'
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {isDone ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className={`text-xs font-medium ${isCurrent ? 'text-lavender-900 font-bold' : 'text-slate-600'}`}>
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
