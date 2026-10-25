import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { TwainTalkingHero } from './components/TwainTalkingHero'
import { QuotesBanner } from './components/QuotesBanner'
import { JobCard } from './components/JobCard'
import { SearchLoader } from './components/SearchLoader'
import { JobGodPhilosophy } from './components/JobGodPhilosophy'
import { generateTop10Jobs } from './data/jobCatalog'
import { JobPreference, MatchedJob } from './types'
import { CheckCircle2, Sparkles, Trophy } from 'lucide-react'

export function App() {
  const [preferences, setPreferences] = useState<JobPreference>({
    targetRole: "Senior Software Engineer",
    workMode: "remote",
    jobType: "fulltime",
    currentLocation: "Hyderabad, India",
    resumeFileName: "Aristotle_Developer_Resume.pdf"
  })

  const [isLoading, setIsLoading] = useState(false)
  const [jobs, setJobs] = useState<MatchedJob[]>(() => generateTop10Jobs({
    targetRole: "Senior Software Engineer",
    workMode: "remote",
    jobType: "fulltime",
    currentLocation: "Hyderabad, India",
    resumeFileName: "Aristotle_Developer_Resume.pdf"
  }))

  const handleSearch = () => {
    setIsLoading(true)
    setTimeout(() => {
      const top10 = generateTop10Jobs(preferences)
      setJobs(top10)
      setIsLoading(false)
      const resultsEl = document.getElementById('results-section')
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' })
      }
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#FAF9FE] text-[#1E1B4B] flex flex-col font-sans selection:bg-lavender-200 selection:text-lavender-900">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Twain-Style Talking Hero ("Let me get you a job", "Welcome to JobGod", Talking Experience) */}
      <TwainTalkingHero
        preferences={preferences}
        setPreferences={setPreferences}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* 3. Quirky Philosophical Quotes Banner */}
      <QuotesBanner />

      {/* 4. Results Section: The 10 Best Matching Job Links */}
      <section id="results-section" className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 scroll-mt-20">
        {isLoading && <SearchLoader />}

        {!isLoading && (
          <div className="space-y-6">
            {/* Results Title Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-lavender-200 shadow-card">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-lavender-600" />
                  <h2 className="text-xl sm:text-2xl font-bold font-greek text-surface-darkText tracking-tight">
                    Your 10 Best Matching Job Links
                  </h2>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-lavender-100 text-lavender-800 font-greek">
                    Top 10 Only
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-surface-mutedText">
                  Personalized by JobGod for <strong className="text-surface-darkText font-semibold">{preferences.targetRole || 'Any Target Role'}</strong> • {preferences.workMode.toUpperCase()} • {preferences.currentLocation || 'Any Location'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Direct ATS Requisitions</span>
              </div>
            </div>

            {/* The 10 Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 5. Twain-Style Editorial Philosophy */}
      <JobGodPhilosophy />

      {/* 6. Clean Greek Modern Footer */}
      <footer className="border-t border-lavender-200 bg-white py-10 text-xs text-surface-mutedText">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-lavender-600"></span>
            <span className="font-bold text-surface-darkText font-greek text-sm">JobGod</span>
            <span>— “Job is equal to joining in others business.”</span>
          </div>

          <div className="text-slate-500 font-medium font-sans">
            White & Lavender • Twain-Inspired Experience • Direct ATS Links
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
