export interface Project {
  slug?: string
  title: string
  description: string
  tech: string[]
  status: 'Production' | 'Active' | 'Internal'
  highlights: string[]
  featured?: boolean
  role?: string
  result?: string
  architecture?: string[]
  url?: string
  repository?: string
  github?: string[]
  image?: string
  accent?: string
  caseStudy?: {
    context: string
    challenge: string
    constraints: string[]
    decisions: Array<{
      title: string
      description: string
    }>
  }
}

export interface Section {
  id: string
  label: string
}

export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  highlights: string[]
}

export interface SkillCategory {
  title: string
  items: string[]
}

export interface Collaborator {
  name: string
  url: string
  description: string
}

export interface Award {
  title: string
  organization: string
  date: string
  description: string
}

export interface EducationItem {
  degree: string
  school: string
  period: string
  details: string[]
}
