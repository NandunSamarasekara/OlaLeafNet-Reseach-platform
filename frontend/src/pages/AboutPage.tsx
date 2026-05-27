import React from 'react'
import { Award, Target, Eye, Quote } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="min-h-screen grid-bg font-serif py-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-20 mb-40">
          <div className="flex-1 space-y-8">
            <h1 className="text-7xl md:text-9xl font-normal tracking-tight uppercase leading-[0.9]">
              Beyond<br />
              The Lab
            </h1>
            <p className="text-2xl text-zinc-600 italic leading-relaxed">
              Zosterix was founded on a simple principle: high-impact research should not be constrained by geography or hierarchy.
            </p>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-[4/5] rounded-[4rem] bg-black shadow-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('/zosterix-icon.svg')] bg-no-repeat bg-center opacity-20 scale-150 group-hover:scale-125 transition-transform duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <Quote size={80} className="text-white/30 absolute top-12 left-12" />
                <p className="text-3xl text-white font-normal leading-relaxed italic z-10">
                  "Our mission is to create a frictionless ecosystem where every breakthrough is just one connection away."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision/Mission/Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
          {[
            {
              icon: <Target size={40} strokeWidth={1} />,
              title: "Our Mission",
              desc: "To democratize access to academic resources and mentorship for researchers worldwide."
            },
            {
              icon: <Eye size={40} strokeWidth={1} />,
              title: "Our Vision",
              desc: "A world where scientific progress is accelerated through radical transparency and collaboration."
            },
            {
              icon: <Award size={40} strokeWidth={1} />,
              title: "Our Values",
              desc: "Academic integrity, minimalist design, and the prioritizing of raw data over social noise."
            }
          ].map((item, i) => (
            <div key={i} className="p-12 rounded-[3.5rem] bg-white/40 backdrop-blur-xl border border-black/5 shadow-2xl flex flex-col gap-8 group hover:bg-black transition-all duration-500">
              <div className="h-20 w-20 rounded-2xl bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors shadow-xl">
                {item.icon}
              </div>
              <h3 className="text-3xl font-normal uppercase tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-xl text-zinc-500 italic leading-relaxed group-hover:text-zinc-400 transition-colors">
                "{item.desc}"
              </p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-[#333] text-white p-20 rounded-[5rem] mb-40 shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-5xl font-normal uppercase tracking-tight mb-12">The Zosterix Story</h2>
            <div className="space-y-8 text-2xl font-normal text-zinc-400 leading-relaxed italic">
              <p>
                In 2024, a group of researchers from across the globe realized that they were spending more time navigating outdated administrative systems than actually conducting research.
              </p>
              <p>
                Zosterix was born out of that frustration. We stripped away the bloat, the ads, and the vanity metrics of traditional academic networks. What's left is a tool for the modern scholar.
              </p>
            </div>
          </div>
        </div>

        {/* Numbers Section */}
        <div className="text-center space-y-12">
          <h2 className="text-[110px] md:text-[180px] font-normal tracking-tighter uppercase opacity-5 leading-none select-none">Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 relative -mt-32">
            <div>
              <div className="text-7xl font-normal mb-2 text-black">120+</div>
              <div className="text-2xl text-zinc-500 uppercase tracking-widest font-bold">Countries</div>
            </div>
            <div>
              <div className="text-7xl font-normal mb-2 text-black">8.5k</div>
              <div className="text-2xl text-zinc-500 uppercase tracking-widest font-bold">Paper Feeds</div>
            </div>
            <div>
              <div className="text-7xl font-normal mb-2 text-black">45</div>
              <div className="text-2xl text-zinc-500 uppercase tracking-widest font-bold">Collaborations/Day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
