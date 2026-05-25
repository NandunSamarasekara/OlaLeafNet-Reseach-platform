import { BookOpen, Search, Users, Shield, Zap, Globe } from 'lucide-react'
import { useEffect, useRef } from 'react'

function NeuronNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas!.width) this.x = 0
        else if (this.x < 0) this.x = canvas!.width
        if (this.y > canvas!.height) this.y = 0
        else if (this.y < 0) this.y = canvas!.height
      }

      draw() {
        ctx!.fillStyle = 'rgba(0, 0, 0, 0.4)'
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    const init = () => {
      particles = []
      const particleCount = 40
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.sqrt(
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2
          )
          if (distance < 100) {
            ctx!.strokeStyle = `rgba(0, 0, 0, ${1 - distance / 100})`
            ctx!.lineWidth = 0.5
            ctx!.beginPath()
            ctx!.moveTo(particles[a].x, particles[a].y)
            ctx!.lineTo(particles[b].x, particles[b].y)
            ctx!.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      connect()
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
        init()
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" />
}

function MentorshipFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let pulses: Pulse[] = []

    class Pulse {
      angle: number
      distance: number
      speed: number
      opacity: number

      constructor(angle: number) {
        this.angle = angle
        this.distance = 0
        this.speed = 1 + Math.random() * 2
        this.opacity = 1
      }

      update() {
        this.distance += this.speed
        this.opacity -= 0.005
        return this.opacity > 0
      }

      draw(centerX: number, centerY: number) {
        const x = centerX + Math.cos(this.angle) * this.distance
        const y = centerY + Math.sin(this.angle) * this.distance
        ctx!.fillStyle = `rgba(0, 0, 0, ${this.opacity * 0.4})`
        ctx!.beginPath()
        ctx!.arc(x, y, 2, 0, Math.PI * 2)
        ctx!.fill()

        // Draw connecting line from center
        if (this.distance > 20) {
          ctx!.strokeStyle = `rgba(0, 0, 0, ${this.opacity * 0.1})`
          ctx!.lineWidth = 0.5
          ctx!.beginPath()
          ctx!.moveTo(centerX + Math.cos(this.angle) * 20, centerY + Math.sin(this.angle) * 20)
          ctx!.lineTo(x, y)
          ctx!.stroke()
        }
      }
    }

    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const centerX = canvas!.width / 2
      const centerY = canvas!.height / 2

      // Draw Mentor Node
      ctx!.fillStyle = 'black'
      ctx!.beginPath()
      ctx!.arc(centerX, centerY, 15, 0, Math.PI * 2)
      ctx!.fill()
      
      // Halo
      ctx!.strokeStyle = 'rgba(0,0,0,0.05)'
      ctx!.lineWidth = 2
      ctx!.beginPath()
      ctx!.arc(centerX, centerY, 25, 0, Math.PI * 2)
      ctx!.stroke()

      if (Math.random() < 0.1) {
        pulses.push(new Pulse(Math.random() * Math.PI * 2))
      }

      pulses = pulses.filter(p => {
        const active = p.update()
        if (active) p.draw(centerX, centerY)
        return active
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" />
}

export function UserGuidePage() {
  return (
    <div className="min-h-screen grid-bg font-serif py-32 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-normal tracking-tight uppercase mb-8">User Guide</h1>
          <p className="text-2xl text-zinc-500 italic max-w-2xl mx-auto leading-relaxed">
            "Mastering the Zosterix ecosystem for advanced research collaboration."
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-32">
          {/* Section 1: Getting Started */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-2xl">
                <Zap size={32} strokeWidth={1} />
              </div>
              <h2 className="text-4xl font-normal uppercase tracking-tight">01. Initialization</h2>
              <p className="text-xl text-zinc-600 leading-relaxed italic">
                After creating your account, complete your researcher profile. A verified profile increases your visibility in the expert network and allows supervisors to understand your niche.
              </p>
              <ul className="space-y-4 text-lg text-zinc-800">
                <li className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                  Link your institutional email
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                  Define your primary research domains
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                  Upload your previous publications
                </li>
              </ul>
            </div>
            <div className="aspect-[4/3] rounded-[3rem] bg-white/40 backdrop-blur-xl border border-black/5 p-8 shadow-2xl overflow-hidden group">
              <div className="h-full w-full rounded-[2rem] bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-700 p-12">
                <img src="/zosterix-icon.svg" alt="Zosterix" className="w-full h-full object-contain invert opacity-10" />
              </div>
            </div>
          </section>

          {/* Section 2: Collaboration */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 aspect-[4/3] rounded-[3rem] bg-white/40 backdrop-blur-xl border border-black/5 p-4 shadow-2xl flex items-center justify-center overflow-hidden">
              <NeuronNetwork />
            </div>
            <div className="order-1 md:order-2 space-y-8 text-right">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-2xl ml-auto">
                <Globe size={32} strokeWidth={1} />
              </div>
              <h2 className="text-4xl font-normal uppercase tracking-tight">02. Network Expansion</h2>
              <p className="text-xl text-zinc-600 leading-relaxed italic">
                Use the Threads and Research Feed to discover active projects. Engagement is the key to breakthroughs—contribute to discussions or start your own laboratory feed.
              </p>
              <ul className="space-y-4 text-lg text-zinc-800 flex flex-col items-end">
                <li className="flex items-center gap-3">
                  Join specialized research threads
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                </li>
                <li className="flex items-center gap-3">
                  Follow experts in your field
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                </li>
                <li className="flex items-center gap-3">
                  Initiate collaborative blog posts
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Mentorship */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-2xl">
                <Shield size={32} strokeWidth={1} />
              </div>
              <h2 className="text-4xl font-normal uppercase tracking-tight">03. Mentorship</h2>
              <p className="text-xl text-zinc-600 leading-relaxed italic">
                Navigate the Supervisor Directory to find mentors who align with your goals. Our verification system ensures you're connecting with recognized authorities.
              </p>
              <ul className="space-y-4 text-lg text-zinc-800">
                <li className="flex items-center gap-3">
                  Filter by expertise and availability
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                </li>
                <li className="flex items-center gap-3">
                  Request formal or informal guidance
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                </li>
              </ul>
            </div>
            <div className="aspect-[4/3] rounded-[3rem] bg-white/40 backdrop-blur-xl border border-black/5 p-4 shadow-2xl overflow-hidden">
              <MentorshipFlow />
            </div>
          </section>
        </div>

        {/* Final CTA */}
        <div className="mt-32 p-20 rounded-[4rem] bg-black text-white text-center shadow-3xl">
          <h2 className="text-5xl font-normal mb-8 uppercase tracking-tighter">Ready to Begin?</h2>
          <p className="text-2xl text-zinc-400 italic mb-12">"The only limit to research is the boundary of our collaboration."</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="rounded-2xl px-12 py-6 text-xl font-serif bg-white text-black hover:bg-zinc-200 transition-all">Go to Dashboard</button>
            <button className="rounded-2xl px-12 py-6 text-xl font-serif bg-zinc-800 text-white hover:bg-zinc-700 transition-all">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  )
}
