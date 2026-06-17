export interface Org {
  login: string
  avatar: string
  description: string
}

export const orgs: Org[] = [
  {
    login: 'Incredible-Gaming-Inc',
    avatar: '/Incredible.jpg',
    description: 'secure and scalable digital systems',
  },
  {
    login: 'Sinbad-Studios',
    avatar: '/Sinbad.jpg',
    description: 'skill-based competitive games',
  },
  {
    login: 'Northman-Gaming-Dev',
    avatar: '/Northman.jpg',
    description: 'core platform and tooling',
  },
]
