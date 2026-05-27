import React from 'react'
import { Search, MapPin, GraduationCap, Star, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SupervisorDirectoryPage() {
  const supervisors = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      title: "Associate Professor of AI",
      university: "Stanford University",
      expertise: ["Machine Learning", "NLP", "AI Ethics"],
      rating: 4.9,
      reviews: 128,
      isVerified: true
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Head of Robotics Lab",
      university: "MIT",
      expertise: ["Computer Vision", "Control Systems", "RL"],
      rating: 4.8,
      reviews: 95,
      isVerified: true
    }
  ]

  return (
    <div className="flex flex-col gap-12 py-6 font-serif">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-normal tracking-tight text-black">Find a Supervisor</h1>
        <p className="text-xl text-zinc-500 italic">Connect with verified academic mentors and experts in your field.</p>
      </div>

      <div className="flex items-center gap-6 rounded-[2.5rem] border border-black/5 bg-white/40 backdrop-blur-md p-3 pl-8 shadow-sm">
        <Search className="text-zinc-300" size={24} strokeWidth={1} />
        <input 
          type="text" 
          placeholder="Search by expertise, university, or name..." 
          className="flex-1 bg-transparent py-5 text-xl outline-none placeholder:text-zinc-300 font-serif"
        />
        <Button className="rounded-3xl bg-[#444] px-10 py-8 font-serif text-lg text-white hover:bg-black transition-all shadow-xl">
          Search Directory
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {supervisors.map(sv => (
          <div key={sv.id} className="group relative flex flex-col gap-8 rounded-[3rem] border border-black/5 bg-white/40 backdrop-blur-md p-10 transition-all hover:border-black/20 hover:shadow-2xl hover:shadow-black/5">
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                <div className="h-20 w-20 rounded-[1.5rem] bg-white border border-black/5 flex items-center justify-center shadow-inner">
                   <GraduationCap className="text-zinc-200" size={32} strokeWidth={1} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-normal text-black">{sv.name}</h3>
                    {sv.isVerified && (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white font-black">✓</span>
                    )}
                  </div>
                  <p className="text-lg font-serif italic text-zinc-400 mt-1">{sv.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-lg font-bold text-black bg-black/5 px-4 py-2 rounded-2xl">
                <Star size={18} fill="black" />
                {sv.rating}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-lg text-zinc-500">
                <MapPin size={18} className="text-zinc-300" strokeWidth={1.5} />
                {sv.university}
              </div>
              <div className="flex flex-wrap gap-3">
                {sv.expertise.map(exp => (
                  <span key={exp} className="rounded-xl bg-black/5 px-4 py-2 text-sm font-bold text-zinc-600 tracking-wider">
                    {exp.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <Button variant="ghost" className="group/btn mt-4 flex w-full items-center justify-between rounded-2xl border border-black/5 bg-white px-8 py-8 font-serif text-xl text-black transition-all hover:border-black hover:bg-black hover:text-white">
              View Profile
              <ChevronRight size={24} className="text-zinc-200 transition-all group-hover/btn:translate-x-2 group-hover/btn:text-white" strokeWidth={1.5} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
