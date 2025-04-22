'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { ZodType } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/app/constants '
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props<T extends FieldValues> {
  schema: ZodType<T>
  defaultValues: T
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
  type: 'SIGN_UP' | 'SIGN_IN'
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const router = useRouter()
  const isSignIn = type === 'SIGN_IN'

  //  Define form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  // Define  submit handler
  const handleSubmit: SubmitHandler<T> = async (data) => {
    setIsProcessing(true)
    try {
      const result = await onSubmit(data)

      if (result.success) {
        toast.success('Success', {
          description: isSignIn
            ? 'You have successfully signed in'
            : 'You have successfully signed up',
        })
        router.push('/')
      } else {
        setIsProcessing(false)
        toast.error(`Error ${isSignIn ? 'signing in' : 'signing up'}`, {
          description: result.error ?? 'An error occured',
        })
      }
    } catch (error) {
      console.log('🚀 - consthandleSubmit:SubmitHandler<T>= - error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold '>
        {isSignIn
          ? 'Welcome back to Book Library'
          : 'Create your library account'}
      </h1>
      <p className='text-slate-600'>
        {isSignIn
          ? 'Access the vast collection of resources, and stay updated'
          : 'Please complete all fields to gain access to the library'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-6 w-full'
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      {...field}
                      className='w-full min-h-14 border-none text-base font-bold placeholder:font-normal text-white placeholder:text-light-100 focus-visible:ring-0 focus-visible:shadow-none bg-gray-900/90'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type='submit'
            disabled={isProcessing}
            className='bg-primary text-dark-100  inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-bold text-base cursor-pointer  hover:shadow-xl hover:bg-soft-pink transition-all duration-500 '
          >
            {isProcessing && (
              <span className='animate-spin mr-2 border-t-2 border-b-2 border-dark-100 rounded-full w-4 h-4' />
            )}
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Form>
      <p className='text-center text-base font-medium'>
        {isProcessing ? (
          <span className='text-white/70 font-semibold animate-pulse'>
            {isSignIn ? 'Signing in...' : 'Signing up...'}
          </span>
        ) : (
          <>
            {isSignIn ? 'Don’t have an account? ' : 'Already have an account? '}
            <Link
              href={isSignIn ? '/sign-up' : '/sign-in'}
              className='font-bold text-soft-pink hover:underline'
            >
              {isSignIn ? 'Register here' : 'Login'}
            </Link>
          </>
        )}
      </p>
    </div>
  )
}

export default AuthForm
