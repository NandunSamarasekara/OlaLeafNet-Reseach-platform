import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Loader2, Eye, EyeOff, Mail, ArrowLeft } from 'lucide-react'
import { z } from 'zod'

import { registerSchema } from '@/schemas/auth'
import { api } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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

type RegisterValues = z.infer<typeof registerSchema>

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'researcher',
      agreedToTerms: false as any,
    },
  })

  const onSubmit = async (values: RegisterValues) => {
    setIsLoading(true)
    setError(null)
    try {
      await api.post('/api/v1/auth/register', {
        full_name: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
      })
      setRegisteredEmail(values.email)
      setIsSuccess(true)
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || 'Something went wrong. Please try again.'
      setError(msg)
      
      if (err.response?.data?.error?.code === 'email_taken') {
        form.setError('email', { message: 'An account with this email already exists.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      await api.post('/api/v1/auth/resend-verification', { email: registeredEmail })
    } catch (err) {
      // Handle error
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center px-6">
        <div className="w-full max-w-[440px] text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-black text-white shadow-2xl">
            <Mail className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-4">Confirm your email</h1>
          <p className="text-zinc-500 font-medium leading-relaxed mb-10">
            We've sent a magic link to <span className="font-black text-black">{registeredEmail}</span>. Click it to activate your researcher profile.
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="outline" onClick={handleResend} className="rounded-2xl py-8 font-bold border-zinc-100">
              Resend verification email
            </Button>
            <Link to="/login">
              <Button variant="ghost" className="w-full font-bold text-zinc-400 hover:text-black">Return to Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center grid-bg font-serif py-12 md:py-24">
      <div className="w-full max-w-[560px] bg-white/40 backdrop-blur-xl border border-black/5 rounded-[3.5rem] p-10 md:p-14 shadow-2xl shadow-black/5">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-normal tracking-tight uppercase">Create account</h1>
          <p className="mt-4 text-zinc-500 text-xl italic leading-relaxed px-4">
            "Join the next generation of researchers."
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
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black pl-4">Full Academic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Amal Perera" className="rounded-2xl border-black/5 bg-white px-6 py-8 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5" {...field} />
                  </FormControl>
                  <FormMessage className="pl-4" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black pl-4">Institution Email</FormLabel>
                  <FormControl>
                    <Input placeholder="amal@university.edu" type="email" className="rounded-2xl border-black/5 bg-white px-6 py-8 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5" {...field} />
                  </FormControl>
                  <FormMessage className="pl-4" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black pl-4">Create Vault Key</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className="rounded-2xl border-black/5 bg-white px-6 py-8 pr-14 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-black transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="pl-4" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black pl-4">Confirm Key</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="rounded-2xl border-black/5 bg-white px-6 py-8 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="pl-4" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black pl-4">Researcher Profile Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      {[
                        { id: 'researcher', label: 'Researcher' },
                        { id: 'student', label: 'Student' },
                        { id: 'supervisor', label: 'Supervisor' },
                      ].map((r) => (
                        <FormItem key={r.id}>
                          <FormControl>
                            <RadioGroupItem value={r.id} className="peer sr-only" />
                          </FormControl>
                          <FormLabel className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-black/5 bg-white p-6 text-center transition-all peer-data-[state=checked]:bg-[#444] peer-data-[state=checked]:text-white cursor-pointer hover:border-black/20 hover:shadow-xl">
                            <span className="text-[10px] font-black uppercase tracking-widest">{r.label}</span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="pl-4" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreedToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-2">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="rounded-lg border-black/10 h-6 w-6 data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-zinc-400 italic">
                      I agree to the <Link to="/terms" className="font-bold text-zinc-900 hover:underline decoration-1 underline-offset-4">Terms</Link> and <Link to="/privacy" className="font-bold text-zinc-900 hover:underline decoration-1 underline-offset-4">Privacy Policy</Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full rounded-2xl py-8 text-xl font-serif bg-[#444] hover:bg-black text-white shadow-xl hover:shadow-2xl transition-all">
              {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Create Account'}
            </Button>
          </form>
        </Form>

        <div className="my-12 flex items-center gap-6">
          <div className="flex-1 h-px bg-black/5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">OR</span>
          <div className="flex-1 h-px bg-black/5" />
        </div>

        <Button
          variant="outline"
          className="w-full rounded-2xl py-8 text-lg font-serif border-black/5 bg-white text-black hover:bg-black hover:text-white transition-all shadow-sm hover:shadow-xl"
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/v1/auth/google`}
        >
          <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google Academic
        </Button>

        <p className="mt-12 text-center text-lg font-serif">
          <span className="text-zinc-400 italic">Already have an account?</span>{' '}
          <Link to="/login" className="font-bold text-black hover:underline decoration-1 underline-offset-8">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
