import { Link } from 'react-router-dom'
import { ArrowRight, Beaker, GraduationCap, Users, Shield, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8 border border-zinc-100">
            <Zap size={14} className="text-black" />
            Now in Private Beta
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 leading-[0.9]">
            RESEARCH<br />
            WITHOUT<br />
            <span className="text-zinc-600">BOUNDARIES.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-zinc-500 font-medium leading-relaxed mb-12">
            Zosterix is the premier ecosystem for scholars to connect, collaborate on breakthroughs, and find mentorship in a streamlined, minimalist environment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="rounded-2xl px-10 py-8 text-lg font-black tracking-tight group">
                Get Started
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/forum">
              <Button size="lg" variant="ghost" className="rounded-2xl px-10 py-8 text-lg font-black tracking-tight text-zinc-400 hover:text-black">
                Explore Community
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-100 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-50 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Stats/Proof Section */}
      <section className="py-24 bg-black text-white px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-black tracking-tighter mb-2">12K+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active Researchers</div>
            </div>
            <div>
              <div className="text-5xl font-black tracking-tighter mb-2">450+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Global Institutions</div>
            </div>
            <div>
              <div className="text-5xl font-black tracking-tighter mb-2">8.2k</div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Published Collaborations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Tools for the modern academic.</h2>
            <p className="text-zinc-500 font-medium text-lg">We've stripped away the noise of traditional social media to focus on what matters: the work.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-6 h-6" />,
                title: 'Global Network',
                desc: 'Connect with specialists across continents who share your niche research interests.'
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Verified Mentorship',
                desc: 'Our supervisor verification system ensures you connect with legitimate, approved mentors.'
              },
              {
                icon: <Beaker className="w-6 h-6" />,
                title: 'Live Lab Feeds',
                desc: 'Share incremental progress and get real-time feedback before official publication.'
              }
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-3xl border border-zinc-100 bg-white hover:border-black transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4">{f.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-zinc-50 p-12 md:p-24 text-center border border-zinc-100">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic">Ready to redefine your research journey?</h2>
          <Link to="/register">
            <Button size="lg" className="rounded-2xl px-12 py-8 text-xl font-black tracking-tight">
              Create Your Account
            </Button>
          </Link>
          <p className="mt-8 text-sm font-bold text-zinc-400 uppercase tracking-widest">No credit card required · Academic email preferred</p>
        </div>
      </section>
    </div>
  )
}
