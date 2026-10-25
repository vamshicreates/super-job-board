import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { ResumeSearchForm } from './components/ResumeSearchForm'
import { JobCard } from './components/JobCard'
import { SearchLoader } from './components/SearchLoader'
import { generateTop10Jobs } from './data/jobCatalog'
import { JobPreference, MatchedJob } from './types'
import { CheckCircle2, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react'

export function App() {
  const [preferences, setPreferences] = useState<JobPreference>({
    targetRole: "Software Engineer",
    workMode: "remote",
    jobType: "fulltime",
    currentLocation: "Hyderabad, India",
    resumeFileName: "Candidate_Resume_Verified.pdf"
  })

  const [isLoading, setIsLoading] = useState(false)
  const [jobs, setJobs] = useState<MatchedJob[]>(() => generateTop10Jobs({
    targetRole: "Software Engineer",
    workMode: "remote",
    jobType: "fulltime",
    currentLocation: "Hyderabad, India",
    resumeFileName: "Candidate_Resume_Verified.pdf"
  }))

  const handleSearch = () => {
    setIsLoading(true)
    setTimeout(() => {
      const top10 = generateTop10Jobs(preferences)
      setJobs(top10)
      setIsLoading(false)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#FAF9FE] text-[#1E1B4B] flex flex-col font-sans">
      {/* 1. Clean White & Lavender Navigation Bar */}
      <Navbar />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* FIRST ROW: Resume Upload, Job Role, Work Mode, Location & Search Button */}
        <ResumeSearchForm
          preferences={preferences}
          setPreferences={setPreferences}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* LOADING ANIMATION */}
        {isLoading && <SearchLoader />}

        {/* RESULTS SECTION: Strictly the 10 Best Suitable Job Links */}
        {!isLoading && (
          <div className="space-y-4 pt-2">
            {/* Results Title & Summary Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-lavender-200 shadow-clean">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-surface-darkText tracking-tight">
                    Your 10 Best Matching Jobs
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-lavender-100 text-lavender-700">
                    10 Requisitions
                  </span>
                </div>
                <p className="text-xs text-surface-mutedText mt-0.5">
                  Filtered for <strong className="text-surface-darkText font-semibold">{preferences.targetRole || 'Any role'}</strong> • {preferences.workMode.toUpperCase()} • {preferences.currentLocation || 'Any location'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>10 Direct Verified Links • Pauses Before Submit</span>
              </div>
            </div>

            {/* The 10 Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 3. Clean Footer */}
      <footer className="border-t border-lavender-200 bg-white py-6 text-xs text-surface-mutedText mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lavender-600"></span>
            <span className="font-bold text-surface-darkText">10x Job Hunt</span>
            <span>— The simplest way to find your 10 best suitable job openings.</span>
          </div>

          <div className="text-slate-500 font-medium">
            Designed for clarity • White & Lavender • Direct ATS Application Links
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
