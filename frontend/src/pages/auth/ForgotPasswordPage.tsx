import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Loader2, ArrowLeft, Mail } from 'lucide-react'
import { z } from 'zod'

import { forgotPasswordSchema } from '@/schemas/auth'
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

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsLoading(true)
    setError(null)
    try {
      await api.post('/api/v1/auth/forgot-password', values)
      setEmail(values.email)
      setIsSuccess(true)
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center font-serif px-6 grid-bg">
        <div className="w-full max-w-[480px] text-center bg-white/40 backdrop-blur-xl border border-black/5 p-12 rounded-[3.5rem] shadow-2xl">
          <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-black text-white shadow-2xl">
            <Mail className="h-10 w-10" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-normal tracking-tight uppercase mb-6">Check your email</h1>
          <p className="text-zinc-500 text-xl italic leading-relaxed mb-12">
            "If <span className="font-bold text-black">{email}</span> is registered, you will receive a reset link shortly."
          </p>
          <Link to="/login">
            <Button variant="outline" className="w-full rounded-2xl py-8 text-xl font-serif border-black/5 bg-white text-black hover:bg-black hover:text-white shadow-xl transition-all">
              Return to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center grid-bg font-serif py-20 px-6">
      <div className="w-full max-w-[480px] bg-white/40 backdrop-blur-xl border border-black/5 p-12 rounded-[3.5rem] shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-normal tracking-tight uppercase">Reset Vault</h1>
          <p className="mt-4 text-zinc-500 text-xl italic leading-relaxed">
            "We'll send you a recovery link to restore access."
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8 rounded-2xl border-red-100 bg-red-50/50">
            <AlertDescription className="font-bold text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-[0.3em] text-black pl-4">Institutional Email</FormLabel>
                  <FormControl>
                    <Input placeholder="researcher@university.edu" type="email" className="rounded-2xl border-black/5 bg-white px-6 py-8 text-lg font-serif transition-all focus:ring-2 focus:ring-black/5" {...field} autoFocus />
                  </FormControl>
                  <FormMessage className="pl-4" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading} className="w-full rounded-2xl py-8 text-xl font-serif bg-[#444] hover:bg-black text-white shadow-xl hover:shadow-2xl transition-all">
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Send Recovery Link'}
              </Button>
              <Link to="/login" className="text-center py-4 text-zinc-400 hover:text-black transition-colors font-serif italic text-lg">
                Remember your key? Sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
