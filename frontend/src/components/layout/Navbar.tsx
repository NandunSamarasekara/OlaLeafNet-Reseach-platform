import { useAuth } from '@/store/auth'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User as UserIcon, Bell, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/api/client'

export function Navbar() {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()
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
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center">
          <img src="/zosterix.svg" alt="Zosterix" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: 'Home', path: '/' },
            { label: 'User Guide', path: '/guide' },
            { label: 'People', path: '/people' },
            { label: 'Trending', path: '/trending' },
            { label: 'Threads', path: '/forum' },
            { label: 'About us', path: '/about' },
          ].map((item) => (
            <Link 
              key={item.label}
              to={item.path} 
              className="text-[17px] font-serif text-zinc-800 transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-8">
          {!state.isAuthenticated ? (
            <div className="hidden items-center gap-8 md:flex">
              <Link to="/login" className="text-[17px] font-serif text-zinc-800 hover:text-black transition-colors">Log in</Link>
              <Link to="/register">
                <Button className="rounded-xl px-8 py-6 text-[17px] font-serif bg-[#444] hover:bg-black text-white">Sign up</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="hidden md:block mr-2 text-sm font-bold text-zinc-800 hover:text-black">Dashboard</Link>
              <Button variant="ghost" size="icon" className="rounded-full text-zinc-500">
                <Bell size={20} />
              </Button>
              
              <Link to="/profile" className="hidden items-center gap-2 rounded-full border border-zinc-100 bg-zinc-50 pl-1 pr-3 py-1 hover:bg-zinc-100 transition-colors md:flex">
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
        <div className="md:hidden border-t border-zinc-100 bg-white p-6 space-y-6">
          <nav className="flex flex-col gap-4">
            <Link to="/feed" className="text-lg font-bold">Feed</Link>
            <Link to="/forum" className="text-lg font-bold">Forum</Link>
            <Link to="/supervisors" className="text-lg font-bold">Supervisors</Link>
            <Link to="/blog" className="text-lg font-bold">Blog</Link>
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
