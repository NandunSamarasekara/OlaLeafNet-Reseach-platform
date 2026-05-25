import { useAuth } from '@/store/auth'
import { LogOut, User as UserIcon, Bell, Menu, X, Github } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { api } from '@/api/client'

export function Navbar() {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/auth/logout')
    } finally {
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    }
  }

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <div className="flex items-center justify-between w-full max-w-7xl bg-[#c5c5c5]/60 backdrop-blur-2xl border border-white/30 rounded-full px-8 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <Link to="/" className="flex items-center">
          <img src="/zosterix-icon.svg" alt="Zosterix" className="h-10 w-auto opacity-90" />
        </Link>

        {/* Desktop Navigation - Center Pill */}
        <nav className="hidden items-center bg-zinc-800/10 rounded-full p-1.5 md:flex">
          {[
            { label: 'Home', path: '/' },
            { label: 'User Guide', path: '/guide' },
            { label: 'People', path: '/people' },
            { label: 'Trending', path: '/trending' },
            { label: 'Threads', path: '/forum' },
            { label: 'About us', path: '/about' },
          ].map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`
                  px-6 py-2 rounded-full text-[15px] font-medium transition-all duration-300
                  ${isActive
                    ? 'bg-white text-[#bb2a2a] shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                  }
                `}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Auth Actions & Social */}
        <div className="flex items-center gap-6">
          <Github size={20} className="text-zinc-600 hover:text-black cursor-pointer hidden md:block" />

          {!state.isAuthenticated ? (
            <div className="hidden items-center gap-4 md:flex">
              <Link to="/register">
                <Button className="rounded-full px-8 py-2.5 text-[15px] font-bold bg-black hover:bg-zinc-800 text-white transition-all">
                  Try Zosterix
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="hidden md:block mr-2 text-sm font-bold text-zinc-800 hover:text-black">Dashboard</Link>
              <Button variant="ghost" size="icon" className="rounded-full text-zinc-500">
                <Bell size={20} />
              </Button>

              <Link to="/profile" className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50/50 pl-1 pr-3 py-1 hover:bg-zinc-100 transition-colors md:flex">
                <div className="h-7 w-7 rounded-full bg-black text-[10px] text-white flex items-center justify-center font-bold">
                  {state.user?.full_name?.charAt(0)}
                </div>
                <span className="text-sm font-bold">{state.user?.full_name?.split(' ')[0]}</span>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="rounded-full text-zinc-500 hover:text-red-600"
              >
                <LogOut size={20} />
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-zinc-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-24 left-6 right-6 md:hidden rounded-[32px] border border-white/30 bg-white/80 backdrop-blur-xl p-8 space-y-6 shadow-2xl">
          <nav className="flex flex-col gap-3">
            {[
              { label: 'Home', path: '/' },
              { label: 'User Guide', path: '/guide' },
              { label: 'People', path: '/people' },
              { label: 'Trending', path: '/trending' },
              { label: 'Threads', path: '/forum' },
              { label: 'About us', path: '/about' },
            ].map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`
                    px-6 py-4 rounded-2xl text-lg font-medium transition-all
                    ${isActive ? 'bg-black text-white shadow-lg' : 'text-zinc-600 hover:bg-zinc-50'}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          {!state.isAuthenticated && (
            <div className="flex flex-col gap-3 pt-6 border-t border-zinc-50">
              <Link to="/login">
                <Button variant="outline" className="w-full rounded-xl py-6 font-bold">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full rounded-xl py-6 font-bold">Create Account</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
