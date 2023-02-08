import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { Button, Stack } from '@mui/material'
import { Google } from '@mui/icons-material'
import getBaseQueryErrorMessage from '@/lib/error'

import SnackbarAlert from '@/components/SnackbarAlert'
import TextInput from '@/components/TextInput'
import { useAddUserMutation } from '@/store/user'

import Layout from '@/layouts/Layout'

const SignupPage: React.FC = () => {
  const [addUser, { isLoading, isError, isSuccess, error }] = useAddUserMutation()
  const { register, getValues, formState: { errors }, handleSubmit } = useForm({ mode: 'onChange' })
  const [signupWithGoogle, setSignupWithGoogle] = useState(true)

  const textInputProps = { errors, register, getValues }

  const onSubmit = async (data: { [x: string]: unknown }) => { await addUser(data) }
  isSuccess && Router.push('/api/auth/signin')

  return (
    <>
      {isError && <SnackbarAlert content={getBaseQueryErrorMessage(error)} />}
      <Layout display="flex" justifyContent="center" width="100%">
        <Stack
          width="400px"
          spacing={2}
          alignItems="center"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!signupWithGoogle && (
            <>
              <TextInput name="name" {...textInputProps} />
              <TextInput name="email" {...textInputProps} />
              <TextInput name="password" {...textInputProps} />
              <TextInput name="cpassword" {...textInputProps} />
              <Button
                className="signUpButton"
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                Sign up
              </Button>
            </>
          )}

          <Button
            className="signUpWithGoogleButton"
            disabled={isLoading}
            startIcon={<Google />}
            onClick={async () => signIn('google', { callbackUrl: '/' })}
            variant={signupWithGoogle ? 'contained' : 'text'}
          >
            Sign up with Google
          </Button>
          {signupWithGoogle
            && <Button
              className="signUpWithEmailButton"
              onClick={() => setSignupWithGoogle(false)}
            >
              Or sign in with email
            </Button>}
        </Stack>
      </Layout>
    </>
  )
}

export default SignupPage
