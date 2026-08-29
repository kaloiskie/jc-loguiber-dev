import { Helmet } from 'react-helmet-async'
import { Awards } from '@/features/awards'
import { Education } from '@/features/education'
import { Experience } from '@/features/experience'
import { Contact } from '@/features/footer'
import { GitHub } from '@/features/github'
import { Hero } from '@/features/hero'
import { SiteNavigation } from '@/features/navigation'
import { About } from '@/features/objective'
import { Projects } from '@/features/projects'
import { TechStack } from '@/features/skills'

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Helmet
        defaultTitle="Jhon Carlo L. Loguiber — Full-Stack Engineer"
        titleTemplate="%s — Jhon Carlo L. Loguiber"
      >
        <html lang="en" />
        <meta
          name="description"
          content="Full-stack engineer building reliable production systems, real-time workflows, and operational platforms."
        />
        <meta property="og:title" content="Jhon Carlo L. Loguiber — Full-Stack Engineer" />
        <meta
          property="og:description"
          content="Full-stack engineer building reliable production systems, real-time workflows, and operational platforms."
        />
        <meta property="og:image" content="/helmet.png" />
        <meta property="og:image:width" content="761" />
        <meta property="og:image:height" content="440" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jhon Carlo L. Loguiber — Full-Stack Engineer" />
        <meta
          name="twitter:description"
          content="Full-stack engineer building reliable production systems and real-time operational platforms."
        />
        <meta name="twitter:image" content="/helmet.png" />
      </Helmet>

      <SiteNavigation />

      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <TechStack />
        <GitHub />
        <Education />
        <Awards />
      </main>

      <Contact />
    </div>
  )
}

export default App
