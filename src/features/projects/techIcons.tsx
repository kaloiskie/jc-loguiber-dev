import { FaGears } from 'react-icons/fa6'
import { techIconMap } from './techIconMap'

export function TechIcon({ name }: { name: string }) {
  const Icon = techIconMap[name] ?? FaGears
  return <Icon size={14} title={name} />
}
