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

const profileStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Jhon Carlo L. Loguiber',
    url: 'https://jc-loguiber.site/',
    image: 'https://jc-loguiber.site/social-preview.png',
    jobTitle: 'Full-Stack Engineer',
    sameAs: [
      'https://github.com/kaloiskie',
      'https://www.linkedin.com/in/jhon-carlo-loguiber-28070136b/',
    ],
    knowsAbout: [
      'Full-stack web development',
      'Real-time systems',
      'React',
      'Node.js',
      'PostgreSQL',
      'Operational platforms',
    ],
  },
}

function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Helmet
        defaultTitle="Jhon Carlo L. Loguiber - Full-Stack Engineer"
        titleTemplate="%s - Jhon Carlo L. Loguiber"
      >
        <html lang="en" />
        <meta
          name="description"
          content="Full-stack engineer building reliable production systems, real-time workflows, and operational platforms."
        />
        <link rel="canonical" href="https://jc-loguiber.site/" />
        <meta property="og:title" content="Jhon Carlo L. Loguiber - Full-Stack Engineer" />
        <meta
          property="og:description"
          content="Full-stack engineer building reliable production systems, real-time workflows, and operational platforms."
        />
        <meta property="og:url" content="https://jc-loguiber.site/" />
        <meta property="og:site_name" content="Jhon Carlo L. Loguiber" />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://jc-loguiber.site/social-preview.png" />
        <meta property="og:image:secure_url" content="https://jc-loguiber.site/social-preview.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Jhon Carlo L. Loguiber, full-stack engineer building production systems"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jhon Carlo L. Loguiber - Full-Stack Engineer" />
        <meta
          name="twitter:description"
          content="Full-stack engineer building reliable production systems and real-time operational platforms."
        />
        <meta name="twitter:image" content="https://jc-loguiber.site/social-preview.png" />
        <meta
          name="twitter:image:alt"
          content="Jhon Carlo L. Loguiber, full-stack engineer building production systems"
        />
        <script type="application/ld+json">{JSON.stringify(profileStructuredData)}</script>
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

export { HomePage }
