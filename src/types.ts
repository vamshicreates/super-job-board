export interface JobItem {
  id: string
  title: string
  company: string
  location: string
  workMode: 'Remote' | 'Hybrid' | 'On-site'
  platform: 'Greenhouse' | 'Lever' | 'Ashby' | 'LinkedIn' | 'Indeed' | 'Wellfound' | 'YC Startup'
  url: string
  salaryRange: string
  postedDate: string
  deadline?: string
  fitScore: number
  rating: 'High Match' | 'Moderate Match' | 'Stretch / Low'
  domVerified: boolean
  securityClean: boolean
  securityFlags: string[]
  dimensions: {
    skillsMatch: { score: number; matched: string[]; missing: string[] }
    experienceDomain: { score: number; highlights: string[] }
    seniorityYoE: { score: number; requiredYoE: number; candidateYoE: number }
    locationLogistics: { score: number; details: string }
    growthCulture: { score: number; highlights: string[] }
  }
  cautions: string[]
  knockoutRisks: string[]
  tailoredHeadline: string
  tailoredSummary: string
  tailoredBullets: { original: string; tailored: string; metric: string }[]
  coverLetterSnippet: string
  customFormAnswers: { question: string; answer: string }[]
  status: 'discovered' | 'tailored' | 'ready' | 'applied' | 'interview' | 'offer' | 'rejected'
  appliedDate?: string
}

export interface CandidateProfile {
  name: string
  headline: string
  email: string
  phone: string
  linkedin: string
  github: string
  portfolio: string
  targetRoles: string[]
  targetLocations: string[]
  yearsOfExperience: number
  skills: {
    core: string[]
    tools: string[]
    domains: string[]
  }
  workExperience: {
    role: string
    company: string
    period: string
    highlights: string[]
  }[]
}
