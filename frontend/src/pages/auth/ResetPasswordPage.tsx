import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { z } from 'zod'

import { resetPasswordSchema } from '@/schemas/auth'
import { api } from '@/api/client'
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

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!token) {
      setError('Invalid reset link.')
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      await api.post('/api/v1/auth/reset-password', {
        token,
        password: values.password,
        confirm_password: values.confirmPassword,
      })
      setIsSuccess(true)
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center font-serif px-6 grid-bg">
        <div className="w-full max-w-[480px] text-center bg-white/40 backdrop-blur-xl border border-black/5 p-12 rounded-[3.5rem] shadow-2xl">
          <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-red-50 border border-red-100">
            <AlertCircle className="h-10 w-10 text-red-500" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-normal tracking-tight uppercase mb-6 text-red-900">Invalid link</h1>
          <p className="text-zinc-500 text-xl italic leading-relaxed mb-12">
            "This password reset link is invalid or has expired. Please request a new identifier."
          </p>
          <Link to="/forgot-password">
            <Button className="w-full rounded-2xl py-8 text-xl font-serif bg-[#444] hover:bg-black text-white shadow-xl transition-all">Request New Link</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center font-serif px-6 grid-bg">
        <div className="w-full max-w-[480px] text-center bg-white/40 backdrop-blur-xl border border-black/5 p-12 rounded-[3.5rem] shadow-2xl">
          <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-black text-white shadow-2xl">
            <CheckCircle2 className="h-10 w-10" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-normal tracking-tight uppercase mb-6">Vault Restored</h1>
          <p className="text-zinc-500 text-xl italic leading-relaxed mb-12">
            "Your password has been successfully reset. You can now sign in with your new credentials."
          </p>
          <Link to="/login">
            <Button className="w-full rounded-2xl py-8 text-xl font-serif bg-[#444] hover:bg-black text-white shadow-xl transition-all">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center grid-bg font-serif py-20 px-6">
      <div className="w-full max-w-[480px] bg-white/40 backdrop-blur-xl border border-black/5 p-12 rounded-[3.5rem] shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-normal tracking-tight uppercase">New Key</h1>
          <p className="mt-4 text-zinc-500 text-xl italic leading-relaxed">
            "Create a strong, unique password for your vault."
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
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black pl-4">New Secret Key</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="rounded-2xl border-black/5 bg-white px-6 py-8 pr-16 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5"
                        {...field}
                        autoFocus
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black pl-4">Confirm New Key</FormLabel>
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

            <Button type="submit" disabled={isLoading} className="w-full rounded-2xl py-8 text-xl font-serif bg-[#444] hover:bg-black text-white shadow-xl hover:shadow-2xl transition-all">
              {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Update Key'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

import { AlertCircle } from 'lucide-react'
