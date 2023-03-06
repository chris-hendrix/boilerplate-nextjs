import { useEffect, useState, ReactNode } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  Typography
} from '@mui/material'
import { Abc, Email } from '@mui/icons-material'
import {
  useUpdateUserMutation,
  useUploadFileMutation,
  useGetSessionQuery,
  useGetUserQuery,
} from '@/store'
import SnackbarAlert from '@/components/SnackbarAlert'
import UserAvatar from '@/components/UserAvatar'
import TextInput from './TextInput'

type Props = {
  userId: string,
  [x: string]: unknown
}

const UserProfile: React.FC<Props> = ({ userId, ...rest }) => {
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(userId, { skip: !userId })
  const [updateUser, {
    isLoading: isUpdating,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
  }] = useUpdateUserMutation()

  const { data: session } = useGetSessionQuery()
  const form = useForm({ mode: 'onChange' })
  const [file, setFile] = useState<File | undefined>()
  const [edit, setEdit] = useState(false)

  const onSubmit = async (data: { [x: string]: unknown }) => {
    if (edit && user) await updateUser({ id: user.id, ...data })
    setEdit(!edit)
  }

  const [uploadFile, {
    isLoading: isFileUploading,
    isError: isUploadError
  }] = useUploadFileMutation()

  const getAlertProps = () => {
    if (isUploadError) return { content: 'Error uploading' }
    if (isUpdateError) return { content: 'Error saving' }
    if (isUpdateSuccess) return { content: 'Save successful' }
    return { content: null }
  }

  const uploadBucketImage = async () => {
    if (!file || !user) return
    const formData = new FormData()
    formData.append('file', file)
    const res = await uploadFile(formData)
    if ('data' in res) await updateUser({ id: user.id, bucketImage: res.data })
  }

  useEffect(() => { uploadBucketImage() }, [file])
  useEffect(() => user && form.reset({ name: user.name, email: user.email }), [user])

  if (isUserLoading || !user) return null
  const canEdit = session?.user?.id === user.id
  const isLoading = isUpdating || isFileUploading

  const renderInfo = () => {
    const renderListItem = (icon: ReactNode, text: string) => (
      <ListItem>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    )

    if (canEdit) {
      return (
        <>
          <TextInput name="name" form={form} disabled={!edit} />
          <TextInput name="email" form={form} disabled={!edit} />
        </>
      )
    }
    return (
      <List disablePadding>
        {renderListItem(<Abc />, user.name || '')}
        {renderListItem(<Email />, user.email)}
      </List>
    )
  }

  return (
    <Box {...rest}>
      <SnackbarAlert {...getAlertProps()} />
      <Stack
        width="100%x"
        spacing={2}
        alignItems="center"
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton
            component="label"
            disabled={!canEdit || isLoading}
            sx={{ mr: 3 }}
          >
            <UserAvatar userId={user?.id} />
            <input
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              defaultValue={file?.name}
              onChange={(e) => setFile(e.target.files?.[0])}
              hidden
            />
          </IconButton>
          <Typography variant="h3">{user.name}</Typography>
        </Box>
        <Box>
          {user.admin && <Chip label="Admin" component="div" />}
          <Chip label={String(user.createdAt)} />
        </Box>
        {renderInfo()}
        <Box>
          <Button
            onClick={() => Router.push('/users')}
            variant="contained"
            sx={{ mt: 2, mr: 1 }}
          >
            Back
          </Button>
          {canEdit && <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
          >
            {edit ? 'Save' : 'Edit'}
          </Button>}
        </Box>
      </Stack>
    </Box>
  )
}

export default UserProfile
