import { Outlet, Link, useLocation } from 'react-router-dom'
import { Droplet, Menu, X, BookOpen, Phone, ShieldCheck, FileText, Facebook, Github, Linkedin, ExternalLink } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import ProfileDropdown from './ProfileDropdown'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Layout() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMenu = () => setIsMobileMenuOpen(false)

  const isActive = (path: string) => location.pathname === path

  const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <Link
      to={to}
      onClick={closeMenu}
      className={`hover:text-primary transition-colors block py-2 ${isActive(to) ? 'text-primary font-bold' : ''}`}
    >
      {children}
    </Link>
  )

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header / Navbar */}
      <header className="w-full bg-bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-border-subtle transition-colors">
        <div className="flex items-center justify-between px-6 md:px-8 py-4 max-w-[1400px] mx-auto">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-primary font-bold text-xl">
            <Droplet className="w-6 h-6 fill-current" />
            Drops
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
            <Link to="/" className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Home</Link>
            <Link to="/find-blood" className={`hover:text-primary transition-colors ${isActive('/find-blood') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Find Donor</Link>
            {user && (
              <Link to="/dashboard" className={`hover:text-primary transition-colors ${location.pathname.startsWith('/dashboard') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Dashboard</Link>
            )}
            <Link to="/blog" className={`hover:text-primary transition-colors ${location.pathname.startsWith('/blog') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Blog</Link>
            <Link to="/impact" className={`hover:text-primary transition-colors ${isActive('/impact') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Impact</Link>
            <Link to="/about" className={`hover:text-primary transition-colors ${isActive('/about') ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>About</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <ThemeToggle />
            {user ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link to="/login" className="text-text-muted hover:text-primary transition-colors">Login</Link>
                <Link to="/registration" className="bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-hover transition shadow-lg shadow-primary/20">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-text-base hover:bg-bg-subtle rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed inset-0 top-[73px] z-40 bg-bg-surface/95 backdrop-blur-xl border-b border-border-subtle p-6 flex flex-col gap-6 h-[calc(100vh-73px)] overflow-y-auto transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 visible pointer-events-auto'
            : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-4 text-lg font-medium text-text-muted border-b border-border-subtle pb-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/find-blood">Find Donor</NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/impact">Impact</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="flex flex-col gap-4">
          {user ? (
            <>
              <Link to="/profile" onClick={closeMenu} className="text-text-base font-bold py-2 hover:text-primary transition-colors">Profile</Link>
              <Link to="/dashboard" onClick={closeMenu} className="text-text-base font-bold py-2 hover:text-primary transition-colors">Dashboard</Link>
              <button onClick={() => { logout(); closeMenu(); }} className="bg-red-50 text-primary dark:bg-red-500/10 border border-red-100 dark:border-red-900/30 w-full py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition shadow-sm text-center font-bold">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="w-full text-center py-3 bg-bg-subtle text-text-base rounded-xl font-bold border border-border-strong hover:bg-border-subtle transition-colors">Login</Link>
              <Link to="/registration" onClick={closeMenu} className="w-full text-center py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-colors">Register</Link>
            </>
          )}
        </div>
      </div>

      <main className="flex-1 bg-background flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-bg-surface py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xl mb-4">
                <Droplet className="w-6 h-6 fill-current" />
                Drops
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                A technology-driven platform connecting blood donors with those in critical need. Every drop saves a life.
              </p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/arafat.sany.836467?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-bg-subtle rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://github.com/ArafatSany7" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-bg-subtle rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/arafatsany" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-bg-subtle rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-text-base mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/find-blood" className="hover:text-primary transition-colors">Find Donor</Link></li>
                <li><Link to="/impact" className="hover:text-primary transition-colors">Our Impact</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/registration" className="hover:text-primary transition-colors">Become a Donor</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-text-base mb-4 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3 text-sm text-text-muted">
                <li><Link to="/blog" className="hover:text-primary transition-colors flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> Blog</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Terms of Service</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-text-base mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <div className="space-y-4 text-sm text-text-muted">
                <p>📍 Uttara North, Dhaka, Bangladesh</p>
                <p>📧 <a href="mailto:human.sany7@gmail.com" className="hover:text-primary transition-colors">human.sany7@gmail.com</a></p>
                
                <a href="https://arafat-sany.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors border border-primary/20">
                  <ExternalLink className="w-4 h-4" />
                  Contact Developer
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
            <p>&copy; {new Date().getFullYear()} Drops. Every drop matters.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
