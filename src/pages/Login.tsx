import { Droplet, Mail, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'


export default function Login() {

 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const { login, googleLogin } = useAuth()

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   try {
     await login({ email, password })
   } catch (error) {
     // Error is already handled by toast in AuthContext
   }
 }

 useEffect(() => {
   const hash = window.location.hash;
   if (hash && hash.includes('id_token=')) {
     const params = new URLSearchParams(hash.substring(1));
     const idToken = params.get('id_token');
     if (idToken) {
       googleLogin(idToken).catch(err => {
          console.error(err);
          toast.error('Google login failed during backend verification.');
       });
       window.history.replaceState(null, '', window.location.pathname);
     }
   }
 }, [googleLogin]);

 const handleGoogleRedirect = () => {
   const clientId = "1081020593446-bmiilddii60shv8t471j4uu7i6hj44co.apps.googleusercontent.com";
   const redirectUri = window.location.origin + "/login";
   const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token&scope=email%20profile&nonce=random_nonce_123`;
   window.location.href = authUrl;
 };

 return (
 <div className="flex flex-1 bg-bg-subtle font-sans selection:bg-primary/20 selection:text-primary dark:selection:bg-primary/40 dark:selection:text-primary-100">
 
 {}
 <div className="flex-1 flex bg-bg-surface ">
 
 {}
 <div className="hidden lg:flex flex-col justify-between w-1/2 relative bg-gray-900 p-12 overflow-hidden">
 {}
 <div className="absolute inset-0 z-0">
 <img 
 src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop" 
 alt="Hospital Waiting" 
 className="w-full h-full object-cover opacity-50 mix-blend-overlay grayscale"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
 </div>

 <div className="z-10 flex items-center gap-2 text-white font-bold text-2xl">
 <Droplet className="w-8 h-8 fill-current text-primary" />
 Drops
 </div>

 <div className="z-10 max-w-md">
 <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
 "A single drop holds the power of a lifetime."
 </h2>
 <p className="text-gray-300 text-lg leading-relaxed">
 Join a community dedicated to saving lives. Your contribution ensures that when urgency strikes, hope is already there.
 </p>
 </div>
 </div>

 {}
 <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg-surface transition-colors">
 <div className="w-full max-w-md">
 
 {}
 <div className="flex w-full bg-bg-subtle p-1 rounded-xl mb-12 border border-border-subtle">
 <button className="flex-1 py-3 text-xs font-bold tracking-wider text-text-base bg-bg-surface rounded-lg shadow-sm">
 LOGIN
 </button>
 <Link to="/registration" className="flex-1 py-3 text-xs font-bold tracking-wider text-text-muted hover:text-text-base hover:text-text-base rounded-lg text-center flex items-center justify-center">
 CREATE ACCOUNT
 </Link>
 </div>

 <div className="mb-10">
 <h1 className="text-3xl font-extrabold text-text-base mb-2">Welcome back</h1>
 <p className="text-text-muted">Please enter your details to sign in.</p>
 </div>

 <form className="w-full space-y-5" onSubmit={handleSubmit}>
 
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
 <Mail className="h-5 w-5 text-text-muted" />
 </div>
 <input 
 type="email" 
 placeholder="Email Address" 
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className="block w-full pl-11 pr-4 py-4 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface dark:focus:bg-gray-900 focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors"
 />
 </div>

 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
 <Lock className="h-5 w-5 text-text-muted" />
 </div>
 <input 
 type="password" 
 placeholder="Password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
 className="block w-full pl-11 pr-4 py-4 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface dark:focus:bg-gray-900 focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors"
 />
 </div>

 <div className="flex items-center justify-between">
 <div className="flex items-center">
 <input id="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-border-strong rounded cursor-pointer" />
 <label htmlFor="remember-me" className="ml-2 block text-sm text-text-muted dark:text-text-muted cursor-pointer">
 Remember me
 </label>
 </div>
 <a href="#" className="text-sm font-bold text-primary hover:text-primary-hover">
 Forgot password?
 </a>
 </div>

 <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover transition shadow-lg shadow-primary/30 mt-6">
 Sign In
 </button>
 </form>

 <div className="relative my-10">
 <div className="absolute inset-0 flex items-center">
 <div className="w-full border-t border-border-strong" />
 </div>
 <div className="relative flex justify-center text-sm">
 <span className="px-2 bg-bg-surface text-text-muted">Or continue with</span>
 </div>
 </div>

 <div className="w-full">
 <button type="button" onClick={handleGoogleRedirect} className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-border-strong rounded-xl hover:bg-bg-subtle transition-colors font-medium text-text-base cursor-pointer">
 <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
 Continue with Google
 </button>
 </div>

 <div className="mt-12 text-center text-xs text-text-muted max-w-xs leading-relaxed">
 By continuing, you agree to Drops's <br/>
 <a href="#" className="underline hover:text-text-base">Terms of Service</a> and <a href="#" className="underline hover:text-text-base">Privacy Policy</a>.
 </div>

 </div>
 </div>

 </div>
 </div>
 )
}
