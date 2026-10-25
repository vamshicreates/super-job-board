import React, { useState } from 'react'
import {
  ExternalLink, CheckCircle2, Copy, Sparkles, Building2,
  MapPin, Clock, DollarSign, ArrowUpRight
} from 'lucide-react'
import { MatchedJob } from '../types'

interface JobCardProps {
  job: MatchedJob
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(job.applyUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-lavender-200 shadow-card hover:shadow-card-hover hover:border-lavender-300 transition-all p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        {/* Top Header: Rank, Platform & Match Score */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-lavender-100 text-lavender-700 font-extrabold text-xs flex items-center justify-center font-sans border border-lavender-200">
              #{job.rank}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-lavender-50 text-lavender-700 border border-lavender-200">
              {job.platform} Verified
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{job.matchScore}% Fit</span>
          </div>
        </div>

        {/* Company & Title */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className={`w-11 h-11 rounded-xl ${job.companyColor} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm`}>
            {job.companyInitials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-surface-darkText tracking-tight group-hover:text-lavender-700 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-surface-mutedText mt-0.5">
              <span className="font-semibold text-slate-700">{job.company}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <MapPin className="w-3 h-3 text-lavender-500" />
                <span>{job.location}</span>
              </span>
              <span>•</span>
              <span className="text-lavender-700 font-medium bg-lavender-50 px-2 py-0.2 rounded">
                {job.workMode}
              </span>
            </div>
          </div>
        </div>

        {/* Salary & Type Bar */}
        <div className="p-3 rounded-xl bg-surface-subtle border border-lavender-100 mb-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 text-slate-700 font-medium">
            <span className="text-slate-400 font-normal">Compensation:</span>
            <strong className="text-surface-darkText">{job.salary}</strong>
          </div>
          <div className="text-[11px] text-surface-mutedText font-medium">
            {job.jobType} • {job.postedDate}
          </div>
        </div>

        {/* "Why this job fits you" Box (Simple, friendly, clear) */}
        <div className="p-3.5 rounded-xl bg-lavender-50/70 border border-lavender-200/80 mb-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-lavender-900">
            <CheckCircle2 className="w-4 h-4 text-lavender-600 shrink-0" />
            <span>Why this is a great fit for you:</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {job.whyFits}
          </p>

          {/* Matched skills tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-semibold text-lavender-700 uppercase tracking-wider">Matched:</span>
            {job.keyMatches.map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-medium bg-white text-slate-700 border border-lavender-200 shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="pt-3 border-t border-lavender-100 flex items-center justify-between gap-3">
        <button
          onClick={handleCopy}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-lavender-700 hover:bg-lavender-50 border border-slate-200 hover:border-lavender-200 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
        </button>

        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-xs shadow-button hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Apply Directly</span>
          <ArrowUpRight className="w-4 h-4 text-white" />
        </a>
      </div>
    </div>
  )
}
