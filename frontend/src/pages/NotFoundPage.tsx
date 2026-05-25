import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center grid-bg font-serif">
      <div className="text-[15rem] font-normal tracking-tighter leading-none text-black select-none opacity-5">
        404
      </div>
      <div className="-mt-24 space-y-6 relative z-10">
        <h1 className="text-5xl md:text-7xl font-normal tracking-tight leading-none uppercase">
          Edge of the map.
        </h1>
        <p className="text-zinc-500 text-xl italic max-w-lg mx-auto leading-relaxed">
          "The page you are looking for has been moved, deleted, or never existed in this research dimension."
        </p>
        <div className="pt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/">
            <Button className="rounded-2xl px-12 py-8 font-serif text-lg bg-[#444] hover:bg-black text-white flex items-center gap-3 transition-all shadow-xl hover:shadow-2xl">
              <Home size={20} strokeWidth={1.5} />
              Return Home
            </Button>
          </Link>
          <Button variant="ghost" onClick={() => window.history.back()} className="rounded-2xl px-10 py-8 font-serif text-lg text-zinc-400 hover:text-black hover:bg-black/5 transition-all flex items-center gap-3">
            <ArrowLeft size={20} strokeWidth={1.5} />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
