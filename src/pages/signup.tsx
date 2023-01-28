import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { Button, Stack, TextField } from '@mui/material'
import { Google } from '@mui/icons-material'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'

import { useAddUserMutation } from '@/store/user'

import Layout from '@/components/Layout'

const SignupPage: React.FC = () => {
  const [addUser, { isLoading }] = useAddUserMutation()
  const { register, getValues, formState: { errors }, handleSubmit } = useForm({ mode: 'onChange' })

  const onSubmit = async (data: { [x: string]: unknown }) => {
    await addUser(data)
    Router.push('/api/auth/signin')
  }

  return (
    <>
      <Layout display="flex" justifyContent="center" width="100%">
        <Stack
          width="400px"
          spacing={2}
          alignItems="center"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Email"
            fullWidth
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message as string || undefined}
            {...register('email', {
              required: 'Email is required',
              validate: (value: string) => isEmail(value) || 'Invalid email'
            })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            error={Boolean(errors?.password)}
            helperText={errors?.password?.message as string || undefined}
            {...register('password', {
              required: 'Password is required',
              validate: (value: string) => isStrongPassword(value) || 'Weak password'
            },)}
          />
          <TextField
            label="Password confirmation"
            type="password"
            fullWidth
            error={Boolean(errors?.cpassword)}
            helperText={errors?.cpassword?.message as string || undefined}
            {...register('cpassword', {
              validate: (value: string) => getValues()?.password === value || 'Password does not match'
            })}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            Sign up
          </Button>
          <Button disabled={isLoading} startIcon={<Google />}>Sign in with Google</Button>
        </Stack>
      </Layout>
    </>
  )
}

export default SignupPage
