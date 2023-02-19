import { UseFormReturn } from 'react-hook-form'
import { TextField } from '@mui/material'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'

type Props = {
  name?: string | undefined,
  form?: UseFormReturn | undefined
  [x: string]: unknown
}

const TextInput: React.FC<Props> = ({
  name = undefined,
  form = undefined,
  ...rest
}) => {
  const getProps = () => {
    if (!form) return { fullWidth: true }
    const { register, getValues, formState: { errors } } = form
    const props = {
      fullWidth: true,
      error: name ? Boolean(errors?.[name]) : undefined,
      helperText: name ? errors?.[name]?.message as string : undefined
    }
    if (name === 'name') {
      return {
        ...props,
        label: 'Name*',
        ...!register ? {} : register(name, {
          required: 'Name is required',
          validate: (value: string) => value.length > 2 || 'Too short'
        })
      }
    }

    if (name === 'email') {
      return {
        ...props,
        label: 'Email*',
        ...!register ? {} : register(name, {
          required: 'Email is required',
          validate: (value: string) => isEmail(value) || 'Invalid email'
        })
      }
    }

    if (name === 'password') {
      return {
        ...props,
        label: 'Password*',
        type: 'password',
        ...!register ? {} : register(name, {
          required: 'Password is required',
          validate: (value: string) => isStrongPassword(value) || 'Weak password'
        })
      }
    }

    if (name === 'cpassword') {
      return {
        ...props,
        label: 'Password confirmation',
        type: 'password',
        ...!register || !getValues ? {} : register(name, {
          validate: (value: string) => getValues()?.password === value || 'Password does not match'
        })
      }
    }

    return props
  }

  return <TextField {...getProps()} {...rest} />
}

export default TextInput
