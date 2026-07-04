import { Outlet, Link, useLocation } from 'react-router-dom'
import { Droplet, Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Layout() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMenu = () => setIsMobileMenuOpen(false)

  const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <Link 
      to={to} 
      onClick={closeMenu}
      className={`hover:text-primary transition-colors block py-2 ${location.pathname === to ? 'text-primary font-bold' : ''}`}
    >
      {children}
    </Link>
  )

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <header className="flex items-center justify-between px-6 md:px-8 py-4 bg-bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-border-subtle transition-colors">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-primary font-bold text-xl">
          <Droplet className="w-6 h-6 fill-current" />
          Drops
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <Link to="/" className={`hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Home</Link>
          <Link to="/find-blood" className={`hover:text-primary transition-colors ${location.pathname === '/find-blood' ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Find Donor</Link>
          <Link to="/impact" className={`hover:text-primary transition-colors ${location.pathname === '/impact' ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>Impact</Link>
          <Link to="/about" className={`hover:text-primary transition-colors ${location.pathname === '/about' ? 'text-primary border-b-2 border-primary pb-1' : ''}`}>About</Link>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/profile" className="text-text-muted hover:text-primary transition-colors font-bold">Profile</Link>
              <button onClick={logout} className="bg-red-50 text-primary dark:bg-red-500/10 border border-red-100 dark:border-red-900/30 px-5 py-2.5 rounded-full hover:bg-red-100 dark:hover:bg-red-500/20 transition shadow-sm">Logout</button>
            </>
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
          <NavLink to="/impact">Impact</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="flex flex-col gap-4">
          {user ? (
            <>
              <Link to="/profile" onClick={closeMenu} className="text-text-base font-bold py-2 hover:text-primary transition-colors">Profile</Link>
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

      <footer className="border-t border-border-subtle bg-bg-surface py-6 transition-colors">
        <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-muted gap-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            Drops
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="#" className="hover:text-text-base">Privacy Policy</Link>
            <Link to="#" className="hover:text-text-base">Terms of Service</Link>
            <Link to="#" className="hover:text-text-base">Donor Guidelines</Link>
            <Link to="#" className="hover:text-text-base">Contact Medical Team</Link>
          </div>
          <div className="text-center md:text-left">
            &copy; 2024 Drops. Every drop matters.
          </div>
        </div>
      </footer>
    </div>
  )
}
