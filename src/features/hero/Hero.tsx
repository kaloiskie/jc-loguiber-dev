import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import { hero } from './hero.data'

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <div className="section-container relative z-10 w-full py-32">
        <div className="hero-layout">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="hero-photo-wrapper"
          >
            <picture>
              <source
                srcSet="/profilepicture.webp 1x, /profilepicture@2x.webp 2x"
                type="image/webp"
              />
              <source
                srcSet="/profilepicture.jpg 1x, /profilepicture@2x.jpg 2x"
                type="image/jpeg"
              />
              <img
                src="/profilepicture.jpg"
                alt="Jhon Carlo L. Loguiber"
                loading="lazy"
                decoding="async"
                className="hero-photo"
              />
            </picture>
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
          {hero.stats.map((stat, i) => (
            <div key={stat.label} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
