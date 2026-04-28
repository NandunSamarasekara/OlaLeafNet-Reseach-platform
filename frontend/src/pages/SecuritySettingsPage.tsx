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
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter">SETTINGS</h1>
          <p className="text-zinc-500 font-medium mt-2">Manage your academic profile and application preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
          {/* Settings Sidebar */}
          <aside className="space-y-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-black text-white shadow-lg shadow-black/5' 
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                {tab.icon}
                {tab.label}
              </Link>
            ))}
          </aside>

          <div className="space-y-8">
            <Card className="rounded-[2.5rem] border-zinc-100 shadow-none bg-white">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <Key className="h-6 w-6" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-zinc-500 font-medium">Update your password to keep your account secure.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Current Password</Label>
                    <Input type="password" placeholder="••••••••" className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-6" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">New Password</Label>
                    <Input type="password" placeholder="••••••••" className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-6" />
                  </div>
                </div>
                <div className="pt-2">
                  <Button className="rounded-2xl px-8 py-6 font-bold shadow-xl shadow-black/5">Update Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-red-100 border bg-red-50/10 shadow-none">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-2 text-red-600">
                  <Trash2 className="h-6 w-6" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-zinc-500 font-medium">Permanently delete your account and all associated data.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-sm text-zinc-500 font-medium mb-6">
                  This action is irreversible. All your research data, profile info, and contributions will be permanently removed.
                </p>
                <Button variant="destructive" className="rounded-2xl px-8 py-6 font-bold shadow-xl shadow-red-500/10 transition-all hover:scale-105">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
