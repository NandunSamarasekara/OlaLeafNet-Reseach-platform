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
    <div className="relative flex min-h-screen items-center justify-center bg-white px-6">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute left-6 top-6 md:left-12 md:top-12 flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-black transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-[440px]">
        <div className="mb-6 text-center flex flex-col items-center">
          <Link to="/">
            <img src="/zosterix.svg" alt="Zosterix" className="h-36 w-auto" />
          </Link>
          <h1 className="mt-4 text-3xl font-black tracking-tighter">Welcome back</h1>
          <p className="mt-2 text-zinc-500 font-medium">Continue your research journey.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8 rounded-2xl border-red-50 bg-red-50/10">
            <AlertDescription className="font-bold">{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="amal@example.com" 
                      type="email" 
                      className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-7 focus:bg-white transition-all" 
                      {...field} 
                      autoFocus 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">Password</FormLabel>
                    <Link to="/forgot-password" title="Forgot password?" className="text-xs font-bold text-zinc-400 hover:text-black">
                      Forgot?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-7 pr-12 focus:bg-white transition-all"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full rounded-2xl py-8 text-lg font-black tracking-tight">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign In'}
            </Button>
          </form>
        </Form>

        <div className="my-10 flex items-center gap-4">
          <Separator className="flex-1 bg-zinc-100" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Or continue with</span>
          <Separator className="flex-1 bg-zinc-100" />
        </div>

        <Button
          variant="outline"
          className="w-full rounded-2xl py-8 text-lg font-bold border-zinc-100 hover:bg-zinc-50 transition-all"
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
          Google
        </Button>

        <p className="mt-10 text-center text-sm font-medium text-zinc-500">
          New to Zosterix?{' '}
          <Link to="/register" className="font-black text-black hover:underline decoration-2 underline-offset-4">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
