import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { GreekHero } from './components/GreekHero'
import { QuotesBanner } from './components/QuotesBanner'
import { ResumeSearchForm } from './components/ResumeSearchForm'
import { JobCard } from './components/JobCard'
import { SearchLoader } from './components/SearchLoader'
import { generateTop10Jobs } from './data/jobCatalog'
import { JobPreference, MatchedJob } from './types'
import { CheckCircle2, Sparkles, Trophy } from 'lucide-react'

export function App() {
  const [preferences, setPreferences] = useState<JobPreference>({
    targetRole: "Software Engineer",
    workMode: "remote",
    jobType: "fulltime",
    currentLocation: "Hyderabad, India",
    resumeFileName: "Aristotle_Developer_Resume.pdf"
  })

  const [isLoading, setIsLoading] = useState(false)
  const [jobs, setJobs] = useState<MatchedJob[]>(() => generateTop10Jobs({
    targetRole: "Software Engineer",
    workMode: "remote",
    jobType: "fulltime",
    currentLocation: "Hyderabad, India",
    resumeFileName: "Aristotle_Developer_Resume.pdf"
  }))

  const handleScrollToForm = () => {
    const el = document.getElementById('search-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSearch = () => {
    setIsLoading(true)
    setTimeout(() => {
      const top10 = generateTop10Jobs(preferences)
      setJobs(top10)
      setIsLoading(false)
    }, 1900)
  }

  return (
    <div className="min-h-screen bg-[#FAF9FE] text-[#1E1B4B] flex flex-col font-sans selection:bg-lavender-200 selection:text-lavender-900">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Greek Modern Hero Landing Page ("Let me get you a job" & "Welcome to 10x Job Hunt") */}
      <GreekHero onScrollToForm={handleScrollToForm} />

      {/* 3. Quirky Philosophical Quotes Banner */}
      <QuotesBanner />

      {/* 4. Main Intake & 10 Job Results */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* FIRST ROW INTAKE: Drop Resume, Job Type, Remote, Location */}
        <ResumeSearchForm
          preferences={preferences}
          setPreferences={setPreferences}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* LOADING ANIMATION */}
        {isLoading && <SearchLoader />}

        {/* RESULTS: Strictly the 10 Best Suitable Job Links */}
        {!isLoading && (
          <div className="space-y-5 pt-2">
            {/* Results Title Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-lavender-200 shadow-card">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-lavender-600" />
                  <h2 className="text-lg sm:text-xl font-bold font-greek text-surface-darkText tracking-tight">
                    Your 10 Best Matching Job Links
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-lavender-100 text-lavender-700">
                    Ranked 1 to 10
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-surface-mutedText">
                  Personalized for <strong className="text-surface-darkText font-semibold">{preferences.targetRole || 'Your Target Role'}</strong> • {preferences.workMode.toUpperCase()} • {preferences.currentLocation || 'Location Flexible'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Direct Application Links</span>
              </div>
            </div>

            {/* The 10 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 5. Clean Greek Modern Footer */}
      <footer className="border-t border-lavender-200 bg-white py-8 text-xs text-surface-mutedText mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-lavender-600"></span>
            <span className="font-bold text-surface-darkText font-greek text-sm">10x Job Hunt</span>
            <span>— “Job is equal to joining in others business.”</span>
          </div>

          <div className="text-slate-500 font-medium font-sans">
            White & Lavender • Greek Modern Edition • Direct ATS Links
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
