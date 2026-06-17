export interface Project {
  title: string
  description: string
  tech: string[]
  status: 'Production' | 'Active' | 'Internal'
  highlights: string[]
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
