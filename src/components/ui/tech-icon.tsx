import type { IconType } from 'react-icons'
import {
  FaAndroid,
  FaAws,
  FaDatabase,
  FaJava,
  FaNodeJs,
  FaPython,
  FaReact,
  FaServer,
} from 'react-icons/fa'
import { FaFilePdf, FaGears } from 'react-icons/fa6'
import {
  SiDotnet,
  SiExpress,
  SiGit,
  SiGithub,
  SiGoogleappsscript,
  SiJavascript,
  SiKotlin,
  SiLeaflet,
  SiMysql,
  SiNginx,
  SiOllama,
  SiPm2,
  SiPostgresql,
  SiReactrouter,
  SiSocketdotio,
  SiSqlite,
  SiTailwindcss,
  SiTailscale,
  SiTampermonkey,
  SiTelegram,
  SiTypescript,
  SiUbuntu,
  SiVite,
} from 'react-icons/si'

const techIconMap: Record<string, IconType> = {
  React: FaReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Vite: SiVite,
  Tailwind: SiTailwindcss,
  'Socket.io': SiSocketdotio,
  'Socket.io (client)': SiSocketdotio,
  'Node.js': FaNodeJs,
  Express: SiExpress,
  'Express.js': SiExpress,
  Python: FaPython,
  'Python scripts': FaPython,
  'VB.NET': SiDotnet,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  'Ubuntu Server': SiUbuntu,
  PM2: SiPm2,
  Tailscale: SiTailscale,
  'AWS EC2': FaAws,
  Nginx: SiNginx,
  Git: SiGit,
  GitHub: SiGithub,
  PgBouncer: FaDatabase,
  CyberPanel: FaServer,
  Ollama: SiOllama,
  'Telegram Bot API': SiTelegram,
  Telegram: SiTelegram,
  'Google Apps Script': SiGoogleappsscript,
  Android: FaAndroid,
  Kotlin: SiKotlin,
  Java: FaJava,
  Tampermonkey: SiTampermonkey,
  Leaflet: SiLeaflet,
  'React Router': SiReactrouter,
  jsPDF: FaFilePdf,
}

interface TechIconProps {
  name: string
  size?: number
  title?: string
}

export function TechIcon({ name, size = 14, title }: TechIconProps) {
  const Icon = techIconMap[name] ?? FaGears
  return (
    <Icon
      size={size}
      title={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    />
  )
}
