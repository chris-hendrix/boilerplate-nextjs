import { UseFormRegister, FieldErrorsImpl, FieldValues, UseFormGetValues } from 'react-hook-form'
import { TextField } from '@mui/material'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'

type Props = {
  name?: string | undefined,
  register?: UseFormRegister<FieldValues> | undefined,
  errors?: Partial<FieldErrorsImpl<{ [x: string]: any }>> | undefined,
  getValues?: UseFormGetValues<FieldValues> | undefined
  [x: string]: unknown
}

const TextInput: React.FC<Props> = ({
  name = undefined,
  register = undefined,
  getValues = undefined,
  errors = undefined,
  ...rest
}) => {
  const getProps = () => {
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
