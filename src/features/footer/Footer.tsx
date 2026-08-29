import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="contact" className="page-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="section-label">Contact</p>
          <div className="section-heading ruled-line">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text">
              Start a useful conversation.
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-text-muted mb-10 leading-relaxed">
              Available for remote opportunities. Response within 24 hours.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-accent shrink-0" size={14} />
                <span className="text-text-muted text-sm">
                  Tagum City, Davao del Norte, Philippines
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-accent shrink-0" size={14} />
                <span className="text-text-muted text-sm">
                  Philippine Standard Time (UTC+8)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-accent shrink-0" size={14} />
                <a
                  href="mailto:jcarlo.loguiber@gmail.com"
                  className="text-text-muted text-sm hover:text-accent transition-colors"
                >
                  jcarlo.loguiber@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="mailto:jcarlo.loguiber@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors duration-200"
              >
                <FaEnvelope size={14} />
                Send Email
              </a>
              <a
                href="https://github.com/kaloiskie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-light text-text text-sm font-medium hover:border-accent hover:text-accent transition-all duration-200"
              >
                <FaGithub size={14} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jhon-carlo-loguiber-28070136b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-light text-text text-sm font-medium hover:border-accent hover:text-accent transition-all duration-200"
              >
                <FaLinkedin size={14} />
                LinkedIn
              </a>
            </div>

            <p className="font-mono text-xs text-text-muted">
              &copy; {new Date().getFullYear()} Jhon Carlo L. Loguiber. Built with React &amp; TypeScript.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
