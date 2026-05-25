import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  PlusCircle,
  TrendingUp,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { useAuth } from '@/store/auth'
import { api } from '@/api/client'
import { useNavigate } from 'react-router-dom'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  path: string
  active?: boolean
}

const SidebarItem = ({ icon, label, path, active }: SidebarItemProps) => (
  <Link to={path}>
    <div className={`
      flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group
      ${active 
        ? 'bg-black text-white shadow-xl shadow-black/10' 
        : 'text-zinc-500 hover:bg-black/5 hover:text-black'
      }
    `}>
      <div className={`${active ? 'text-white' : 'text-zinc-400 group-hover:text-black'} transition-colors`}>
        {icon}
      </div>
      <span className="font-serif text-[15px] font-medium tracking-tight">{label}</span>
    </div>
  </Link>
)

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/auth/logout')
    } finally {
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    }
  }

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
    { icon: <BookOpen size={20} />, label: 'My Research', path: '/dashboard/research' },
    { icon: <Users size={20} />, label: 'Collaborations', path: '/dashboard/network' },
    { icon: <TrendingUp size={20} />, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: <Award size={20} />, label: 'Funding', path: '/dashboard/funding' },
  ]

  return (
    <div className="flex min-h-screen bg-[#f8faff] font-sans selection:bg-black selection:text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-black/5 bg-white/40 backdrop-blur-2xl md:flex flex-col p-8 z-20">
        <Link to="/" className="mb-14 px-2 flex items-center gap-3">
          <img src="/zosterix-icon.svg" alt="Zosterix Icon" className="h-8 w-auto brightness-0" />
          <img src="/zosterix.svg" alt="Zosterix" className="h-6 w-auto brightness-0" />
        </Link>

        <nav className="flex-1 space-y-1.5">
          <div className="px-4 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Main Menu</span>
          </div>
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.label}
              icon={React.cloneElement(item.icon as React.ReactElement<any>, { size: 18, strokeWidth: 2.5 })}
              label={item.label}
              path={item.path}
              active={location.pathname === item.path}
            />
          ))}
        </nav>

        <div className="mt-auto space-y-1.5 pt-8 border-t border-black/5">
          <SidebarItem 
            icon={<Settings size={18} strokeWidth={2.5} />}
            label="Settings"
            path="/settings/security"
          />
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-4 px-5 py-3.5 rounded-2xl text-zinc-500 hover:bg-red-50/50 hover:text-red-600 transition-all duration-300 group"
          >
            <LogOut size={18} strokeWidth={2.5} className="text-zinc-400 group-hover:text-red-600 transition-colors" />
            <span className="font-serif text-[15px] font-medium tracking-tight">Logout</span>
          </button>
        </div>

        {/* User Card */}
        <div className="mt-10 p-5 rounded-[2rem] bg-black text-white flex items-center gap-4 shadow-2xl shadow-black/20">
          <div className="h-11 w-11 rounded-2xl bg-zinc-800 flex items-center justify-center font-serif text-lg font-bold">
            {state.user?.full_name?.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-[15px] font-serif font-bold truncate tracking-tight">{state.user?.full_name}</p>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest truncate">{state.user?.role || 'Researcher'}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 min-h-screen grid-bg">
        {/* Top Header */}
        <header className="sticky top-0 z-10 w-full border-b border-black/5 bg-white/40 backdrop-blur-2xl px-10 py-5 flex items-center justify-between">
          <div className="relative w-full max-w-xl hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Search papers, experts, or projects..." 
              className="w-full pl-12 pr-6 py-3 bg-black/5 border-none rounded-2xl text-[14px] font-medium placeholder:text-zinc-400 focus:ring-2 focus:ring-black/5 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-5">
            <Button size="icon" variant="ghost" className="rounded-2xl text-zinc-500 hover:bg-black/5 h-12 w-12">
              <PlusCircle size={22} strokeWidth={2} />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-2xl text-zinc-500 relative hover:bg-black/5 h-12 w-12">
              <Bell size={22} strokeWidth={2} />
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-black rounded-full border-2 border-white" />
            </Button>
            <Separator orientation="vertical" className="h-8 mx-1 bg-black/5" />
            <Link to="/profile">
              <Button variant="outline" className="rounded-2xl font-serif font-bold text-sm px-6 py-6 border-black/5 hover:bg-black hover:text-white transition-all">
                Account Settings
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
