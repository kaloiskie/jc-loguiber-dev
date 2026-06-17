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
  icon?: React.ComponentType<{ className?: string }>
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

export interface LeadershipItem {
  role: string
  organization: string
  period: string
  details: string[]
}

export interface Interest {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}
