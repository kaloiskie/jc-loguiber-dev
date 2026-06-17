import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { orgs } from './organizations.data'

function Organizations() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="organizations" className="py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label mb-3">05 / Organizations</p>
          <div className="ruled-line pb-8 mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Organizations I contribute to.
            </h2>
          </div>

          <div className="org-grid">
            {orgs.map((org, i) => (
              <motion.a
                key={org.login}
                href={`https://github.com/${org.login}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${org.login} on GitHub`}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.08 }}
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

          <div className="ruled-line mt-10 pt-3">
            <p className="text-text-muted font-mono text-[0.6rem]">
              pulled live · github.com/users/kaloiskie/orgs
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Organizations
