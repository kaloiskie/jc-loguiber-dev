import { useEffect, type CSSProperties } from 'react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import { projects } from './projects.data'

type CaseStudyStyle = CSSProperties & { '--case-accent': string }

function ProjectCaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((candidate) => candidate.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (project?.title) document.title = `${project.title} - Project Case Study`
  }, [project?.title, slug])

  if (!project?.featured || !project.slug || !project.caseStudy) {
    return <Navigate to="/#projects" replace />
  }

  const canonicalUrl = `https://jc-loguiber.site/projects/${project.slug}`
  const projectImage = project.image
    ? `https://jc-loguiber.site${project.image}`
    : 'https://jc-loguiber.site/social-preview.png'
  const projectStyle: CaseStudyStyle = {
    '--case-accent': project.accent ?? '#7c6aff',
  }
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: canonicalUrl,
    image: projectImage,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    author: {
      '@type': 'Person',
      name: 'Jhon Carlo L. Loguiber',
      url: 'https://jc-loguiber.site/',
    },
    keywords: project.tech.join(', '),
  }

  return (
    <div className="case-study-page" style={projectStyle}>
      <Helmet>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${project.title} - Project Case Study`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={projectImage} />
        <meta property="og:image:alt" content={`${project.title} interface`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} - Project Case Study`} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={projectImage} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <header className="case-study-nav">
        <div className="case-study-container">
          <Link to="/#projects" className="case-study-back">
            <ArrowLeft size={16} />
            Selected work
          </Link>
          <span>Jhon Carlo Loguiber / Case study</span>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Live system <ExternalLink size={14} />
            </a>
          )}
        </div>
      </header>

      <main>
        <motion.section
          className="case-study-hero case-study-container"
          initial={false}
        >
          <div className="case-study-index">
            <span>{project.status === 'Production' ? 'Production system' : 'Live system concept'}</span>
            <span>{project.status}</span>
          </div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="case-study-hero-meta">
            <div>
              <span>Responsibility</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>Stack</span>
              <strong>{project.tech.join(' / ')}</strong>
            </div>
          </div>
        </motion.section>

        {project.image && (
          <motion.figure
            className="case-study-visual"
            initial={false}
          >
            <div className="case-study-container">
              <img
                src={project.image}
                alt={`${project.title} interface`}
                width="1360"
                height="616"
              />
              <figcaption>
                <span>{project.status === 'Production' ? 'Production interface' : 'Live concept interface'}</span>
                <span>Captured system view / 01</span>
              </figcaption>
            </div>
          </motion.figure>
        )}

        <section className="case-study-section case-study-container">
          <motion.div
            className="case-study-section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span>01 / Context</span>
            <h2>The operational setting.</h2>
          </motion.div>
          <div className="case-study-two-column">
            <p>{project.caseStudy.context}</p>
            <blockquote>{project.caseStudy.challenge}</blockquote>
          </div>
        </section>

        <section className="case-study-band">
          <div className="case-study-container">
            <div className="case-study-section-heading">
              <span>02 / System shape</span>
              <h2>Architecture and constraints.</h2>
            </div>
            <div className="case-study-architecture" aria-label="System architecture">
              {project.architecture?.map((layer, index) => (
                <motion.div
                  key={layer}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{layer}</strong>
                </motion.div>
              ))}
            </div>
            <ul className="case-study-constraints">
              {project.caseStudy.constraints.map((constraint) => (
                <li key={constraint}><Check size={15} /> {constraint}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-study-section case-study-container">
          <div className="case-study-section-heading">
            <span>03 / Engineering decisions</span>
            <h2>Choices made for the workflow.</h2>
          </div>
          <div className="case-study-decisions">
            {project.caseStudy.decisions.map((decision, index) => (
              <motion.article
                key={decision.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08 }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{decision.title}</h3>
                <p>{decision.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="case-study-outcome">
          <div className="case-study-container">
            <span>04 / Operational result</span>
            <h2>{project.result}</h2>
            <ul>
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
            <div className="case-study-outcome-links">
              <Link to="/#projects"><ArrowLeft size={15} /> All selected work</Link>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  Open live system <ArrowUpRight size={15} />
                </a>
              )}
              {project.repository && (
                <a href={project.repository} target="_blank" rel="noopener noreferrer">
                  View source <GitHubLogoIcon width={15} height={15} />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectCaseStudyPage
