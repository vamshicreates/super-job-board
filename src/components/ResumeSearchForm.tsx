import React, { useRef, useState } from 'react'
import {
  UploadCloud, FileText, CheckCircle2, Sparkles, MapPin,
  Briefcase, Globe, Search, RefreshCw, X
} from 'lucide-react'
import { JobPreference, WorkMode, JobType } from '../types'

interface ResumeSearchFormProps {
  preferences: JobPreference
  setPreferences: React.Dispatch<React.SetStateAction<JobPreference>>
  onSearch: () => void
  isLoading: boolean
}

export const ResumeSearchForm: React.FC<ResumeSearchFormProps> = ({
  preferences,
  setPreferences,
  onSearch,
  isLoading
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

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
      resumeFileName: "Aristotle_Developer_Resume.pdf",
      targetRole: prev.targetRole || "Software Engineer",
      currentLocation: prev.currentLocation || "Hyderabad, India"
    }))
  }

  const clearResume = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreferences(prev => ({
      ...prev,
      resumeFileName: ""
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div id="search-section" className="bg-white rounded-2xl border-2 border-lavender-200 shadow-card p-5 sm:p-7 transition-all scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-5 pb-3 border-b border-lavender-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-greek text-surface-darkText tracking-tight">
              Tell Us What You're Looking For
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-lavender-100 text-lavender-700">
              Oracle Intake
            </span>
          </div>
          <p className="text-xs sm:text-sm text-surface-mutedText mt-0.5">
            Drop your resume, select your preferences, and let 10x Job Hunt pull your 10 best suitable job links.
          </p>
        </div>

        <div className="text-xs text-lavender-700 bg-lavender-50 px-3 py-1 rounded-full border border-lavender-200 font-medium">
          🏛️ 10 Verified Links Only
        </div>
      </div>

      {/* The Unified Input Grid (First Row Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* 1. Resume Upload / Dropzone (Takes 4 cols on desktop) */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <label className="block text-xs font-bold text-surface-darkText mb-1.5 flex items-center justify-between font-sans">
            <span>1. Drop Your Resume</span>
            {!preferences.resumeFileName && (
              <button
                type="button"
                onClick={loadSampleResume}
                className="text-lavender-700 hover:text-lavender-900 text-[11px] font-bold underline cursor-pointer"
              >
                Use Sample Resume
              </button>
            )}
          </label>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
          />

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[110px] ${
              preferences.resumeFileName
                ? 'border-lavender-600 bg-lavender-50'
                : isDragging
                ? 'border-lavender-700 bg-lavender-100 scale-[0.99]'
                : 'border-lavender-300 hover:border-lavender-500 bg-lavender-50/40 hover:bg-lavender-50/70'
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
                    <span>Resume Ingested</span>
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
                <div className="w-8 h-8 rounded-full bg-lavender-100 text-lavender-600 flex items-center justify-center mb-1.5 shadow-sm">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-surface-darkText">
                  <span className="text-lavender-700 underline">Upload</span> or drag resume here
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5">PDF or Word (.docx)</span>
              </>
            )}
          </div>
        </div>

        {/* 2. Target Job Role (Takes 3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-between">
          <label className="block text-xs font-bold text-surface-darkText mb-1.5 font-sans">
            2. Target Job Role
          </label>
          <div className="relative flex-1 flex flex-col justify-center">
            <Briefcase className="w-4 h-4 absolute left-3.5 text-lavender-600" />
            <input
              type="text"
              placeholder="e.g. Software Engineer, Marketing, Designer"
              value={preferences.targetRole}
              onChange={(e) => setPreferences(prev => ({ ...prev, targetRole: e.target.value }))}
              className="w-full pl-10 pr-3 py-2.5 bg-surface-subtle border border-lavender-200 rounded-xl text-xs sm:text-sm text-surface-darkText placeholder-slate-400 focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all font-medium h-[52px]"
            />
          </div>
        </div>

        {/* 3. Work Mode & Job Type (Takes 3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-between">
          <label className="block text-xs font-bold text-surface-darkText mb-1.5 font-sans">
            3. Work Mode & Type
          </label>
          <div className="space-y-1.5 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-1.5">
              <select
                value={preferences.workMode}
                onChange={(e) => setPreferences(prev => ({ ...prev, workMode: e.target.value as WorkMode }))}
                className="w-full px-2.5 py-2.5 bg-surface-subtle border border-lavender-200 rounded-xl text-xs font-bold text-surface-darkText focus:outline-none focus:border-lavender-500 h-[52px]"
              >
                <option value="remote">Remote (Anywhere)</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site (Office)</option>
                <option value="flexible">Flexible (Any)</option>
              </select>

              <select
                value={preferences.jobType}
                onChange={(e) => setPreferences(prev => ({ ...prev, jobType: e.target.value as JobType }))}
                className="w-full px-2.5 py-2.5 bg-surface-subtle border border-lavender-200 rounded-xl text-xs font-bold text-surface-darkText focus:outline-none focus:border-lavender-500 h-[52px]"
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

        {/* 4. Location & Search Button (Takes 2 cols) */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <label className="block text-xs font-bold text-surface-darkText mb-1.5 font-sans">
            4. Present Location
          </label>
          <div className="relative flex-1 flex flex-col justify-center">
            <MapPin className="w-3.5 h-3.5 absolute left-3 text-lavender-600" />
            <input
              type="text"
              placeholder="e.g. Hyderabad / SF"
              value={preferences.currentLocation}
              onChange={(e) => setPreferences(prev => ({ ...prev, currentLocation: e.target.value }))}
              className="w-full pl-8 pr-3 py-2.5 bg-surface-subtle border border-lavender-200 rounded-xl text-xs sm:text-sm text-surface-darkText placeholder-slate-400 focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all font-medium h-[52px]"
            />
          </div>
        </div>
      </div>

      {/* Main Search Action Button Row */}
      <div className="mt-6 pt-5 border-t border-lavender-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <Sparkles className="w-4 h-4 text-lavender-600 shrink-0" />
          <span>
            Searches directly on <strong className="text-surface-darkText">LinkedIn, Greenhouse, Lever, Ashby, Indeed</strong>
          </span>
        </div>

        <button
          onClick={onSearch}
          disabled={isLoading}
          className="w-full sm:w-auto px-9 py-3.5 rounded-xl bg-lavender-600 hover:bg-lavender-700 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide shadow-button hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] font-sans"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Consulting Olympus...</span>
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
  )
}
