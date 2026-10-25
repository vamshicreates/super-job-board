import React from 'react'
import { Sparkles, ArrowDown, DollarSign, Laptop, PhoneCall, Zap } from 'lucide-react'

interface GreekHeroProps {
  onScrollToForm: () => void
}

export const GreekHero: React.FC<GreekHeroProps> = ({ onScrollToForm }) => {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Decorative Greek aura background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-lavender-200/40 via-purple-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headings */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-100/80 border border-lavender-300/80 text-lavender-800 text-xs font-bold tracking-wider font-greek shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-lavender-600" />
            <span>MODERN GREEK CAREER ORACLE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-surface-darkText font-greek tracking-tight leading-[1.1]">
            Let me get you a job.
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lavender-700 font-sans tracking-tight">
            Welcome to 10x Job Hunt.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto pt-1">
            Philosophers spent 2,000 years debating the meaning of life. You just need a verified job that respects your time and pays you what you’re worth. Drop your resume, tell us what you want, and let Olympus find your 10 best matches.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onScrollToForm}
              className="px-8 py-3.5 rounded-xl bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-sm tracking-wide shadow-button hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Get Started Below</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              100% Free • Verified Direct ATS Links
            </span>
          </div>
        </div>

        {/* 4 Greek Statues Gallery (Quirky Modern Swag) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {/* Card 1: Laptop Philosopher */}
          <div className="bg-white rounded-2xl p-3 border border-lavender-200 shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden bg-purple-950 aspect-[4/5] mb-3">
              <img
                src="/images/greek-laptop.png"
                alt="Greek statue on laptop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-purple-300 border border-purple-500/40">
                Remote Warrior
              </div>
            </div>
            <div>
              <div className="font-greek font-bold text-xs text-surface-darkText">The Digital Sage</div>
              <p className="text-[11px] text-slate-500 italic mt-0.5">
                "Writing code from the agora."
              </p>
            </div>
          </div>

          {/* Card 2: Cash & Shades Statue */}
          <div className="bg-white rounded-2xl p-3 border border-lavender-200 shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden bg-purple-900 aspect-[4/5] mb-3">
              <img
                src="/images/greek-money.jpg"
                alt="Greek statue with sunglasses and money"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-300 border border-emerald-500/40">
                10x Compensation
              </div>
            </div>
            <div>
              <div className="font-greek font-bold text-xs text-surface-darkText">Aristotle with the Bag</div>
              <p className="text-[11px] text-slate-500 italic mt-0.5">
                "Job = Joining in others business."
              </p>
            </div>
          </div>

          {/* Card 3: Red Shades on Phone */}
          <div className="bg-white rounded-2xl p-3 border border-lavender-200 shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden bg-rose-950 aspect-[4/5] mb-3">
              <img
                src="/images/greek-phone.png"
                alt="Greek statue looking at phone with red shades"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-amber-300 border border-amber-500/40">
                Screening Offers
              </div>
            </div>
            <div>
              <div className="font-greek font-bold text-xs text-surface-darkText">Zeus on LinkedIn</div>
              <p className="text-[11px] text-slate-500 italic mt-0.5">
                "Ghosting lowball recruiters."
              </p>
            </div>
          </div>

          {/* Card 4: Headset Apollo */}
          <div className="bg-white rounded-2xl p-3 border border-lavender-200 shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden bg-amber-50 aspect-[4/5] mb-3">
              <img
                src="/images/greek-headset.png"
                alt="Greek statue wearing headset pointing forward"
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-sky-300 border border-sky-500/40">
                Offer Dispatcher
              </div>
            </div>
            <div>
              <div className="font-greek font-bold text-xs text-surface-darkText">Apollo Support Lead</div>
              <p className="text-[11px] text-slate-500 italic mt-0.5">
                "Closing contracts on call."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
