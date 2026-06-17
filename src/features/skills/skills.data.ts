import type { SkillCategory } from '../../shared/types'

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    items: [
      'React',
      'Vite',
      'Socket.io (client)',
      'Tailwind',
    ],
  },
  {
    title: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'Python',
      'VB.NET',
    ],
  },
  {
    title: 'Databases',
    items: [
      'PostgreSQL',
      'MySQL',
      'SQLite',
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      'Ubuntu Server',
      'PM2',
      'Tailscale',
      'AWS EC2',
      'Nginx',
    ],
  },
  {
    title: 'Tools & DevOps',
    items: [
      'Git',
      'GitHub',
      'PgBouncer',
      'CyberPanel',
    ],
  },
  {
    title: 'AI / Automation',
    items: [
      'Ollama',
      'Telegram Bot API',
      'Python scripts',
      'Google Apps Script',
    ],
  },
]
