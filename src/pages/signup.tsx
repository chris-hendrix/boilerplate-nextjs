import { useForm } from 'react-hook-form'
import { Button, Stack, TextField } from '@mui/material'
import { Google } from '@mui/icons-material'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'

import Layout from '@/components/Layout'

const SignupPage: React.FC = () => {
  const { register, getValues, formState: { errors }, handleSubmit } = useForm({ mode: 'onChange' })
  const onSubmit = (data: { [x: string]: unknown }) => {
    console.log({ data, errors })
  }

  return (
    <>
      <Layout display="flex" justifyContent="center" width="100%">
        <Stack
          width="400px"
          spacing={2}
          alignItems="center"
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
            onClick={handleSubmit(onSubmit)}
            variant="contained">
            Sign up
          </Button>
          <Button startIcon={<Google />}>Sign in with Google</Button>
        </Stack>
      </Layout>
    </>
  )
}

export default SignupPage
