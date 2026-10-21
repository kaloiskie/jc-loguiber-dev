import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/features/layout'
import { HomePageLayout } from './features/home/HomePageLayout'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { ExperiencePage } from '@/pages/ExperiencePage'
import { ProjectsPage } from '@/pages/ProjectsPage'

const ProjectCaseStudyPage = lazy(() => import('@/features/projects/ProjectCaseStudyPage'))

function App() {
  return (
    <Suspense fallback={<div className="route-loading">Loading project...</div>}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePageLayout />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
