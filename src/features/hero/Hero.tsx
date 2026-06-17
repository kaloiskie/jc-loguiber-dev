import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import { hero } from './hero.data'
import { useGitHubStats } from './useGitHubStats'

function Hero() {
  const { yearsExp, reposDisplay, commitsDisplay } = useGitHubStats()

  const stats = [
    { label: 'years experience', value: yearsExp },
    { label: 'repositories', value: reposDisplay ?? hero.stats[1].value },
    { label: 'commits', value: commitsDisplay ?? hero.stats[2].value },
  ]
  return (
    <section id="hero" className="relative min-h-screen flex items-start md:items-center pt-16 pb-16 md:pt-0 md:pb-0">
      <div className="section-container relative z-10 w-full py-12 md:py-32">
        <div className="hero-layout">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="hero-photo-wrapper"
          >
            <img
              src="/profilepicture.jpg"
              alt="Jhon Carlo L. Loguiber"
              className="hero-photo"
            />
            <span className="hero-photo-dot" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="hero-content"
          >
            <p className="hero-handle">
              {hero.handle} <span className="text-text-muted">· {hero.pronouns}</span>
            </p>

            <h1 className="hero-name">{hero.name}</h1>

            <p className="hero-role">{hero.role}</p>

            <p className="hero-location">{hero.location}</p>

            {hero.bio.map((sentence, i) => (
              <p key={i} className="hero-bio">
                {sentence}
              </p>
            ))}

            <div className="hero-pills">
              {hero.techStack.map((tech) => (
                <span key={tech} className="hero-pill">
                  {tech}
                </span>
              ))}
            </div>

            <div className="hero-actions">
              <div className="hero-socials">
                <a
                  href={hero.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-btn"
                  aria-label="GitHub"
                >
                  <FaGithub size={15} />
                </a>
                <a
                  href={hero.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-btn"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={15} />
                </a>
                <a
                  href={`mailto:${hero.email}`}
                  className="hero-social-btn"
                  aria-label="Email"
                >
                  <FaEnvelope size={15} />
                </a>
              </div>

              {hero.openToWork && (
                <span className="hero-status">
                  <span className="hero-status-dot" />
                  Open to work
                </span>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="hero-stats"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          className="mt-8"
        >
          <p className="text-text-muted font-mono text-[0.6rem] mb-4">
            Organizations I contribute to
          </p>
          <div className="org-grid">
            {hero.orgs.map((org, i) => (
              <motion.a
                key={org.login}
                href={`https://github.com/${org.login}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${org.login} on GitHub`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.55 + i * 0.06 }}
                className="org-card"
              >
                <img
                  src={org.avatar}
                  alt=""
                  width={36}
                  height={36}
                  className="org-avatar"
                  loading="lazy"
                  decoding="async"
                />
                <div className="org-meta">
                  <span className="org-name">{org.login}</span>
                  <span className="org-description">{org.description}</span>
                </div>
                <svg
                  className="org-arrow"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
