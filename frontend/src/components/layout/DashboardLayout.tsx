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
      flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group
      ${active 
        ? 'bg-black text-white shadow-lg' 
        : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
      }
    `}>
      <div className={`${active ? 'text-white' : 'text-zinc-400 group-hover:text-black'} transition-colors`}>
        {icon}
      </div>
      <span className="font-bold text-sm tracking-tight">{label}</span>
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
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-zinc-200 bg-white/80 backdrop-blur-md md:flex flex-col p-6 z-20">
        <Link to="/" className="mb-12 px-2">
          <img src="/zosterix.svg" alt="Zosterix" className="h-12 w-auto" />
        </Link>

        <nav className="flex-1 space-y-2">
          <div className="px-2 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Main Menu</span>
          </div>
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={location.pathname === item.path}
            />
          ))}
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-zinc-100">
          <SidebarItem 
            icon={<Settings size={20} />}
            label="Settings"
            path="/settings/security"
          />
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group"
          >
            <LogOut size={20} className="text-zinc-400 group-hover:text-red-600 transition-colors" />
            <span className="font-bold text-sm tracking-tight">Logout</span>
          </button>
        </div>

        {/* User Card */}
        <div className="mt-8 p-4 rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-black text-white flex items-center justify-center font-black text-xs">
            {state.user?.full_name?.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-black truncate tracking-tight">{state.user?.full_name}</p>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest truncate">{state.user?.role || 'Researcher'}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-10 w-full border-b border-zinc-100 bg-white/70 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search papers, experts, or projects..." 
              className="w-full pl-10 pr-4 py-2 bg-zinc-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-black/5 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="rounded-2xl text-zinc-500 hover:bg-zinc-50">
              <PlusCircle size={22} />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-2xl text-zinc-500 relative hover:bg-zinc-50">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full border-2 border-white" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Link to="/profile">
              <Button variant="outline" className="rounded-2xl font-bold text-xs gap-2 border-zinc-200">
                Account Settings
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
