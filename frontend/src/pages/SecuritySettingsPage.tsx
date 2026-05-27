import { useAuth } from '@/store/auth'
import { Link } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Shield, Key, Mail, Trash2, User, Bell } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useState } from 'react'


export function SecuritySettingsPage() {
  const { state } = useAuth()
  const [activeTab, setActiveTab] = useState('security')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} />, path: '/settings/profile' },
    { id: 'account', label: 'Account', icon: <Mail size={18} />, path: '/settings/profile' },
    { id: 'security', label: 'Security', icon: <Shield size={18} />, path: '/settings/security' },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, path: '/settings/security' },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-12">
        <div className="mb-14">
          <h1 className="text-5xl font-serif font-normal tracking-tight text-black">SETTINGS</h1>
          <p className="text-zinc-500 text-xl font-serif italic mt-4">Manage your academic profile and application preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-16">
          {/* Settings Sidebar */}
          <aside className="space-y-3">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-serif text-[15px] transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-black text-white shadow-2xl shadow-black/20' 
                    : 'text-zinc-500 hover:bg-black/5 hover:text-black'
                }`}
              >
                {tab.icon}
                {tab.label}
              </Link>
            ))}
          </aside>

          <div className="space-y-12">
            <div className="rounded-[3rem] border border-black/5 bg-white/40 backdrop-blur-md shadow-sm overflow-hidden">
              <div className="p-10 border-b border-black/5">
                <h3 className="text-3xl font-serif tracking-tight flex items-center gap-3">
                  <Key className="h-7 w-7 opacity-50" strokeWidth={1} />
                  Change Password
                </h3>
                <p className="text-zinc-500 text-lg font-serif italic mt-3">Update your password to keep your account secure.</p>
              </div>
              <div className="p-10 space-y-10">
                <div className="grid gap-10 md:grid-cols-2">
                  <div className="space-y-4">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Current Password</Label>
                    <Input type="password" placeholder="••••••••" className="rounded-[1.5rem] border-black/5 bg-white px-6 py-8 text-lg font-serif" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">New Password</Label>
                    <Input type="password" placeholder="••••••••" className="rounded-[1.5rem] border-black/5 bg-white px-6 py-8 text-lg font-serif" />
                  </div>
                </div>
                <div className="pt-2">
                  <Button className="rounded-2xl px-10 py-8 font-serif text-lg bg-[#444] hover:bg-black text-white shadow-xl hover:shadow-2xl transition-all">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-[3rem] border-red-100/50 border bg-red-50/5 shadow-sm overflow-hidden">
              <div className="p-10 border-b border-black/5">
                <h3 className="text-3xl font-serif tracking-tight flex items-center gap-3 text-red-600">
                  <Trash2 className="h-7 w-7" strokeWidth={1} />
                  Danger Zone
                </h3>
                <p className="text-zinc-500 text-lg font-serif italic mt-3">Permanently delete your account and all associated data.</p>
              </div>
              <div className="p-10">
                <p className="text-lg text-zinc-500 font-serif leading-relaxed mb-10">
                  This action is irreversible. All your research data, profile info, and contributions will be permanently removed.
                </p>
                <Button variant="destructive" className="rounded-2xl px-10 py-8 font-serif text-lg shadow-xl shadow-red-500/10 transition-all hover:scale-[1.02]">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
