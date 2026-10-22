export interface NavItem {
  to: string
  label: string
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/flows', label: 'Flows' },
  { to: '/contact', label: 'Contact' },
]
