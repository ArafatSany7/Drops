import { Droplet, Lock, Mail, Loader2, Info } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, googleLogin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "149818820063-kbbh70q8d2k6u6t4on31j3j5isjrnksg.apps.googleusercontent.com";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Please provide both email and password.')
      return
    }

    setLoading(true)
    try {
      await login({ email, password })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoUser = () => {
    setEmail('user@drops.com');
    setPassword('password123');
  }

  const fillDemoAdmin = async () => {
    try {
      await fetch(import.meta.env.PROD ? '/api/auth/seed' : 'http://localhost:5000/api/auth/seed', { method: 'POST' });
    } catch (err) {
      console.error('Failed to seed demo accounts', err);
    }
    setEmail('admin@drops.com');
    setPassword('admin123');
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex flex-col md:flex-row bg-bg-subtle selection:bg-primary/20 selection:text-primary transition-colors">
        
        {/* Left Column - Image/Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop" 
              alt="Medical Professional" 
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          
          <div className="relative z-10 text-center px-12 max-w-lg">
            <Link to="/" className="inline-flex items-center gap-2 text-white font-bold text-3xl mb-8">
              <Droplet className="w-8 h-8 fill-current text-primary" />
              Drops
            </Link>
            <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">Welcome back to Drops</h1>
            <p className="text-gray-300 text-lg">Your continued support helps us maintain a stable blood supply for those in critical need.</p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-12 relative">
          
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Mobile Branding */}
            <div className="md:hidden text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold text-3xl">
                <Droplet className="w-8 h-8 fill-current" />
                Drops
              </Link>
            </div>

            <div className="bg-bg-surface border border-border-subtle rounded-3xl p-8 sm:p-10 shadow-2xl shadow-gray-200/50 dark:shadow-none">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-text-base mb-2">Sign in to your account</h2>
                <p className="text-sm text-text-muted">Don't have an account? <Link to="/registration" className="text-primary font-bold hover:underline">Register here</Link></p>
              </div>

              {/* Demo Credentials Alert */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-xl">
                <div className="flex gap-2 items-start text-sm text-blue-800 dark:text-blue-300">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold mb-2">Demo Accounts</p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button onClick={fillDemoUser} type="button" className="text-xs bg-white dark:bg-bg-surface px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors font-medium text-left">
                        Demo User
                      </button>
                      <button onClick={fillDemoAdmin} type="button" className="text-xs bg-white dark:bg-bg-surface px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors font-medium text-left">
                        Demo Admin
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-text-muted mb-2">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" 
                      className="w-full bg-bg-subtle border border-border-strong rounded-xl pl-10 pr-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-bold text-text-muted">Password</label>
                    <a href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-bg-subtle border border-border-strong rounded-xl pl-10 pr-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input type="checkbox" id="remember" className="w-4 h-4 rounded border-border-strong text-primary focus:ring-primary accent-primary bg-bg-subtle" />
                  <label htmlFor="remember" className="text-sm text-text-muted font-medium">Keep me signed in</label>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover transition shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-subtle"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-bg-surface text-text-muted">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center w-full">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    if (credentialResponse.credential) {
                      googleLogin(credentialResponse.credential);
                    }
                  }}
                  onError={() => {
                    setError('Google Login Failed');
                  }}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="100%"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </GoogleOAuthProvider>
  )
}
