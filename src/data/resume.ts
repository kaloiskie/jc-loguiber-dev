import {
  FaReact, FaDatabase, FaServer, FaNetworkWired,
  FaRaspberryPi, FaBrain,
} from 'react-icons/fa6'
import {
  SiTypescript,
} from 'react-icons/si'

export interface Section {
  id: string
  label: string
}

export const navSections: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'objective', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'awards', label: 'Awards' },
]

export const hero = {
  name: 'Jhon Carlo L. Loguiber',
  title: 'Full-Stack Developer',
  tagline: 'Building production web systems from database design to deployment.',
  location: 'Mankilam, Tagum City, Davao del Norte, Philippines — 8100',
  email: 'jcarlo.loguiber@gmail.com',
  phone: '+63 951-456-7270',
}

export const objective = {
  title: 'Career Objective',
  content:
    'Full-stack developer with 1+ year building and maintaining production web systems using React, Express.js, Node.js, and PostgreSQL. Currently leading IT operations and software development at a licensed lottery operator in the Philippines — shipping features end-to-end, from database design to deployment. Experienced working across distributed infrastructure and async workflows. Open to remote backend or full-stack engineering roles.',
}

export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  highlights: string[]
}

export const experiences: ExperienceItem[] = [
  {
    role: 'IT Supervisor',
    company: 'Northman Gaming Corporation',
    location: 'Tagum City, Davao Del Norte, Philippines',
    period: 'March 2026 — Present',
    highlights: [
      'Lead and supervise a team of 2 IT Staff, assigning tasks, monitoring performance, and ensuring timely resolution of technical issues.',
      'Oversee daily IT operations, including system administration, network management, and user support.',
      'Coordinate incident response, escalation, and root cause analysis to minimize downtime.',
      'Plan and implement system improvements, infrastructure upgrades, and security measures.',
      'Ensure proper documentation, standard operating procedures, and compliance with IT policies.',
    ],
  },
  {
    role: 'IT Staff',
    company: 'Northman Gaming Corporation',
    location: 'Tagum City, Davao Del Norte, Philippines',
    period: 'June 2025 — March 2026',
    highlights: [
      'Provide technical support and troubleshooting for hardware, software, and network-related issues.',
      'Maintain and monitor computer systems, servers, Ubuntu Server environments, and local area networks.',
      'Develop and maintain company websites and full-stack web applications using Vite, React, Express.js, Node.js, and Python.',
      'Manage and optimize PostgreSQL and MySQL databases for efficiency and reliability.',
      'Oversee network configuration, monitoring, and performance tuning.',
    ],
  },
  {
    role: 'IT Intern (Practicum)',
    company: 'City Hall of Tagum City',
    location: 'Davao Del Norte, Philippines',
    period: 'October 2023 — January 2024',
    highlights: [
      'Assisted in maintaining and troubleshooting computer systems and office networks across various departments.',
      'Supported database management and records digitization to improve information accessibility.',
      'Provided technical support for staff, including hardware setup, software installation, and system updates.',
      'Participated in IT-related projects, gaining practical experience in government office systems and operations.',
    ],
  },
]

export interface SkillCategory {
  title: string
  items: string[]
  icon?: React.ComponentType<{ className?: string }>
}

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

export interface Award {
  title: string
  organization: string
  date: string
  description: string
}

export const awards: Award[] = [
  {
    title: 'Department Top Performing Employee',
    organization: 'Northman Gaming Corporation — STL Davao Del Norte',
    date: 'December 2025',
    description:
      'Recognized for outstanding performance and contributions within the IT Department. Awarded in acknowledgment of exemplary dedication, technical competency, and commitment to departmental and institutional goals.',
  },
]

export interface EducationItem {
  degree: string
  school: string
  period: string
  details: string[]
}

export const education: EducationItem[] = [
  {
    degree: 'BS Information Technology',
    school: 'University of Mindanao — Tagum Branch',
    period: '2021–2025',
    details: [
      'Core studies in programming, database management, networking, systems analysis, and web technologies.',
      'Completed practical projects in software development and IT infrastructure.',
    ],
  },
  {
    degree: 'Senior High School Diploma (GAS)',
    school: 'Nabunturan National Comprehensive High School Integrated',
    period: '2014–2020',
    details: [
      'Provided a broad foundation in communication, research, critical thinking, and problem-solving.',
    ],
  },
  {
    degree: 'Elementary Education',
    school: 'Mipangi Elementary School',
    period: '2008–2013',
    details: [
      'Completed elementary education with foundational training in literacy, numeracy, and basic sciences.',
    ],
  },
]

export interface LeadershipItem {
  role: string
  organization: string
  period: string
  details: string[]
}

export const leadership: LeadershipItem[] = [
  {
    role: 'Editor-in-Chief',
    organization: 'AURIUM — Official Collegiate Yearbook Publisher Office',
    period: '2025',
    details: [
      'Directed the editorial and creative production of the official collegiate yearbook.',
      'Led a multidisciplinary team of 10 members, enforced editorial standards, coordinated with university stakeholders.',
      'Introduced innovative design strategies to enhance engagement.',
    ],
  },
  {
    role: 'Managing Editor',
    organization: 'AURIUM — Official Collegiate Yearbook Publisher Office',
    period: '2024–2025',
    details: [
      'Assisted the Editor-in-Chief in supervising editorial workflow.',
      'Managed the editing team, ensured quality control across written and visual content.',
      'Acted as liaison between editorial and production teams to streamline publication processes.',
    ],
  },
  {
    role: 'Editorial Staff',
    organization: 'AURIUM — Official Collegiate Yearbook Publisher Office',
    period: '2023–2024',
    details: [
      'Contributed articles, assisted in proofreading, and supported layout and design processes.',
      'Collaborated with writers, photographers, and editors to produce accurate and engaging content.',
    ],
  },
  {
    role: 'Public Information Officer (PIO)',
    organization: 'Council of Student Organizations — University of Mindanao',
    period: '2023–2024',
    details: [
      'Managed internal and external communications for the council.',
      'Oversaw dissemination of official announcements, designed publication materials.',
      'Maintained transparency between student organizations and the university community.',
    ],
  },
  {
    role: 'President',
    organization: 'Computer Debuggers Society (CoDeS) — University of Mindanao',
    period: '2023–2024',
    details: [
      'Directed the organization\'s programs and initiatives in technology, programming, and student development.',
      'Coordinated training, workshops, and events to enhance IT competencies.',
      'Represented the society in academic and institutional activities while fostering collaboration among members.',
    ],
  },
]

export interface Interest {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export const interests: Interest[] = [
  {
    title: 'Artificial Intelligence',
    description: 'Passionate about applying AI to solve real-world problems and enhance system intelligence.',
    icon: FaBrain,
  },
  {
    title: 'Raspberry Pi Projects',
    description: 'Experimenting with embedded systems and IoT solutions.',
    icon: FaRaspberryPi,
  },
  {
    title: 'Smart Home Automation',
    description: 'Developing innovative solutions that bridge creativity and functionality.',
    icon: FaNetworkWired,
  },
]
