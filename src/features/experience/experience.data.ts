import type { ExperienceItem } from '../../shared/types'

export const experiences: ExperienceItem[] = [
  {
    role: 'IT Supervisor',
    company: 'Northman Gaming Corporation',
    location: 'Tagum City, Davao del Norte, Philippines',
    period: 'March 2026 – Present',
    highlights: [
      'Lead and supervise a two-person IT team, assigning work, monitoring performance, and providing technical guidance',
      'Oversee daily IT operations across system administration, network management, user support, incident response, escalation, and root-cause analysis',
      'Plan system improvements, infrastructure upgrades, security measures, documentation, standard operating procedures, and IT-policy compliance',
    ],
  },
  {
    role: 'IT Staff',
    company: 'Northman Gaming Corporation',
    location: 'Tagum City, Davao del Norte, Philippines',
    period: 'June 2025 – March 2026',
    highlights: [
      'Developed and maintained company websites and full-stack web applications using Vite, React, Express.js, Node.js, and Python',
      'Managed and optimized PostgreSQL and MySQL databases, network configuration, performance monitoring, and IT security protocols',
      'Built and maintained the full-stack gaming dashboard with real-time sockets, QR device linking, and approval workflows',
      'Developed an async queue layer, a Telegram bot ecosystem, and the NexusAgent Android MDM app',
    ],
  },
  {
    role: 'IT Intern',
    company: 'City Hall of Tagum City',
    location: 'Davao del Norte, Philippines',
    period: 'October 2023 – January 2024',
    highlights: [
      'Assisted with maintenance and troubleshooting of computer systems and office networks across city departments',
      'Supported database management, records digitization, hardware setup, software installation, system updates, and IT-related projects',
    ],
  },
]
