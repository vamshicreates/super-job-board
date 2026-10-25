import React, { useState } from 'react'
import { Header } from './components/Header'
import { JobBoardTab } from './components/JobBoardTab'
import { TailoringStudioTab } from './components/TailoringStudioTab'
import { PipelineCopilotTab } from './components/PipelineCopilotTab'
import { InterviewSimulatorTab } from './components/InterviewSimulatorTab'
import { UpskillHeatmapTab } from './components/UpskillHeatmapTab'
import { SecurityScannerTab } from './components/SecurityScannerTab'
import { defaultCandidateProfile, initialJobs } from './data/mockData'
import { JobItem } from './types'

export function App() {
  const [activeTab, setActiveTab] = useState<string>('board')
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs)
  const [selectedJob, setSelectedJob] = useState<JobItem>(initialJobs[0])
  const [profile] = useState(defaultCandidateProfile)

  const handleSelectJobForTailoring = (job: JobItem) => {
    setSelectedJob(job)
    setActiveTab('tailor')
  }

  const handleSelectJobForCopilot = (job: JobItem) => {
    setSelectedJob(job)
    setActiveTab('pipeline')
  }

  const handleUpdateJobStatus = (jobId: string, newStatus: JobItem['status']) => {
    setJobs(prevJobs =>
      prevJobs.map(job => (job.id === jobId ? { ...job, status: newStatus } : job))
    )
  }

  return (
    <div className="min-h-screen bg-[#080C15] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickScan={() => setActiveTab('security')}
        onLaunchCopilot={() => setActiveTab('pipeline')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'board' && (
          <JobBoardTab
            jobs={jobs}
            onSelectJobForTailoring={handleSelectJobForTailoring}
            onSelectJobForCopilot={handleSelectJobForCopilot}
          />
        )}

        {activeTab === 'tailor' && (
          <TailoringStudioTab
            jobs={jobs}
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
            profile={profile}
          />
        )}

        {activeTab === 'pipeline' && (
          <PipelineCopilotTab
            jobs={jobs}
            onUpdateJobStatus={handleUpdateJobStatus}
            profile={profile}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewSimulatorTab
            jobs={jobs}
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
            profile={profile}
          />
        )}

        {activeTab === 'upskill' && (
          <UpskillHeatmapTab profile={profile} />
        )}

        {activeTab === 'security' && (
          <SecurityScannerTab />
        )}
      </main>

      {/* Clean Bottom Command Footer */}
      <footer className="border-t border-[#1F2E4D]/80 bg-[#0A0F1D] py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>SUPER JOB SEARCH BOARD • Cross-Platform Engine (macOS, Windows, Linux)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by <strong className="text-amber-400">vamshicreates/job-hunter</strong></span>
            <span>×</span>
            <span><strong className="text-indigo-400">ai-job-search</strong></span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
