import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/features/home/HomePage'

const ProjectCaseStudyPage = lazy(() => import('@/features/projects/ProjectCaseStudyPage'))

function App() {
  return (
    <Suspense fallback={<div className="route-loading">Loading project...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
