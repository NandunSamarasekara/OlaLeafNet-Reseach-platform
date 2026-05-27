import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { z } from 'zod'

import { loginSchema } from '@/schemas/auth'
import { api } from '@/api/client'
import { useAuth } from '@/store/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type LoginValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const { dispatch } = useAuth()
  const navigate = useNavigate()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.post('/api/v1/auth/login', values)
      const { access_token, user } = response.data.data
      
      dispatch({ type: 'SET_AUTH', payload: { accessToken: access_token, user } })
      
      if (!user.profile_complete) {
        navigate('/profile/setup')
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || 'Invalid email or password'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center grid-bg font-serif py-20">
      <div className="w-full max-w-[480px] bg-white/40 backdrop-blur-xl border border-black/5 rounded-[3rem] p-12 shadow-2xl shadow-black/5">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-normal tracking-tight uppercase">Welcome back</h1>
          <p className="mt-4 text-zinc-500 text-xl italic leading-relaxed px-4">
            "Continue your research journey."
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8 rounded-2xl border-red-100 bg-red-50/50">
            <AlertDescription className="font-bold text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black pl-4">Academic Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="researcher@university.edu" 
                      type="email" 
                      className="rounded-2xl border-black/5 bg-white px-6 py-8 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5" 
                      {...field} 
                      autoFocus 
                    />
                  </FormControl>
                  <FormMessage className="pl-4" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between px-4">
                    <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Security Vault Key</FormLabel>
                    <Link to="/forgot-password" title="Forgot password?" className="text-[11px] font-bold text-zinc-300 hover:text-black transition-colors">
                      FORGOT?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="rounded-2xl border-black/5 bg-white px-6 py-8 pr-16 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-black transition-colors"
                      >
                        {showPassword ? <EyeOff size={22} strokeWidth={1.5} /> : <Eye size={22} strokeWidth={1.5} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="pl-4" />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full rounded-2xl py-8 text-xl font-serif bg-[#444] hover:bg-black text-white shadow-xl hover:shadow-2xl transition-all">
              {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Enter Platform'}
            </Button>
          </form>
        </Form>

        <div className="my-12 flex items-center gap-6">
          <div className="flex-1 h-px bg-black/5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black whitespace-nowrap">OR IDENTIFY VIA</span>
          <div className="flex-1 h-px bg-black/5" />
        </div>

        <Button
          variant="outline"
          className="w-full rounded-2xl py-8 text-lg font-serif border-black/5 bg-white text-black hover:bg-black hover:text-white transition-all shadow-sm hover:shadow-xl"
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/v1/auth/google`}
        >
          <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google Academic
        </Button>

        <p className="mt-12 text-center text-lg font-serif">
          <span className="text-zinc-400 italic">New to Zosterix?</span>{' '}
          <Link to="/register" className="font-bold text-black hover:underline decoration-1 underline-offset-8">Create Account</Link>
        </p>
      </div>
    </div>
  )
}
