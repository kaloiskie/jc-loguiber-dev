import { Awards } from '@/features/awards'
import { Education } from '@/features/education'
import { About } from '@/features/objective'
import { TechStack } from '@/features/skills'
import { PageMeta } from '@/shared/PageMeta'

function AboutPage() {
  return (
    <>
      <PageMeta
        title="About - Jhon Carlo L. Loguiber"
        description="Profile, technical range, education, and recognition for Jhon Carlo L. Loguiber, a full-stack developer building production systems."
        path="/about"
      />
      <About />
      <TechStack />
      <Education />
      <Awards />
    </>
  )
}

export { AboutPage }
