import React, { useState, useEffect } from 'react'
import { useAuth } from '@/store/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { User, Library, Globe, Share2, Mail, Shield, Bell } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Link, useLocation } from 'react-router-dom'
import { api } from '@/api/client'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function AccountSettingsPage() {
  const { state, dispatch } = useAuth()
  const location = useLocation()
  
  // Detection logic for active tab
  let activeTab = 'profile'
  if (location.pathname.includes('security')) activeTab = 'security'
  else if (location.pathname.includes('emails')) activeTab = 'emails'
  else if (location.pathname.includes('notifications')) activeTab = 'notifications'

  const [notificationsEnabled, setNotificationsEnabled] = useState(state.user?.notifications_enabled ?? true)
  const [notificationsPriority, setNotificationsPriority] = useState(state.user?.notifications_priority ?? 'medium')
  const [isUpdating, setIsUpdating] = useState(false)

  // Profile state
  const [fullName, setFullName] = useState(state.user?.full_name ?? '')
  const [displayName, setDisplayName] = useState(state.user?.profile?.display_name ?? '')
  const [bio, setBio] = useState(state.user?.profile?.bio ?? '')
  const [institution, setInstitution] = useState(state.user?.profile?.institution ?? '')
  const [googleScholar, setGoogleScholar] = useState(state.user?.profile?.social_links?.scholar ?? '')
  const [researchInterests, setResearchInterests] = useState<string[]>(state.user?.profile?.research_interests ?? [])
  const [newInterest, setNewInterest] = useState('')

  useEffect(() => {
    if (state.user) {
      setNotificationsEnabled(state.user.notifications_enabled)
      setNotificationsPriority(state.user.notifications_priority)
      setFullName(state.user.full_name)
      if (state.user.profile) {
        setDisplayName(state.user.profile.display_name ?? '')
        setBio(state.user.profile.bio ?? '')
        setInstitution(state.user.profile.institution ?? '')
        setGoogleScholar(state.user.profile.social_links?.scholar ?? '')
        setResearchInterests(state.user.profile.research_interests ?? [])
      }
    }
  }, [state.user])

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} />, path: '/settings/profile' },
    { id: 'emails', label: 'Emails', icon: <Mail size={18} />, path: '/settings/emails' },
    { id: 'security', label: 'Security', icon: <Shield size={18} />, path: '/settings/security' },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, path: '/settings/notifications' },
  ]

  const handleUpdateSettings = async () => {
    setIsUpdating(true)
    try {
      await api.put('/api/v1/users/settings', {
        notifications_enabled: notificationsEnabled,
        notifications_priority: notificationsPriority,
      })
      
      alert("Settings updated: Your notification preferences have been saved.")
      
      if (state.user) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            accessToken: state.accessToken!,
            user: {
              ...state.user,
              notifications_enabled: notificationsEnabled,
              notifications_priority: notificationsPriority as any,
            }
          }
        })
      }
    } catch (err) {
      alert("Update failed: Could not save settings. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleUpdateProfile = async () => {
    setIsUpdating(true)
    try {
      await api.put('/api/v1/users/profile', {
        full_name: fullName,
        display_name: displayName,
        bio: bio,
        institution: institution,
        research_interests: researchInterests,
        google_scholar: googleScholar,
      })
      
      alert("Profile updated successfully!")
      
      // Update global auth state
      if (state.user) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            accessToken: state.accessToken!,
            user: {
              ...state.user,
              full_name: fullName,
              profile: {
                ...state.user.profile,
                display_name: displayName,
                bio: bio,
                institution: institution,
                research_interests: researchInterests,
                social_links: {
                  ...state.user.profile?.social_links,
                  scholar: googleScholar,
                }
              }
            }
          }
        })
      }
    } catch (err) {
      alert("Update failed: Could not save profile. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  const addInterest = () => {
    if (newInterest.trim() && !researchInterests.includes(newInterest.trim())) {
      setResearchInterests([...researchInterests, newInterest.trim()])
      setNewInterest('')
    }
  }

  const removeInterest = (tag: string) => {
    setResearchInterests(researchInterests.filter(t => t !== tag))
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-12 font-serif">
        <div className="mb-14">
          <h1 className="text-5xl font-normal tracking-tight">SETTINGS</h1>
          <p className="text-zinc-500 text-xl italic mt-4">Manage your academic profile and application preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-16">
          {/* Settings Sidebar */}
          <aside className="space-y-4">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[15px] transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-black text-white shadow-2xl shadow-black/20' 
                    : 'text-zinc-500 hover:bg-black/5 hover:text-black'
                }`}
              >
                {React.cloneElement(tab.icon as React.ReactElement<any>, { size: 18, strokeWidth: 1.5 })}
                {tab.label}
              </Link>
            ))}
          </aside>

          {/* Settings Content */}
          <div className="space-y-12">
            {activeTab === 'profile' && (
              <>
                <div className="rounded-[3.5rem] border border-black/5 bg-white/40 backdrop-blur-md shadow-sm overflow-hidden">
                  <div className="p-10 border-b border-black/5 flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-normal tracking-tight">Public Profile</h2>
                      <p className="text-zinc-500 text-lg italic mt-2">Information visible to other researchers.</p>
                    </div>
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-black/5 flex items-center justify-center text-3xl font-bold text-black shadow-xl shadow-black/5">
                          {state.user?.full_name?.charAt(0)}
                        </div>
                        <button className="absolute -bottom-2 -right-2 bg-[#444] text-white p-3 rounded-[1.2rem] shadow-xl hover:bg-black transition-all hover:scale-110">
                          <Share2 size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                  </div>
                  
                  <div className="p-10 space-y-10">
                    <div className="grid gap-10 md:grid-cols-2">
                      <div className="space-y-4">
                        <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Full Name</Label>
                        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-2xl border-black/5 bg-white px-6 py-8 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5" />
                      </div>
                      <div className="space-y-4">
                        <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Display Name</Label>
                        <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g. Dr. Jane Doe" className="rounded-2xl border-black/5 bg-white px-6 py-8 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Academic Bio</Label>
                      <textarea 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        placeholder="Tell us about your research focus..." 
                        className="flex min-h-[160px] w-full rounded-[2rem] border border-black/5 bg-white px-6 py-5 text-lg ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/5 focus-visible:bg-white transition-all font-serif placeholder:italic placeholder:text-zinc-300" 
                      />
                    </div>
                    
                    <div className="grid gap-10 md:grid-cols-2 pt-4">
                      <div className="space-y-4">
                        <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Institution</Label>
                        <Input value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="e.g. Stanford University" className="rounded-2xl border-black/5 bg-white px-6 py-8 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5" />
                      </div>
                      <div className="space-y-4">
                        <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Academic Website</Label>
                        <div className="relative">
                          <Globe size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300" strokeWidth={1} />
                          <Input value={googleScholar} onChange={(e) => setGoogleScholar(e.target.value)} placeholder="https://scholar.google.com/..." className="pl-16 rounded-2xl border-black/5 bg-white px-6 py-8 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <Button onClick={handleUpdateProfile} disabled={isUpdating} className="rounded-3xl px-12 py-8 text-xl bg-[#444] hover:bg-black text-white shadow-xl hover:shadow-2xl transition-all">
                        {isUpdating ? 'Saving...' : 'Save Profile Changes'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-[3.5rem] border border-black/5 bg-white/40 backdrop-blur-md shadow-sm overflow-hidden">
                  <div className="p-10 border-b border-black/5">
                    <h2 className="text-3xl font-normal tracking-tight flex items-center gap-4">
                      <Library size={28} strokeWidth={1} className="opacity-50" />
                      Research Interests
                    </h2>
                    <p className="text-zinc-500 text-lg italic mt-2">Add tags to help others find your work.</p>
                  </div>
                  <div className="p-10">
                    <div className="flex flex-wrap gap-4 mb-10">
                      {researchInterests.map(tag => (
                        <div key={tag} className="px-6 py-3 rounded-2xl bg-white border border-black/5 text-sm font-bold tracking-widest flex items-center gap-3 group hover:border-black/20 hover:bg-black hover:text-white transition-all cursor-pointer shadow-sm" onClick={() => removeInterest(tag)}>
                          {tag.toUpperCase()}
                          <span className="text-zinc-300 group-hover:text-white">×</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Input 
                        value={newInterest} 
                        onChange={(e) => setNewInterest(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                        placeholder="Add new research interest..." 
                        className="rounded-3xl border-black/5 bg-white px-8 py-9 text-lg font-serif focus:ring-2 focus:ring-black/5 transition-all shadow-sm flex-1" 
                      />
                      <Button onClick={addInterest} className="rounded-3xl px-10 py-9 text-lg font-serif bg-white border border-black/5 text-black hover:bg-black hover:text-white transition-all shadow-sm hover:shadow-xl">
                        Add Tag
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'emails' && (
              <div className="rounded-[3.5rem] border border-black/5 bg-white/40 backdrop-blur-md shadow-sm overflow-hidden">
                <div className="p-10 border-b border-black/5">
                  <h2 className="text-3xl font-normal tracking-tight">Email Addresses</h2>
                  <p className="text-zinc-500 text-lg italic mt-2">Manage how you receive internal communications.</p>
                </div>
                <div className="p-10 space-y-10">
                  <div className="space-y-4">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Primary Account Email</Label>
                    <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white border border-black/5 shadow-sm">
                      <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center border border-black/5">
                        <Mail size={24} className="text-black" strokeWidth={1} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xl font-normal text-black">{state.user?.email}</div>
                        <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Verified Primary Account</div>
                      </div>
                    </div>
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest px-4 italic opacity-60">Email changes are restricted during early access beta.</p>
                  </div>

                  <div className="w-full h-px bg-black/5" />

                  <div className="space-y-4">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Zosterix Support Channel</Label>
                    <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white border border-emerald-100/50 border-dashed shadow-sm">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50/30 flex items-center justify-center border border-emerald-100/50">
                        <Globe size={24} className="text-emerald-500" strokeWidth={1} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xl font-normal text-black font-serif">research-support@zosterix.com</div>
                        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Official System Sender</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="rounded-[3.5rem] border border-black/5 bg-white/40 backdrop-blur-md shadow-sm overflow-hidden">
                <div className="p-10 border-b border-black/5">
                  <h2 className="text-3xl font-normal tracking-tight">Notification Preferences</h2>
                  <p className="text-zinc-500 text-lg italic mt-2">Control how you wish to be alerted of new breakthroughs.</p>
                </div>
                <div className="p-10 space-y-12">
                  <div className="flex items-center justify-between bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
                    <div className="space-y-1">
                      <Label className="text-xl font-normal text-black">Enable Platform Alerts</Label>
                      <p className="text-lg text-zinc-400 italic">Breakthrough notifications, supervisor messages, and platform news.</p>
                    </div>
                    <Checkbox 
                      checked={notificationsEnabled} 
                      onCheckedChange={(checked) => setNotificationsEnabled(checked === true)}
                      className="w-8 h-8 rounded-xl border-2 border-black/10 data-[state=checked]:bg-black data-[state=checked]:border-black transition-all"
                    />
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <Label className="text-xl font-normal text-black pl-4">Alert Density</Label>
                      <p className="text-lg text-zinc-400 italic pl-4">Select the level of filtration for your research feed.</p>
                    </div>
                    
                    <RadioGroup 
                      value={notificationsPriority} 
                      onValueChange={(val) => setNotificationsPriority(val as any)}
                      className="grid grid-cols-2 gap-6"
                    >
                      {[
                        { id: 'low', label: 'Summary', desc: 'Weekly digests' },
                        { id: 'medium', label: 'Standard', desc: 'Relevant alerts' },
                        { id: 'high', label: 'Direct', desc: 'Immediate contact' },
                        { id: 'critical', label: 'Strict', desc: 'System only' },
                      ].map((p) => (
                        <div key={p.id} className="relative">
                          <RadioGroupItem
                            value={p.id}
                            id={p.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={p.id}
                            className="flex flex-col p-8 rounded-[2.5rem] bg-white border border-black/5 hover:border-black/20 cursor-pointer peer-data-[state=checked]:bg-[#444] peer-data-[state=checked]:text-white transition-all shadow-sm hover:shadow-xl"
                          >
                            <span className="font-bold text-sm uppercase tracking-[0.2em]">{p.label}</span>
                            <span className="text-[13px] italic mt-1 opacity-70">{p.desc}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="pt-6">
                    <Button 
                      onClick={handleUpdateSettings} 
                      disabled={isUpdating}
                      className="rounded-3xl px-12 py-8 text-xl bg-[#444] hover:bg-black text-white shadow-xl hover:shadow-2xl transition-all"
                    >
                      {isUpdating ? 'Saving...' : 'Confirm Preferences'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="rounded-[3.5rem] border border-black/5 bg-white/40 backdrop-blur-md shadow-sm p-16 text-center">
                <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-black/5 flex items-center justify-center mx-auto mb-10 text-zinc-200 shadow-xl shadow-black/5">
                  <Shield size={42} strokeWidth={1} />
                </div>
                <h3 className="text-4xl font-normal tracking-tight uppercase">Security Vault</h3>
                <p className="text-zinc-500 text-xl font-normal italic mt-4 max-w-sm mx-auto leading-relaxed">
                  "Manage your cryptographic credentials and multi-factor authentication in the security vault."
                </p>
                <Link to="/settings/security">
                  <Button className="mt-12 rounded-3xl font-serif text-lg py-8 px-12 bg-white border border-black/5 text-black hover:bg-black hover:text-white transition-all shadow-xl">
                    Enter Vault
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

