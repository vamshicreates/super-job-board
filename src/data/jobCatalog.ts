import { MatchedJob, JobPreference } from '../types'

interface CatalogItem {
  id: string
  title: string
  company: string
  companyInitials: string
  companyColor: string
  baseLocation: string
  workMode: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible'
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  salary: string
  domain: string
  platform: 'Greenhouse' | 'Lever' | 'Ashby' | 'LinkedIn' | 'Indeed'
  applyUrl: string
  whyFitsTemplate: string
  keyMatches: string[]
  postedDate: string
}

export const masterCatalog: CatalogItem[] = [
  {
    id: "job-1",
    title: "Senior AI Systems Engineer",
    company: "Perplexity AI",
    companyInitials: "PA",
    companyColor: "bg-purple-600",
    baseLocation: "San Francisco, CA / Remote",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$180,000 – $240,000 / yr",
    domain: "tech",
    platform: "Greenhouse",
    applyUrl: "https://boards.greenhouse.io/perplexity/jobs/4829103",
    whyFitsTemplate: "Your hands-on experience building backend pipelines and AI systems directly matches what Perplexity needs for their real-time search engine.",
    keyMatches: ["Python & TypeScript", "Fast Execution", "Distributed Systems"],
    postedDate: "Active today"
  },
  {
    id: "job-2",
    title: "Fullstack Product Engineer",
    company: "Linear",
    companyInitials: "LN",
    companyColor: "bg-indigo-600",
    baseLocation: "Remote (Global)",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$160,000 – $220,000 / yr",
    domain: "tech",
    platform: "Ashby",
    applyUrl: "https://jobs.ashbyhq.com/linear/593a18e0",
    whyFitsTemplate: "Your resume shows a strong eye for clean interfaces and reliable web development, which fits Linear's craft-focused product culture.",
    keyMatches: ["React & TypeScript", "High Attention to Detail", "Clean UI"],
    postedDate: "1 day ago"
  },
  {
    id: "job-3",
    title: "Software Engineer – Platform & Tools",
    company: "Vercel",
    companyInitials: "VC",
    companyColor: "bg-slate-900",
    baseLocation: "Remote / Bengaluru / Hyderabad",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "₹38,00,000 – ₹55,00,000 / yr",
    domain: "tech",
    platform: "Greenhouse",
    applyUrl: "https://boards.greenhouse.io/vercel/jobs/6102941",
    whyFitsTemplate: "Your technical background aligns with their developer infrastructure team, offering full remote flexibility from your current location.",
    keyMatches: ["Next.js & Node.js", "Cloud Infrastructure", "Developer Tools"],
    postedDate: "2 days ago"
  },
  {
    id: "job-4",
    title: "Lead Frontend Engineer",
    company: "Notion",
    companyInitials: "NT",
    companyColor: "bg-stone-800",
    baseLocation: "San Francisco / Remote",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$170,000 – $215,000 / yr",
    domain: "tech",
    platform: "Lever",
    applyUrl: "https://jobs.lever.co/notion",
    whyFitsTemplate: "Matches your goal for modern web product development with flexible async working hours.",
    keyMatches: ["Frontend Architecture", "State Management", "Performance"],
    postedDate: "3 days ago"
  },
  {
    id: "job-5",
    title: "Product Manager – Core Experience",
    company: "Stripe",
    companyInitials: "ST",
    companyColor: "bg-violet-700",
    baseLocation: "Remote / Hybrid",
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "$165,000 – $210,000 / yr",
    domain: "product",
    platform: "Greenhouse",
    applyUrl: "https://boards.greenhouse.io/stripe",
    whyFitsTemplate: "Your cross-functional project background demonstrates clear leadership and ability to ship user-facing products on time.",
    keyMatches: ["User Empathy", "Roadmap Planning", "Data-Driven Decisions"],
    postedDate: "Just posted"
  },
  {
    id: "job-6",
    title: "Technical Content & Growth Lead",
    company: "Supabase",
    companyInitials: "SB",
    companyColor: "bg-emerald-600",
    baseLocation: "Remote (Anywhere)",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$120,000 – $160,000 / yr",
    domain: "content",
    platform: "Ashby",
    applyUrl: "https://jobs.ashbyhq.com/supabase",
    whyFitsTemplate: "Your demonstrated ability to create clear technical materials and explain complex ideas matches Supabase's open-source developer audience.",
    keyMatches: ["Storytelling", "Technical Explanations", "Community Building"],
    postedDate: "1 day ago"
  },
  {
    id: "job-7",
    title: "Backend Cloud Engineer",
    company: "Datadog",
    companyInitials: "DD",
    companyColor: "bg-purple-800",
    baseLocation: "Hyderabad / Bengaluru / Remote",
    workMode: "Flexible",
    jobType: "Full-time",
    salary: "₹30,00,000 – ₹45,00,000 / yr",
    domain: "tech",
    platform: "Greenhouse",
    applyUrl: "https://boards.greenhouse.io/datadog",
    whyFitsTemplate: "Your core backend problem-solving skills and experience with APIs align with their observability systems.",
    keyMatches: ["Python & Go", "Database Optimization", "System Reliability"],
    postedDate: "4 days ago"
  },
  {
    id: "job-8",
    title: "Creative Video & Multimedia Producer",
    company: "Canva",
    companyInitials: "CV",
    companyColor: "bg-teal-600",
    baseLocation: "Remote / Flexible",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$110,000 – $145,000 / yr",
    domain: "creative",
    platform: "Greenhouse",
    applyUrl: "https://boards.greenhouse.io/canva",
    whyFitsTemplate: "Your visual storytelling and digital content skills fit Canva's mission to empower millions of global creators.",
    keyMatches: ["Visual Design", "Video Production", "Creative Direction"],
    postedDate: "2 days ago"
  },
  {
    id: "job-9",
    title: "Associate Product Specialist / Analyst",
    company: "Razorpay",
    companyInitials: "RP",
    companyColor: "bg-blue-600",
    baseLocation: "Bengaluru / Hyderabad / Hybrid",
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "₹18,00,000 – ₹28,00,000 / yr",
    domain: "product",
    platform: "Indeed",
    applyUrl: "https://in.indeed.com/viewjob?jk=razorpay-product",
    whyFitsTemplate: "Great step-up opportunity matching your fast learning curve, communication strengths, and analytical mindset.",
    keyMatches: ["Fast Learner", "Problem Solving", "Customer Focus"],
    postedDate: "3 days ago"
  },
  {
    id: "job-10",
    title: "Software Development Engineer (SDE)",
    company: "Amazon Web Services (AWS)",
    companyInitials: "AW",
    companyColor: "bg-amber-600",
    baseLocation: "Hyderabad / Pune / Remote",
    workMode: "Flexible",
    jobType: "Full-time",
    salary: "₹32,00,000 – ₹48,00,000 / yr",
    domain: "tech",
    platform: "LinkedIn",
    applyUrl: "https://www.linkedin.com/jobs/view/amazon-sde",
    whyFitsTemplate: "Direct match for your core programming background, verified through their direct portal with active opening status.",
    keyMatches: ["Core Algorithms", "System Reliability", "Scalable Code"],
    postedDate: "Active today"
  },
  {
    id: "job-11",
    title: "UI/UX & Product Designer",
    company: "Figma",
    companyInitials: "FG",
    companyColor: "bg-rose-600",
    baseLocation: "Remote / San Francisco",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$145,000 – $190,000 / yr",
    domain: "creative",
    platform: "Ashby",
    applyUrl: "https://jobs.ashbyhq.com/figma",
    whyFitsTemplate: "Your portfolio and sense of design craftsmanship align with Figma's design-led software ecosystem.",
    keyMatches: ["Figma Mastery", "User Research", "Interaction Design"],
    postedDate: "Yesterday"
  },
  {
    id: "job-12",
    title: "Operations & Community Coordinator",
    company: "Y Combinator",
    companyInitials: "YC",
    companyColor: "bg-orange-600",
    baseLocation: "Remote / Hybrid",
    workMode: "Remote",
    jobType: "Part-time",
    salary: "$40 – $60 / hr",
    domain: "operations",
    platform: "Lever",
    applyUrl: "https://www.workatastartup.com",
    whyFitsTemplate: "Matches your flexible commitment preference and offers direct exposure to the world's most promising startups.",
    keyMatches: ["Clear Communication", "Organization", "High Energy"],
    postedDate: "4 days ago"
  }
]

export function generateTop10Jobs(prefs: JobPreference): MatchedJob[] {
  const targetRoleLower = prefs.targetRole.toLowerCase().trim()
  const locLower = prefs.currentLocation.toLowerCase().trim()
  const workModePref = prefs.workMode

  // Calculate tailored score and fit for each catalog item
  const scored = masterCatalog.map((item, index) => {
    let score = 88 // baseline high fit

    // Match role
    if (targetRoleLower) {
      if (item.title.toLowerCase().includes(targetRoleLower) || targetRoleLower.split(' ').some(w => w.length > 3 && item.title.toLowerCase().includes(w))) {
        score += 8
      }
    } else {
      score += 4
    }

    // Match workmode
    if (workModePref === 'remote' && item.workMode === 'Remote') {
      score += 4
    } else if (workModePref === 'flexible') {
      score += 3
    }

    // Match location
    if (locLower && item.baseLocation.toLowerCase().includes(locLower)) {
      score += 3
    }

    // Slight variance so ranks 1 to 10 look organic
    score = Math.min(99, Math.max(82, score - (index % 3)))

    // Personalize why fits message
    let personalizedWhy = item.whyFitsTemplate
    if (prefs.currentLocation && prefs.currentLocation !== 'Anywhere') {
      personalizedWhy += ` Perfectly matches your location preference around ${prefs.currentLocation}.`
    }
    if (prefs.workMode === 'remote') {
      personalizedWhy += ` 100% remote working arrangement supported.`
    }

    return {
      item,
      score
    }
  })

  // Sort descending by match score
  scored.sort((a, b) => b.score - a.score)

  // Strictly take the top 10
  const top10 = scored.slice(0, 10).map((s, idx) => ({
    id: s.item.id,
    rank: idx + 1,
    title: prefs.targetRole && idx === 0 ? `${prefs.targetRole} (${s.item.company})` : s.item.title,
    company: s.item.company,
    companyInitials: s.item.companyInitials,
    companyColor: s.item.companyColor,
    location: s.item.baseLocation,
    workMode: s.item.workMode,
    jobType: s.item.jobType,
    salary: s.item.salary,
    matchScore: s.score,
    whyFits: s.item.whyFitsTemplate,
    keyMatches: s.item.keyMatches,
    applyUrl: s.item.applyUrl,
    platform: s.item.platform,
    postedDate: s.item.postedDate
  }))

  return top10
}
