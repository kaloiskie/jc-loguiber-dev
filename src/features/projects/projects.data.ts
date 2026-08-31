import type { Project } from '../../shared/types'

export const projects: Project[] = [
  {
    slug: 'northman-gaming-dashboard',
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
    caseStudy: {
      context:
        'Northman Gaming operates daily, multi-outlet STL workflows where sales, ticket validation, approvals, and field devices must remain synchronized across different roles.',
      challenge:
        'Unify ticket verification, approval chains, live sales visibility, and device provisioning in one operational surface without interrupting daily lottery operations.',
      constraints: [
        'Role-specific permissions across operational and administrative teams',
        'Live data that must recover cleanly after temporary network loss',
        'Agent devices that need controlled provisioning in the field',
        'Existing production workflows that cannot pause during releases',
      ],
      decisions: [
        {
          title: 'Separate synchronous and queued work',
          description: 'Kept user-facing API paths responsive while SQS and RQ workers handle heavier background operations with bounded concurrency.',
        },
        {
          title: 'Design for connection recovery',
          description: 'Used Socket.io state updates with explicit reconnection behavior so live dashboards recover without requiring operators to restart their session.',
        },
        {
          title: 'Provision devices through QR identity',
          description: 'Reduced manual setup by linking agent terminals to approved accounts through a controlled QR-based enrollment flow.',
        },
      ],
    },
  },
  {
    slug: 'toktok-nabunturan-fare',
    title: 'Toktok Nabunturan Rider Fare',
    description:
      'Mobile-first rider fare and booking concept for Nabunturan, Davao de Oro, combining local route presets, transparent sample pricing, and a social-ready public launch surface.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'Vite'],
    status: 'Active',
    featured: true,
    role: 'Product concept, frontend architecture, and deployment',
    result: 'A public fare concept that turns local service selection into an understandable pre-booking estimate.',
    architecture: ['React landing page', 'fare-core workspace', 'Vite dev service', 'Cloudflare Tunnel'],
    accent: '#ff871c',
    image: '/websites/toktok-nabunturan.png',
    url: 'https://toktokph.proofconcept.site/',
    repository: 'https://github.com/kaloiskie/toktok-nabunturan-fare',
    highlights: [
      'Typed fare engine shared as a framework-independent monorepo package',
      'Nabunturan route presets with service, express, and COD fee breakdowns',
      'Cloudflare-served preview with social cards and installable app assets',
    ],
    caseStudy: {
      context:
        'The Toktok Nabunturan concept explores how customers in Nabunturan could check an estimated rider fare before moving into a real booking workflow.',
      challenge:
        'Create a credible, locally relevant booking entry point that feels familiar to Toktok customers while clearly presenting the variables behind a sample fare.',
      constraints: [
        'Proof-of-concept prices that must not be presented as approved production rates',
        'Mobile-first customers using varied devices and network conditions',
        'A distinct Nabunturan identity within recognizable Toktok visual cues',
        'Fare rules that remain testable without depending on the React interface',
      ],
      decisions: [
        {
          title: 'Separate fare logic from presentation',
          description: 'Placed rate rules, input types, calculations, and peso formatting in a framework-independent workspace package shared with the React app.',
        },
        {
          title: 'Start with routes people recognize',
          description: 'Used Nabunturan pickup and drop-off presets to make the estimator concrete while still allowing distance, service, priority, and COD changes.',
        },
        {
          title: 'Treat sharing as part of launch',
          description: 'Created a helmet identity, raster social card, Open Graph metadata, and a public Cloudflare-routed development URL for credible stakeholder review.',
        },
      ],
    },
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
    slug: 'hr-dashboard',
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
    caseStudy: {
      context:
        'Attendance, leave, overtime, DTR, and payslip processes serve employees and approvers across multiple outlets while sharing identity and permissions with the operations platform.',
      challenge:
        'Replace fragmented HR requests with a consistent workflow that gives employees clear status and gives approvers an auditable view of pending work.',
      constraints: [
        'Payroll-sensitive employee information',
        'Different approval rights for employees, supervisors, and administrators',
        'Mobile access for staff working away from a desk',
        'A shared account model with the wider Northman platform',
      ],
      decisions: [
        {
          title: 'Share the role model',
          description: 'Extended the existing platform identity and authorization model so HR access follows the same account lifecycle as operations.',
        },
        {
          title: 'Make request state explicit',
          description: 'Centralized leave, overtime, and attendance corrections around visible request states and responsible approvers.',
        },
        {
          title: 'Keep approval history legible',
          description: 'Structured records around the action, actor, and current status so sensitive changes can be reviewed after the fact.',
        },
      ],
    },
  },
  {
    slug: 'suki-rewards',
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
    caseStudy: {
      context:
        'Suki Rewards connects physical STL ticket stubs to a mobile loyalty program, allowing bettors to submit proof, earn points, and follow raffle activity.',
      challenge:
        'Turn a camera-based ticket submission into a dependable mobile flow that remains understandable in both Filipino and English.',
      constraints: [
        'Photo uploads over variable mobile connections',
        'Low-end phones and narrow screens',
        'Asynchronous ticket review and point assignment',
        'Live leaderboard and raffle updates',
      ],
      decisions: [
        {
          title: 'Move uploads off the request path',
          description: 'Queued image processing so the interface can acknowledge a submission quickly while validation continues asynchronously.',
        },
        {
          title: 'Treat bilingual copy as product structure',
          description: 'Designed key actions and states for Filipino and English from the start instead of adding translation after layout decisions.',
        },
        {
          title: 'Prioritize status over decoration',
          description: 'Made points, submission state, leaderboard position, and raffle activity the primary mobile scanning targets.',
        },
      ],
    },
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
