import { Experience } from '@/features/experience'
import { Leadership } from '@/features/leadership'
import { PageMeta } from '@/shared/PageMeta'

function ExperiencePage() {
  return (
    <>
      <PageMeta
        title="Experience - Jhon Carlo L. Loguiber"
        description="Work experience and leadership history across software development, IT supervision, and production operations."
        path="/experience"
      />
      <Experience />
      <Leadership />
    </>
  )
}

export { ExperiencePage }
