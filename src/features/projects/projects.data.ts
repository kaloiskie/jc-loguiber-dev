import type { Project } from '../../shared/types'

export const projects: Project[] = [
  {
    title: 'Northman Gaming Dashboard',
    description:
      'Full-stack real-time gaming operations platform for a PCSO-licensed STL operator. Handles ticket verification, multi-role approval chains, and live sales data.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io'],
    status: 'Production',
    featured: true,
    role: 'Full-stack architecture and implementation',
    result: 'One operational surface for live sales, approvals, ticket verification, and agent device provisioning.',
    architecture: ['React client', 'Express API', 'SQS / RQ workers', 'PostgreSQL', 'Socket.io'],
    accent: '#7c8cff',
    image: '/websites/northmangaming%20operation%20dashboard.png',
    url: 'https://northmangaming.com/',
    highlights: [
      'Multi-role approval workflow with role-based access control',
      'Real-time sales dashboard with Socket.io and auto-reconnection',
      'QR-based device linking for agent terminal provisioning',
    ],
  },
  {
    title: 'Dev Recruitment',
    description:
      'Technical interview platform for screening developer candidates. Runs timed question flows and generates PDF/Excel evaluation reports for reviewers.',
    tech: ['React', 'TypeScript', 'Vite', 'React Router', 'jsPDF'],
    status: 'Production',
    image: '/websites/dev-recruitment.png',
    url: 'https://dev-recruitment-five.vercel.app/admin/login',
    highlights: [
      'Timed technical question flow with resume-on-refresh support',
      'Bulk PDF and Excel export of applicant results',
      'Recruiter dashboard with pass/review/fail scoring breakdown',
    ],
  },
  {
    title: 'HR Dashboard',
    description:
      'Internal HR module of the Northman Gaming platform covering attendance, DTR, leave, overtime, and payslip monitoring for a multi-outlet workforce.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    status: 'Production',
    featured: true,
    role: 'Product engineering across frontend and backend',
    result: 'Centralized employee requests and approval workflows for a multi-outlet workforce.',
    architecture: ['React portal', 'Express services', 'PostgreSQL', 'Role-based access'],
    accent: '#32d583',
    image: '/websites/hr.dashboard.png',
    url: 'https://hr.northmangaming.com/',
    highlights: [
      'Attendance, DTR, and leave tracking across multiple outlets',
      'Overtime and payslip monitoring with approval workflows',
      'Shared role-based access with the main operations dashboard',
    ],
  },
  {
    title: 'Suki Rewards',
    description:
      'STL loyalty rewards program for lottery bettors — submit ticket stubs via camera upload, earn points, and win prizes through raffle draws.',
    tech: ['React', 'Node.js', 'Socket.io', 'Leaflet'],
    status: 'Production',
    featured: true,
    role: 'Full-stack product development',
    result: 'A bilingual, mobile-first loyalty experience connecting ticket submission, points, and live raffle activity.',
    architecture: ['React client', 'Node.js API', 'Async uploads', 'Socket.io', 'Leaflet'],
    accent: '#ffb02e',
    image: '/websites/sukirewards.png',
    url: 'https://sukirewards.proofconcept.site/',
    highlights: [
      'Camera-based ticket stub upload with async processing queue',
      'Bilingual (Filipino/English) mobile-first interface',
      'Live leaderboard and loyalty point tracking',
    ],
  },
  {
    title: 'SQS/RQ Queue Architecture',
    description:
      'Custom async job queue with concurrency limiting, SQLite persistence, stale-while-revalidate caching, and a gateway proxy with Tailscale failover between servers.',
    tech: ['Node.js', 'SQLite', 'Tailscale', 'PM2'],
    status: 'Production',
    highlights: [
      'Concurrency-limited workers prevent resource exhaustion',
      'Stale-while-revalidate cache layer for high-throughput reads',
      'Tailscale-based failover proxy between primary and backup servers',
    ],
  },
  {
    title: 'NexusAgent MDM App',
    description:
      'In-house Android MDM app with Device Owner mode, silent APK self-updates via PackageInstaller, remote block screen, and ADB-based provisioning.',
    tech: ['Android', 'Kotlin', 'Node.js'],
    status: 'Active',
    highlights: [
      'Silent APK self-update using PackageInstaller without user interaction',
      'Device Owner mode for kiosk lockdown and remote screen blocking',
      'Socket-based command channel for real-time device management',
    ],
  },
  {
    title: 'NorthmanBot Telegram Ecosystem',
    description:
      'Multi-module Telegram bot suite: sales reporting with Excel export, payout monitoring via concurrent scraping, fleet speeding alerts, and AI-generated staff summaries via local Ollama.',
    tech: ['Python', 'Telegram', 'Ollama'],
    status: 'Active',
    highlights: [
      'Automated Excel sales reports generated and delivered on schedule',
      'Concurrent web scraping for payout monitoring across multiple endpoints',
      'AI-generated staff performance summaries using local Ollama/llama3.2',
    ],
  },
  {
    title: 'STL Portal Tampermonkey Userscript',
    description:
      'Cross-page automation userscript for the STL operator portal — bet highlighting, viewed ticket indicators, and multi-page approval automation.',
    tech: ['JavaScript', 'Tampermonkey'],
    status: 'Internal',
    highlights: [
      'DOM-based bet highlighting and viewed-ticket tracking across page navigations',
      'Multi-page approval flow automation reducing manual clicks by ~70%',
    ],
  },
]
