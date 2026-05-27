import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Timer, Bell } from 'lucide-react'

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center font-serif">
      <div className="w-24 h-24 rounded-[2rem] bg-white border border-black/5 flex items-center justify-center mb-10 shadow-xl shadow-black/5">
        <Timer className="w-10 h-10 text-black" strokeWidth={1} />
      </div>
      <h1 className="text-5xl md:text-7xl font-normal tracking-tight mb-6 leading-none uppercase">
        {title}
      </h1>
      <p className="text-zinc-500 max-w-lg mx-auto text-xl mb-14 leading-relaxed italic">
        "We are meticulously crafting this module to ensure it meets our rigorous standards for academic collaboration."
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
        <Button className="rounded-2xl px-10 py-8 font-serif text-lg bg-[#444] hover:bg-black text-white flex-1 flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl">
          <Bell size={20} />
          Notify Me
        </Button>
        <Link to="/" className="flex-1">
          <Button variant="outline" className="w-full rounded-2xl px-10 py-8 font-serif text-lg border-black/10 hover:bg-black/5 transition-all">
            Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
