import React from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowUpRight, 
  Files, 
  MessageSquare, 
  Share2, 
  Clock, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  Users
} from 'lucide-react'
import { useAuth } from '@/store/auth'

export function ResearcherDashboardPage() {
  const { state } = useAuth()
  const firstName = state.user?.full_name?.split(' ')[0] || 'Researcher'

  const stats = [
    { label: 'Citations', value: '1,284', grow: '+12%', icon: <ArrowUpRight className="text-zinc-400" size={18} /> },
    { label: 'H-Index', value: '24', grow: '+2', icon: <TrendingUp className="text-zinc-400" size={18} /> },
    { label: 'Total Reads', value: '45.2k', grow: '+1.4k', icon: <Files className="text-zinc-400" size={18} /> },
    { label: 'Collaborations', value: '18', grow: '+3', icon: <Users className="text-zinc-400" size={18} /> },
  ]

  const activeProjects = [
    {
      title: 'Neural Oscillations in Cognitive Load',
      category: 'Neuroscience',
      progress: 75,
      lastUpdated: '2 hours ago',
      collaborators: 4
    },
    {
      title: 'Quantum Entanglement in Biological Systems',
      category: 'Biophysics',
      progress: 30,
      lastUpdated: '1 day ago',
      collaborators: 2
    },
    {
      title: 'Decentralized Peer Review Protocol',
      category: 'Informatics',
      progress: 90,
      lastUpdated: '3 days ago',
      collaborators: 6
    }
  ]

  const recentActivity = [
    { type: 'cite', user: 'Dr. Sarah Chen', paper: 'Neural Oscillations V2', time: '1h ago' },
    { type: 'comment', user: 'Markus Weber', paper: 'Quantum Entanglement...', time: '4h ago' },
    { type: 'collab', user: 'Global Health Inst.', paper: 'Upcoming Grant Proposal', time: '12h ago' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-normal leading-[0.9] text-black mb-4 tracking-tight">
              WELCOME BACK,<br />
              <span className="text-zinc-400">{firstName.toUpperCase()}.</span>
            </h1>
            <p className="text-lg font-serif text-zinc-500">
              Your research impact has grown by <span className="text-black font-bold">12%</span> this week. Keep up the momentum.
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="rounded-2xl px-8 py-7 font-serif text-lg bg-[#444] hover:bg-black text-white transition-all shadow-xl hover:shadow-2xl">
              New Project
            </Button>
            <Button variant="outline" className="rounded-2xl px-8 py-7 font-serif text-lg border-black/10 hover:bg-black/5 transition-all">
              Share Profile
            </Button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-black/5 hover:border-black/20 hover:bg-white/60 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                  {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 22, strokeWidth: 1.5 })}
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest">{stat.grow}</span>
              </div>
              <div>
                <p className="text-4xl font-serif mb-2 tracking-tight">{stat.value}</p>
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Active Projects */}
          <section className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif tracking-tight">Active Projects</h2>
              <Button variant="ghost" className="text-zinc-400 font-serif text-sm gap-2 hover:text-black hover:bg-transparent transition-colors">
                View All <ChevronRight size={16} />
              </Button>
            </div>
            
            <div className="space-y-6">
              {activeProjects.map((project, i) => (
                <div key={i} className="group p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-black/5 hover:border-black/20 hover:bg-white/60 transition-all duration-700 shadow-sm hover:shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">{project.category}</p>
                    <h3 className="text-2xl font-serif tracking-tight group-hover:translate-x-1 transition-transform">{project.title}</h3>
                    <div className="flex items-center gap-6 text-[13px] font-serif text-zinc-400 mt-4">
                      <span className="flex items-center gap-2"><Clock size={14} className="opacity-50" /> {project.lastUpdated}</span>
                      <span className="flex items-center gap-2"><Users size={14} className="opacity-50" /> {project.collaborators} collaborators</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="flex-1 md:w-56 space-y-3 text-right">
                      <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-black rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{project.progress}% Complete</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-2xl text-zinc-300 hover:text-black hover:bg-black/5 h-12 w-12 transition-all">
                      <MoreHorizontal size={24} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Activity/Notifications */}
          <section className="space-y-8">
            <h2 className="text-3xl font-serif tracking-tight">Recent Updates</h2>
            <div className="rounded-[3rem] border border-black/5 bg-white/40 backdrop-blur-md p-2 shadow-sm">
              <div className="p-8 space-y-10">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex gap-6 relative group">
                    {i !== recentActivity.length - 1 && (
                      <div className="absolute left-[23px] top-12 bottom-[-32px] w-[1px] bg-black/5 group-hover:bg-black/20 transition-colors" />
                    )}
                    <div className="w-12 h-12 rounded-2xl bg-white flex-shrink-0 flex items-center justify-center border border-black/5 shadow-sm group-hover:shadow-md transition-all">
                      {activity.type === 'cite' && <Share2 className="text-zinc-600" size={18} />}
                      {activity.type === 'comment' && <MessageSquare className="text-zinc-600" size={18} />}
                      {activity.type === 'collab' && <Users className="text-zinc-600" size={18} />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-[15px] font-serif text-zinc-900 leading-relaxed">
                        <span className="font-bold text-black underline decoration-zinc-200 decoration-2 underline-offset-4">{activity.user}</span> 
                        {activity.type === 'cite' && ' cited your paper '}
                        {activity.type === 'comment' && ' commented on '}
                        {activity.type === 'collab' && ' requested collaboration on '}
                        <span className="text-zinc-400 italic">"{activity.paper}"</span>
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{activity.time}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full rounded-[1.5rem] py-8 font-serif text-lg border-black/5 hover:bg-black hover:text-white mt-4 transition-all shadow-sm">
                  View Full Activity
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
