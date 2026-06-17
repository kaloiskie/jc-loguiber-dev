import type { ExperienceItem } from '../../shared/types'

export const experiences: ExperienceItem[] = [
  {
    role: 'IT Supervisor',
    company: 'Northman Gaming Corporation',
    location: 'Tagum City, Davao del Norte, Philippines',
    period: 'March 2026 – Present',
    highlights: [
      'Leads team of 2 IT staff, assigns tasks and monitors performance',
      'Oversees system admin, network management, and incident response',
      'Plans infrastructure upgrades and aligns IT with business objectives',
    ],
  },
  {
    role: 'IT Staff',
    company: 'Northman Gaming Corporation',
    location: 'Tagum City, Davao del Norte, Philippines',
    period: 'June 2025 – February 2026',
    highlights: [
      'Built and maintained full-stack gaming dashboard (React + Node.js + PostgreSQL)',
      'Engineered SQS/RQ async queue layer with concurrency limiting and SQLite-backed persistence',
      'Built real-time features: socket reconnection, live dashboards, announcement system, QR device linking',
      'Developed Telegram bot ecosystem: sales reports, fleet alerts, AI-generated staff summaries via Ollama/llama3.2',
      'Built IT service request system with 9 chat-based request flows',
      'Oversaw Android MDM app (NexusAgent) with silent APK self-update and remote device management',
    ],
  },
  {
    role: 'IT Intern',
    company: 'City Hall of Tagum City',
    location: 'Davao del Norte, Philippines',
    period: 'October 2023 – January 2024',
    highlights: [
      'Assisted in system maintenance, network troubleshooting, and database management across government departments',
      'Provided hardware/software support and participated in IT infrastructure projects',
    ],
  },
]
