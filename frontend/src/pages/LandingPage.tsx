import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Beaker, Globe, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Z_STATES = [
  // State 1: Blocky Z (Initial as per image)
  [
    { x: 100, y: 100 }, // Services
    { x: 300, y: 100 }, // Threads
    { x: 115, y: 400 }, // Blogs
    { x: 315, y: 400 }, // Contact us
  ],
  // State 2: Wide Z (Pattern 2)
  [
    { x: 50, y: 50 },
    { x: 350, y: 200 },
    { x: 100, y: 400 },
    { x: 380, y: 550 },
  ],
  // State 3: Mirrored Wide Z (Pattern 3)
  [
    { x: 350, y: 70 },
    { x: 50, y: 220 },
    { x: 320, y: 420 },
    { x: 80, y: 580 },
  ],
]

export function LandingPage() {
  const [stateIndex, setStateIndex] = useState(0)
  const [isLooping, setIsLooping] = useState(false)

  useEffect(() => {
    // Initial wait for 2 seconds in State 0
    const timer = setTimeout(() => {
      setStateIndex(1)
      setIsLooping(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLooping) return

    const interval = setInterval(() => {
      setStateIndex((current) => (current === 1 ? 2 : 1))
    }, 3000) // Change state every 4 seconds (2s transition + 2s pause or continuous)


    return () => clearInterval(interval)
  }, [isLooping])

  const points = Z_STATES[stateIndex]

  return (
    <div className="relative overflow-hidden font-serif">
      {/* Hero Section */}
      <section className="relative pt-18 pb-32 px-6 grid-bg min-h-[80vh] flex items-start">
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

          {/* Animated Z Graphic */}
          <div className="relative h-[650px] w-full flex items-center justify-center">
            <div className="relative w-[400px] h-[650px]">
              {/* The Z Lines (SVG) */}
              <svg viewBox="0 0 400 650" className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Line 1 (Primary) */}
                <path
                  d={`M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`}
                  stroke="black"
                  strokeWidth="1.2"
                  fill="none"
                  className="transition-all duration-[2000ms] ease-in-out"
                />
                {/* Line 2 (Parallel Offset) */}
                <path
                  d={`M ${points[0].x + 3} ${points[0].y + 3} L ${points[1].x + 3} ${points[1].y + 3} L ${points[2].x + 3} ${points[2].y + 3} L ${points[3].x + 3} ${points[3].y + 3}`}
                  stroke="black"
                  strokeWidth="0.8"
                  fill="none"
                  className="transition-all duration-[2000ms] ease-in-out opacity-40"
                />
              </svg>

              {/* Nodes */}
              <ZNode
                label="Services"
                x={points[0].x}
                y={points[0].y}
                path="/dashboard"
                position="bottom-left"
              />
              <ZNode
                label="Threads"
                x={points[1].x}
                y={points[1].y}
                path="/forum"
                position="top-right"
              />
              <ZNode
                label="Blogs"
                x={points[2].x}
                y={points[2].y}
                path="/blog"
                position="bottom-left"
              />
              <ZNode
                label="Contact us"
                x={points[3].x}
                y={points[3].y}
                path="/contact"
                position="top-right"
              />
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

function ZNode({ label, x, y, path, position }: { label: string, x: number, y: number, path: string, position: 'top-right' | 'bottom-left' }) {
  const labelStyles = {
    'top-right': 'bottom-full mb-2 left-0 -translate-y-2',
    'bottom-left': 'top-full mt-2 right-0 translate-y-2 text-right',
  };

  return (
    <Link
      to={path}
      className="absolute group z-20 cursor-pointer transition-all duration-[2000ms] ease-in-out flex items-center justify-center w-4 h-4"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <div className="w-4 h-4 bg-black rounded-full transition-transform group-hover:scale-150 shadow-[0_0_0_8px_rgba(0,0,0,0.05)] flex-shrink-0" />
      <span className={`absolute whitespace-nowrap text-[40px] font-serif text-black opacity-90 transition-opacity group-hover:opacity-100 ${labelStyles[position]}`}>
        {label}
      </span>
    </Link>
  )
}
