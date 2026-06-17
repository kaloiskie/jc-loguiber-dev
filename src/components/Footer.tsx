import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
import { hero } from '../data/resume'

function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-surface-alt/50 to-transparent" />
      <div className="section-container relative">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold gradient-text mb-4">{hero.name}</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Full-stack developer building production web systems. Open to remote backend and full-stack engineering roles.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <a
              href={`mailto:${hero.email}`}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-200"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href={`tel:${hero.phone.replace(/\s/g, '')}`}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-200"
              aria-label="Phone"
            >
              <FaPhone />
            </a>
            <a
              href="https://github.com/kaloiskie"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-200"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/jc-loguiber"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary mb-6">
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-primary" size={12} />
              {hero.location}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-secondary/30" />
            <a href={`mailto:${hero.email}`} className="hover:text-accent transition-colors">
              {hero.email}
            </a>
            <span className="w-1 h-1 rounded-full bg-text-secondary/30" />
            <a href={`tel:${hero.phone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">
              {hero.phone}
            </a>
          </div>

          <p className="text-text-secondary/50 text-sm flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} Jhon Carlo L. Loguiber. Built with
            <FaHeart className="text-red-400" size={12} />
            using React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
