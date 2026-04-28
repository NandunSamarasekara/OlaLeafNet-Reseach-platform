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
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-2">
              WELCOME BACK, <span className="text-zinc-400">{firstName.toUpperCase()}</span>.
            </h1>
            <p className="text-zinc-500 font-medium">Your research impact has grown by <span className="text-black font-bold">12%</span> this week. Keep up the momentum.</p>
          </div>
          <div className="flex gap-3">
            <Button className="rounded-2xl px-6 py-6 font-bold shadow-xl shadow-black/5 hover:shadow-black/10 transition-all">
              New Project
            </Button>
            <Button variant="outline" className="rounded-2xl px-6 py-6 font-bold border-zinc-200">
              Share Profile
            </Button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="rounded-[2.5rem] border-zinc-100 shadow-none hover:border-black transition-all duration-500 group overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-tighter">{stat.grow}</span>
                </div>
                <div>
                  <p className="text-3xl font-black tracking-tighter mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Projects */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tighter">ACTIVE PROJECTS</h2>
              <Button variant="ghost" className="text-zinc-400 font-bold text-xs gap-1 hover:text-black hover:bg-transparent">
                VIEW ALL <ChevronRight size={14} />
              </Button>
            </div>
            
            <div className="space-y-4">
              {activeProjects.map((project, i) => (
                <div key={i} className="group p-6 rounded-[2rem] bg-white border border-zinc-100 hover:border-black transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{project.category}</p>
                    <h3 className="text-xl font-black tracking-tight">{project.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 mt-2">
                      <span className="flex items-center gap-1"><Clock size={14} /> {project.lastUpdated}</span>
                      <span className="flex items-center gap-1"><Users size={14} /> {project.collaborators} collaborators</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="flex-1 md:w-48 space-y-2 text-right">
                      <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-black rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{project.progress}% Complete</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-2xl text-zinc-400">
                      <MoreHorizontal size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Activity/Notifications */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter">RECENT UPDATES</h2>
            <Card className="rounded-[2.5rem] border-zinc-100 shadow-none bg-white p-2">
              <CardContent className="p-6 space-y-8">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== recentActivity.length - 1 && (
                      <div className="absolute left-[19px] top-10 bottom-[-24px] w-[2px] bg-zinc-50" />
                    )}
                    <div className="w-10 h-10 rounded-2xl bg-zinc-50 flex-shrink-0 flex items-center justify-center border border-zinc-100">
                      {activity.type === 'cite' && <Share2 className="text-zinc-600" size={16} />}
                      {activity.type === 'comment' && <MessageSquare className="text-zinc-600" size={16} />}
                      {activity.type === 'collab' && <Users className="text-zinc-600" size={16} />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-bold text-zinc-900 leading-tight">
                        <span className="font-black">{activity.user}</span> 
                        {activity.type === 'cite' && ' cited your paper '}
                        {activity.type === 'comment' && ' commented on '}
                        {activity.type === 'collab' && ' requested collaboration on '}
                        <span className="text-zinc-400">"{activity.paper}"</span>
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{activity.time}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full rounded-2xl py-6 font-bold text-sm border-zinc-100 hover:bg-zinc-50 mt-4">
                  View Full Activity
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
