import { FaReact, FaDatabase, FaServer, FaBrain } from 'react-icons/fa6'
import { SiTypescript } from 'react-icons/si'
import type { SkillCategory } from '../../shared/types'

export const skillCategories: SkillCategory[] = [
  {
    title: 'Website Development',
    items: [
      'Vite & React',
      'Express.js & Node.js',
      'Python backends',
      'RESTful APIs',
      'Auth & authorization',
      'Third-party integrations',
      'Git/GitHub version control',
      'Cloud & local deployment',
    ],
    icon: FaReact,
  },
  {
    title: 'Database Management',
    items: [
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'Complex queries',
      'Data normalization',
      'Performance tuning',
      'Security & reliability',
      'Large dataset handling',
    ],
    icon: FaDatabase,
  },
  {
    title: 'TypeScript & Ecosystem',
    items: [
      'TypeScript (tsc, tsx)',
      'Strict type checking',
      'Generics & utility types',
      'Interface & type aliases',
      'Declaration files (.d.ts)',
      'tsconfig configuration',
      'Type-safe API contracts',
      'ESLint + TS integration',
    ],
    icon: SiTypescript,
  },
  {
    title: 'Software Development',
    items: [
      'VB.NET',
      'JavaScript / TypeScript',
      'Python',
      'Desktop applications',
      'Web applications',
      'SDLC practices',
      'Debugging & problem-solving',
      'User-focused solutions',
    ],
    icon: SiTypescript,
  },
  {
    title: 'AI & Machine Learning',
    items: [
      'Python ML libraries',
      'Data processing',
      'Automation scripting',
      'AI-powered solutions',
      'System intelligence',
      'Real-world AI applications',
    ],
    icon: FaBrain,
  },
  {
    title: 'API & Webhook Integration',
    items: [
      'REST APIs',
      'JSON data exchange',
      'Webhook automation',
      'Cross-platform sync',
      'Workflow automation',
    ],
    icon: FaServer,
  },
  {
    title: 'Digital Tools',
    items: [
      'Adobe Photoshop',
      'Canva',
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'Adobe Acrobat',
      'Microsoft Office Suite',
    ],
    icon: FaReact,
  },
]
