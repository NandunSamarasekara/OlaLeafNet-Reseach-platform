import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Upload, Beaker, GraduationCap, Building2 } from 'lucide-react'
import { useAuth } from '@/store/auth'
import { api } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function ProfileSetupPage() {
  const { state, dispatch } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    bio: '',
    institution: '',
    researchInterests: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await api.put('/api/v1/users/profile', {
        bio: formData.bio,
        institution: formData.institution,
        research_interests: formData.researchInterests.split(',').map(i => i.trim()),
      })

      if (state.user) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            accessToken: state.accessToken!,
            user: { ...state.user, profile_complete: true },
          },
        })
      }
      navigate('/feed')
    } catch (err) {
      navigate('/feed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center grid-bg px-6 py-20 font-serif">
      <div className="w-full max-w-[650px] bg-white/40 backdrop-blur-2xl border border-black/5 rounded-[4rem] p-12 shadow-2xl shadow-black/5">
        <div className="mb-14 text-center">
          <div className="mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-[3rem] bg-white border border-black/5 cursor-pointer hover:bg-black/5 transition-all shadow-xl shadow-black/5 group">
            <Upload className="h-10 w-10 text-zinc-300 group-hover:text-black transition-colors" strokeWidth={1} />
          </div>
          <h1 className="text-5xl font-normal tracking-tight text-black mb-4">Complete your profile</h1>
          <p className="text-zinc-500 text-xl italic font-normal">Tell the community about your research background.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-4">
            <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Your Bio</Label>
            <textarea
              placeholder="Briefly describe your research background..."
              className="flex min-h-[160px] w-full rounded-[2rem] border border-black/5 bg-white px-6 py-5 text-lg ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/5 focus-visible:bg-white transition-all disabled:cursor-not-allowed disabled:opacity-50 font-serif placeholder:italic placeholder:text-zinc-300"
              value={formData.bio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Institution</Label>
            <div className="relative">
              <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-300" strokeWidth={1.5} />
              <Input
                placeholder="University of Colombo"
                className="rounded-3xl border-black/5 bg-white px-6 py-9 pl-14 text-lg font-serif focus:ring-2 focus:ring-black/5 transition-all placeholder:text-zinc-300"
                value={formData.institution}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 pl-4">Research Interests</Label>
            <div className="relative">
              <Beaker className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-300" strokeWidth={1.5} />
              <Input
                placeholder="Bioinformatics, Genomics, AI"
                className="rounded-3xl border-black/5 bg-white px-6 py-9 pl-14 text-lg font-serif focus:ring-2 focus:ring-black/5 transition-all placeholder:text-zinc-300"
                value={formData.researchInterests}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, researchInterests: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-10 flex items-center gap-6">
            <Button type="button" variant="ghost" onClick={() => navigate('/feed')} className="flex-1 rounded-[1.5rem] py-8 text-lg font-normal text-zinc-400 hover:text-black hover:bg-black/5 transition-all">
              Skip for now
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-[2] rounded-[1.5rem] py-8 text-xl font-normal bg-[#444] hover:bg-black text-white shadow-xl hover:shadow-2xl transition-all">
              {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Finish Setup'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
