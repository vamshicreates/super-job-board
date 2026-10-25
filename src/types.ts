export type WorkMode = 'remote' | 'hybrid' | 'onsite' | 'flexible'
export type JobType = 'fulltime' | 'parttime' | 'contract' | 'internship' | 'flexible'

export interface JobPreference {
  targetRole: string
  workMode: WorkMode
  jobType: JobType
  currentLocation: string
  resumeFileName: string
  resumeSnippet?: string
}

export interface MatchedJob {
  id: string
  rank: number
  title: string
  company: string
  companyInitials: string
  companyColor: string
  location: string
  workMode: string
  jobType: string
  salary: string
  matchScore: number
  whyFits: string
  keyMatches: string[]
  applyUrl: string
  platform: string
  postedDate: string
}
