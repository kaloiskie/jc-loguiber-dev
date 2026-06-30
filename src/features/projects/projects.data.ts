import type { Project } from '../../shared/types'

export const projects: Project[] = [
  {
    title: 'Northman Gaming Dashboard',
    description:
      'Full-stack real-time gaming operations platform for a PCSO-licensed STL operator. Handles ticket verification, multi-role approval chains, live sales data, and async queue processing.',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'SQS'],
    status: 'Production',
    image: '/websites/northmangaming%20operation%20dashboard.png',
    highlights: [
      'Multi-role approval workflow with role-based access control',
      'Real-time sales dashboard with Socket.io and auto-reconnection',
      'QR-based device linking for agent terminal provisioning',
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
    tech: ['Android', 'Java', 'Kotlin', 'Node.js'],
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
    tech: ['Python', 'Node.js', 'Telegram Bot API', 'Ollama', 'xlsxwriter'],
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
