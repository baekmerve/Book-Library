'use server'
import { db } from '@/database/drizzle'
import { AuthCredentials } from './../types'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'

import { signIn } from '@/auth'
import { hash } from 'bcryptjs'
import { headers } from 'next/headers'
import ratelimit from '../ratelimit'
import { redirect } from 'next/navigation'
import { workflowClient } from '../workflow-client'
import config from '../config'

export const SignInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) return redirect('/too-fast')

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (result?.error) {
      return { success: false, error: result.error }
    }
    return { success: true }
  } catch (error) {
    console.log('🚀 - SignIn - error:', error)
    return { success: false, error: 'Signin error' }
  }
}
export const signUp = async (params: AuthCredentials) => {
  const { fullName, password, email } = params

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) return redirect('/too-fast')

  //check if the user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  //if the user already exists
  if (existingUser.length > 0) {
    return { success: false, error: 'User already exists' }
  }
  //hash the password
  const hashedPassword = await hash(password, 10)

  //if the user does not exist then add to db
  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
    })

    //send the welcome email
    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    })

    await SignInWithCredentials({ email, password })

    return {
      success: true,
    }
  } catch (error) {
    console.log('🚀 - signUp - error:', error)
    return { success: false, error: 'Signup error' }
  }
}
