import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Navbar.css' 

function Navbar() {
  const location = useLocation()

  return (
    <motion.nav 
      className="navbar-wrapper"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">
            <span className="logo-icon">🌱</span> 
            <span className="logo-text">OenKayeeAI</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Beranda</Link>
          <Link to="/detect" className={location.pathname === '/detect' ? 'active' : ''}>Deteksi</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Tentang</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Kontak</Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar