import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { api } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error')
        setMessage('No verification token provided.')
        return
      }

      try {
        await api.post('/api/v1/auth/verify-email', { token })
        setStatus('success')
      } catch (err: any) {
        setStatus('error')
        setMessage(err.response?.data?.error?.message || 'Verification failed.')
      }
    }

    verify()
  }, [token])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 grid-bg font-serif">
      <div className="w-full max-w-[500px] text-center bg-white/40 backdrop-blur-xl border border-black/5 p-12 rounded-[3.5rem] shadow-2xl">
        <div className="flex flex-col items-center space-y-8">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-6">
              <Loader2 className="h-16 w-16 animate-spin text-zinc-300" strokeWidth={1} />
              <h1 className="text-4xl font-normal tracking-tight uppercase">Decrypting link...</h1>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-black text-white shadow-2xl">
                <CheckCircle2 className="h-12 w-12" strokeWidth={1} />
              </div>
              <h1 className="text-4xl font-normal tracking-tight uppercase">Email verified</h1>
              <p className="text-zinc-500 text-xl italic leading-relaxed">
                "Your academic profile has been successfully activated. Welcome to the collective."
              </p>
              <Link to="/login" className="w-full">
                <Button className="w-full rounded-2xl py-8 text-xl font-serif bg-[#444] hover:bg-black text-white shadow-xl transition-all">Sign In</Button>
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-red-50 border border-red-100">
                <XCircle className="h-12 w-12 text-red-500" strokeWidth={1} />
              </div>
              <h1 className="text-4xl font-normal tracking-tight uppercase text-red-900">Link Invalid</h1>
              <p className="text-zinc-500 text-xl italic leading-relaxed">
                "{message}"
              </p>
              <div className="grid grid-cols-1 gap-4 w-full">
                <Link to="/register">
                  <Button className="w-full rounded-2xl py-8 text-xl font-serif bg-[#444] hover:bg-black text-white shadow-xl transition-all">Request New Profile</Button>
                </Link>
                <Link to="/login" className="text-zinc-400 hover:text-black font-serif italic text-lg py-4">
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
