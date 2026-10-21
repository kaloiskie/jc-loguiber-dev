import { Contact } from '@/features/footer'
import { Hero } from '@/features/hero'
import { Experience } from '@/features/experience'
import { GitHub } from '@/features/github'
import { Leadership } from '@/features/leadership'
import { About } from '@/features/objective'
import { Awards } from '@/features/awards'
import { Education } from '@/features/education'
import { TechStack } from '@/features/skills'
import { PageMeta } from '@/shared/PageMeta'

const profileStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Jhon Carlo L. Loguiber',
    url: 'https://jc-loguiber.site/',
    image: 'https://jc-loguiber.site/social-preview.png',
    jobTitle: 'Full-Stack Developer & IT Operations Professional',
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
      'IT operations',
    ],
  },
}

function HomePageLayout() {
  return (
    <>
      <PageMeta
        title="Jhon Carlo L. Loguiber - Full-Stack Developer & IT Operations Professional"
        description="Full-stack developer and IT operations professional with 4+ years of experience building reliable production systems, real-time workflows, and operational platforms."
        path="/"
        type="profile"
        structuredData={profileStructuredData}
      />
      <Hero />
      <div data-scroll-reveal><About /></div>
      <div data-scroll-reveal><TechStack /></div>
      <div data-scroll-reveal><Education /></div>
      <div data-scroll-reveal><Awards /></div>
      <div data-scroll-reveal><Experience /></div>
      <div data-scroll-reveal><Leadership /></div>
      <div data-scroll-reveal><GitHub /></div>
      <div data-scroll-reveal><Contact /></div>
    </>
  )
}

export { HomePageLayout }
