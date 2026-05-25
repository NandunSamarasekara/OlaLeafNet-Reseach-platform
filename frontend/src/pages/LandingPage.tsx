import { Link } from 'react-router-dom'
import { ArrowRight, Beaker, Globe, Shield, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  return (
    <div className="relative overflow-hidden font-serif">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 grid-bg min-h-[90vh] flex items-center">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="text-6xl md:text-[110px] font-normal leading-[0.95] text-black mb-12 tracking-tight">
              RESEARCH<br />
              WITHOUT<br />
              BOUNDARIES
            </h1>
            <Link to="/register">
              <Button className="rounded-xl px-12 py-8 text-2xl font-serif bg-[#444] hover:bg-black text-white transition-all shadow-lg hover:shadow-xl">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Interactive Z Graphic */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* The Z Lines (SVG) */}
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="100" y1="100" x2="300" y2="100" stroke="black" strokeWidth="1" />
                <line x1="300" y1="100" x2="100" y2="300" stroke="black" strokeWidth="1" />
                <line x1="302" y1="102" x2="102" y2="302" stroke="black" strokeWidth="1" />
                <line x1="100" y1="300" x2="300" y2="300" stroke="black" strokeWidth="1" />
              </svg>

              {/* Nodes */}
              <ZNode label="Services" x="100" y="100" path="/dashboard" position="left" />
              <ZNode label="Threads" x="300" y="100" path="/forum" position="top" />
              <ZNode label="Blogs" x="100" y="300" path="/blog" position="bottom" />
              <ZNode label="Contact us" x="300" y="300" path="/contact" position="right" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 bg-[#f8faff] border-t border-zinc-100">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64">
               {/* Network Icon Concept */}
               <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="15" fill="none" stroke="black" strokeWidth="4" />
                  <circle cx="20" cy="20" r="8" fill="none" stroke="black" strokeWidth="4" />
                  <circle cx="80" cy="25" r="8" fill="none" stroke="black" strokeWidth="4" />
                  <circle cx="20" cy="65" r="8" fill="none" stroke="black" strokeWidth="4" />
                  <circle cx="75" cy="85" r="10" fill="none" stroke="black" strokeWidth="4" />
                  <line x1="28" y1="28" x2="40" y2="40" stroke="black" strokeWidth="4" />
                  <line x1="72" y1="32" x2="60" y2="45" stroke="black" strokeWidth="4" />
                  <line x1="28" y1="60" x2="38" y2="55" stroke="black" strokeWidth="4" />
                  <line x1="68" y1="78" x2="58" y2="65" stroke="black" strokeWidth="4" />
               </svg>
            </div>
          </div>
          <div className="flex-[1.5]">
            <p className="text-3xl md:text-5xl font-serif leading-tight text-zinc-900">
              premier ecosystem for scholars to connect, collaborate on breakthroughs, and find mentorship in a streamlined, minimalist environment.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#333] text-white px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-serif mb-4 tracking-tighter">12K+</div>
              <div className="text-2xl font-serif text-white opacity-90">Active researchers</div>
            </div>
            <div>
              <div className="text-6xl font-serif mb-4 tracking-tighter">450+</div>
              <div className="text-2xl font-serif text-white opacity-90">Global Institutions</div>
            </div>
            <div>
              <div className="text-6xl font-serif mb-4 tracking-tighter">8.2K+</div>
              <div className="text-2xl font-serif text-white opacity-90">Published Collaborators</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-32 px-6 bg-[#f8faff] grid-bg">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24">
            <h2 className="text-5xl md:text-[70px] font-serif mb-12">Tools for the modern academic...</h2>
            <p className="text-xl md:text-2xl font-serif text-zinc-800 max-w-3xl">
              We've stripped away the noise of traditional social media to focus on what matters: the work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Globe className="w-24 h-24 stroke-[1]" />,
                title: 'Global Network',
                path: '/feed'
              },
              {
                icon: <Shield className="w-24 h-24 stroke-[1]" />,
                title: 'Verified Mentorship',
                path: '/supervisors'
              },
              {
                icon: <Beaker className="w-24 h-24 stroke-[1]" />,
                title: 'Live Lab Feeds',
                path: '/blog'
              }
            ].map((f, i) => (
              <Link key={i} to={f.path} className="group relative p-12 rounded-[40px] border border-black/40 bg-white/20 hover:bg-white/40 transition-all flex flex-col items-center justify-center gap-12 aspect-square">
                <div className="text-black transition-transform group-hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="text-3xl font-serif flex items-center gap-4">
                  {f.title} <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-[#333] py-16 text-white text-center">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 text-2xl font-serif">
          <div>Create Blogs<br />on experience</div>
          <div>Create threads to<br />discuss forums</div>
          <div>Find supervisors<br />or collaborators</div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 px-6 grid-bg">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-[84px] font-serif mb-16 leading-tight">
            Ready to redefine your research journey?
          </h2>
          <Link to="/register">
            <Button className="rounded-2xl px-16 py-10 text-3xl font-serif bg-[#444] hover:bg-black text-white shadow-2xl transition-all">
              Create your Account
            </Button>
          </Link>
          <p className="mt-12 text-2xl font-serif text-zinc-800">
            No credit card required · Academic email preferred
          </p>
        </div>
      </section>
    </div>
  )
}

function ZNode({ label, x, y, path, position }: { label: string, x: string, y: string, path: string, position: 'top' | 'bottom' | 'left' | 'right' }) {
  const labelStyles = {
    top: 'bottom-full mb-4 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-4 left-1/2 -translate-x-1/2',
    left: 'right-full mr-4 top-1/2 -translate-y-1/2 text-right',
    right: 'left-full ml-4 top-1/2 -translate-y-1/2 text-left'
  };

  return (
    <Link 
      to={path}
      className="absolute group z-20 cursor-pointer"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <div className="w-4 h-4 bg-black rounded-full transition-transform group-hover:scale-150 shadow-[0_0_0_8px_rgba(0,0,0,0.05)]" />
      <span className={`absolute whitespace-nowrap text-3xl font-serif text-black opacity-90 transition-opacity group-hover:opacity-100 ${labelStyles[position]}`}>
        {label}
      </span>
    </Link>
  )
}
