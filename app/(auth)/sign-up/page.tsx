'use client'

import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/actions/auth-actions'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

const SignUpPage = () => {
  return (
    <AuthForm
      type='SIGN_UP'
      schema={signUpSchema}
      defaultValues={{
        fullName: '',
        email: '',
        password: '',
      }}
      onSubmit={signUp}
    />
  )
}

export default SignUpPage
