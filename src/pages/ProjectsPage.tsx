import { Projects } from '@/features/projects'
import { PageMeta } from '@/shared/PageMeta'

function ProjectsPage() {
  return (
    <>
      <PageMeta
        title="Projects - Jhon Carlo L. Loguiber"
        description="Selected production systems, operational platforms, and shipped work by Jhon Carlo L. Loguiber."
        path="/projects"
      />
      <Projects />
    </>
  )
}

export { ProjectsPage }
