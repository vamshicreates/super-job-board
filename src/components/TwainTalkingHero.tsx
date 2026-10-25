import React, { useState, useRef } from 'react'
import {
  Sparkles, ArrowRight, UploadCloud, FileText, CheckCircle2,
  MapPin, Briefcase, Globe, RefreshCw, X, MessageSquare, Terminal, Zap
} from 'lucide-react'
import { JobPreference, WorkMode, JobType } from '../types'

interface TwainTalkingHeroProps {
  preferences: JobPreference
  setPreferences: React.Dispatch<React.SetStateAction<JobPreference>>
  onSearch: () => void
  isLoading: boolean
}

export const TwainTalkingHero: React.FC<TwainTalkingHeroProps> = ({
  preferences,
  setPreferences,
  onSearch,
  isLoading
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeSpeechStep, setActiveSpeechStep] = useState<number>(0)
  const [isDragging, setIsDragging] = useState(false)

  const dialoguePrompts = [
    {
      godMessage: "“Let me get you a job. Drop your resume, mortal, or click the sample below so I can read your superpowers.”",
      subtitle: "JobGod is reading market signals across Greenhouse, Lever, Ashby, LinkedIn, and Indeed."
    },
    {
      godMessage: "“What kind of job role are you seeking? Tell me your ambition, and I shall align the stars.”",
      subtitle: "Target title precision matching."
    },
    {
      godMessage: "“Are you seeking Remote freedom, Hybrid balance, or On-site? And what is your present location?”",
      subtitle: "Filtering out geographic traps and strict commute requirements."
    }
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPreferences(prev => ({
        ...prev,
        resumeFileName: file.name
      }))
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setPreferences(prev => ({
        ...prev,
        resumeFileName: file.name
      }))
    }
  }

  const loadSampleResume = () => {
    setPreferences(prev => ({
      ...prev,
      resumeFileName: "Candidate_Verified_Resume.pdf",
      targetRole: prev.targetRole || "Senior Software Engineer",
      currentLocation: prev.currentLocation || "Hyderabad, India"
    }))
  }

  const clearResume = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreferences(prev => ({ ...prev, resumeFileName: "" }))
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Background radial lavender aura (Twain style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-lavender-100/70 via-lavender-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Editorial Headline (Twain.ai structure) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-100 border border-lavender-200 text-lavender-800 text-xs font-bold font-greek tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-lavender-600 animate-pulse"></span>
            <span>THE ORACLE IS SPEAKING</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-surface-darkText font-greek tracking-tight leading-[1.08]">
            Let me get you a job.
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-lavender-700 font-sans tracking-tight">
            Welcome to JobGod.
          </p>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stop firing 500 resumes into the void. JobGod researches companies in real-time, eliminates lowballers, and gives you strictly the <strong className="text-surface-darkText font-semibold">10 best suitable job links</strong>.
          </p>
        </div>

        {/* The Talking Experience Console (Twain-Inspired Interactive Dialogue) */}
        <div className="bg-white rounded-3xl border border-lavender-200 shadow-card-hover p-6 sm:p-8 max-w-4xl mx-auto relative overflow-hidden">
          
          {/* Top Speaker Bar: JobGod Avatar & Voice Line */}
          <div className="flex items-start sm:items-center gap-4 pb-6 border-b border-lavender-100">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-lavender-300 shadow-md bg-lavender-50 shrink-0">
                <img
                  src="/images/greek-money-lavender.png"
                  alt="JobGod Statue"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-greek font-bold text-base text-surface-darkText tracking-wide">
                  JobGod Speaks:
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-lavender-100 text-lavender-700 font-mono">
                  LIVE CONVERSATION
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-lavender-900 mt-1 leading-snug italic">
                {dialoguePrompts[activeSpeechStep].godMessage}
              </p>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {dialoguePrompts[activeSpeechStep].subtitle}
              </span>
            </div>
          </div>

          {/* First Row Intake Form (Within the Talking Experience) */}
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              
              {/* 1. Resume Dropzone (4 cols) */}
              <div className="md:col-span-4 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-surface-darkText font-sans">
                    1. Drop Resume
                  </label>
                  {!preferences.resumeFileName && (
                    <button
                      type="button"
                      onClick={() => {
                        loadSampleResume()
                        setActiveSpeechStep(1)
                      }}
                      className="text-lavender-700 hover:text-lavender-900 text-[11px] font-bold underline cursor-pointer"
                    >
                      Use Sample Resume
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    handleFileChange(e)
                    setActiveSpeechStep(1)
                  }}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                />

                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    handleDrop(e)
                    setActiveSpeechStep(1)
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[110px] ${
                    preferences.resumeFileName
                      ? 'border-lavender-600 bg-lavender-50'
                      : isDragging
                      ? 'border-lavender-700 bg-lavender-100 scale-[0.99]'
                      : 'border-lavender-300 hover:border-lavender-500 bg-lavender-50/40 hover:bg-lavender-50/80'
                  }`}
                >
                  {preferences.resumeFileName ? (
                    <div className="flex items-center gap-2.5 text-left w-full px-1">
                      <div className="w-10 h-10 rounded-xl bg-lavender-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-surface-darkText truncate">
                          {preferences.resumeFileName}
                        </div>
                        <div className="text-[11px] text-emerald-600 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Resume Loaded</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={clearResume}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove resume"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-lavender-100 text-lavender-600 flex items-center justify-center mb-1 shadow-sm">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-surface-darkText">
                        <span className="text-lavender-700 underline">Upload</span> or drag resume
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5">PDF or Word (.docx)</span>
                    </>
                  )}
                </div>
              </div>

              {/* 2. Target Job Role (3 cols) */}
              <div className="md:col-span-3 flex flex-col justify-between">
                <label className="text-xs font-bold text-surface-darkText mb-1.5 font-sans">
                  2. What Job Are You Looking For?
                </label>
                <div className="relative flex-1 flex flex-col justify-center">
                  <Briefcase className="w-4 h-4 absolute left-3.5 text-lavender-600" />
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer, Marketing, Product"
                    value={preferences.targetRole}
                    onFocus={() => setActiveSpeechStep(1)}
                    onChange={(e) => setPreferences(prev => ({ ...prev, targetRole: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2.5 bg-surface-subtle border border-lavender-200 rounded-2xl text-xs sm:text-sm text-surface-darkText placeholder-slate-400 focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all font-medium h-[52px]"
                  />
                </div>
              </div>

              {/* 3. Work Mode & Type (3 cols) */}
              <div className="md:col-span-3 flex flex-col justify-between">
                <label className="text-xs font-bold text-surface-darkText mb-1.5 font-sans">
                  3. Work Mode & Type
                </label>
                <div className="space-y-1.5 flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-1.5">
                    <select
                      value={preferences.workMode}
                      onFocus={() => setActiveSpeechStep(2)}
                      onChange={(e) => setPreferences(prev => ({ ...prev, workMode: e.target.value as WorkMode }))}
                      className="w-full px-2 py-2.5 bg-surface-subtle border border-lavender-200 rounded-xl text-xs font-bold text-surface-darkText focus:outline-none focus:border-lavender-500 h-[52px]"
                    >
                      <option value="remote">Remote (Anywhere)</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="onsite">On-site (Office)</option>
                      <option value="flexible">Flexible</option>
                    </select>

                    <select
                      value={preferences.jobType}
                      onFocus={() => setActiveSpeechStep(2)}
                      onChange={(e) => setPreferences(prev => ({ ...prev, jobType: e.target.value as JobType }))}
                      className="w-full px-2 py-2.5 bg-surface-subtle border border-lavender-200 rounded-xl text-xs font-bold text-surface-darkText focus:outline-none focus:border-lavender-500 h-[52px]"
                    >
                      <option value="fulltime">Full-time</option>
                      <option value="parttime">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. Present Location (2 cols) */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <label className="text-xs font-bold text-surface-darkText mb-1.5 font-sans">
                  4. Current Location
                </label>
                <div className="relative flex-1 flex flex-col justify-center">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 text-lavender-600" />
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad / SF"
                    value={preferences.currentLocation}
                    onFocus={() => setActiveSpeechStep(2)}
                    onChange={(e) => setPreferences(prev => ({ ...prev, currentLocation: e.target.value }))}
                    className="w-full pl-8 pr-3 py-2.5 bg-surface-subtle border border-lavender-200 rounded-2xl text-xs sm:text-sm text-surface-darkText placeholder-slate-400 focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all font-medium h-[52px]"
                  />
                </div>
              </div>
            </div>

            {/* Action Button & Oracle Assurance Bar */}
            <div className="pt-4 border-t border-lavender-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Sparkles className="w-4 h-4 text-lavender-600 shrink-0" />
                <span>
                  JobGod verifies directly on <strong className="text-surface-darkText font-semibold">LinkedIn, Greenhouse, Lever, Ashby & Indeed</strong>.
                </span>
              </div>

              <button
                onClick={onSearch}
                disabled={isLoading}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-lavender-600 hover:bg-lavender-700 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide shadow-button hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] font-sans"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>JobGod Is Searching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-lavender-200" />
                    <span>Find My 10 Best Jobs</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4 Regenerated Greek Statues Showcase (in White & Lavender Palette) */}
        <div className="pt-6">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-lavender-700 uppercase tracking-widest font-greek">
              THE PATRON DEITIES OF EMPLOYMENT
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Greek Laptop Statue */}
            <div className="bg-white rounded-3xl p-4 border border-lavender-200 shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-lavender-50 mb-3 border border-lavender-100">
                <img
                  src="/images/greek-laptop-lavender.png"
                  alt="JobGod Philosopher on Laptop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-lavender-800 border border-lavender-200 shadow-sm font-greek">
                  THE DIGITAL SAGE
                </div>
              </div>
              <div>
                <h4 className="font-greek font-bold text-xs text-surface-darkText">Remote Architecture</h4>
                <p className="text-[11px] text-slate-500 italic mt-0.5">
                  "Writing scalable code from the agora."
                </p>
              </div>
            </div>

            {/* 2. Greek Money Statue */}
            <div className="bg-white rounded-3xl p-4 border border-lavender-200 shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-lavender-50 mb-3 border border-lavender-100">
                <img
                  src="/images/greek-money-lavender.png"
                  alt="JobGod Aristotle with Money"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-emerald-800 border border-emerald-200 shadow-sm font-greek">
                  10X TOTAL COMP
                </div>
              </div>
              <div>
                <h4 className="font-greek font-bold text-xs text-surface-darkText">Aristotle with the Bag</h4>
                <p className="text-[11px] text-slate-500 italic mt-0.5">
                  “Job = Joining in others business.”
                </p>
              </div>
            </div>

            {/* 3. Greek Phone Statue (Red replaced with Lavender) */}
            <div className="bg-white rounded-3xl p-4 border border-lavender-200 shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-lavender-50 mb-3 border border-lavender-100">
                <img
                  src="/images/greek-phone-lavender.png"
                  alt="JobGod Statue with Phone in Lavender"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-lavender-800 border border-lavender-200 shadow-sm font-greek">
                  OFFER SCREENER
                </div>
              </div>
              <div>
                <h4 className="font-greek font-bold text-xs text-surface-darkText">Zeus on LinkedIn</h4>
                <p className="text-[11px] text-slate-500 italic mt-0.5">
                  "Only replying to verified $180k+ DMs."
                </p>
              </div>
            </div>

            {/* 4. Greek Headset Statue (Yellow replaced with Lavender) */}
            <div className="bg-white rounded-3xl p-4 border border-lavender-200 shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-lavender-50 mb-3 border border-lavender-100 flex items-center justify-center p-2">
                <img
                  src="/images/greek-headset-lavender.png"
                  alt="JobGod Apollo with Headset"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-lavender-800 border border-lavender-200 shadow-sm font-greek">
                  OFFER DISPATCHER
                </div>
              </div>
              <div>
                <h4 className="font-greek font-bold text-xs text-surface-darkText">Apollo Support Lead</h4>
                <p className="text-[11px] text-slate-500 italic mt-0.5">
                  "Directly linking you to hiring managers."
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
