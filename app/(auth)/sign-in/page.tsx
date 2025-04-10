'use client'

import AuthForm from '@/components/AuthForm'
import { SignInWithCredentials } from '@/lib/actions/auth-actions'
import { signInSchema } from '@/lib/validations'
import React from 'react'

const SignInPage = () => {
  return (
    <AuthForm
      type='SIGN_IN'
      schema={signInSchema}
      defaultValues={{
        email: '',
        password: '',
      }}
      onSubmit={SignInWithCredentials}
    />
  )
}

export default SignInPage
