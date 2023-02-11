import { useEffect, useState } from 'react'
import Router from 'next/router'
import { User } from '@prisma/client'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { useUpdateUserMutation, useUploadFileMutation, useGetSessionQuery } from '@/store'
import SnackbarAlert from '@/components/SnackbarAlert'
import UserAvatar from '@/components/UserAvatar'

type Props = {
  user: Partial<User>,
  [x: string]: unknown
}

const UserProfile: React.FC<Props> = ({ user, ...rest }) => {
  const { data: session } = useGetSessionQuery()
  const [file, setFile] = useState<File | undefined>()

  const [updateUser, {
    isLoading: isUserUpdating,
    isError: isUpdateError
  }] = useUpdateUserMutation()

  const [uploadFile, {
    isLoading: isFileUploading,
    isError: isUploadError
  }] = useUploadFileMutation()

  const canEdit = session?.user?.id === user.id
  const isLoading = isUserUpdating || isFileUploading

  const getErrorMessage = () => {
    if (isUploadError) return 'Error uploading'
    if (isUpdateError) return 'Error saving'
    return null
  }

  const uploadBucketImage = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    const res = await uploadFile(formData)
    if ('data' in res) await updateUser({ id: user.id, bucketImage: res.data })
  }

  useEffect(() => { uploadBucketImage() }, [file])

  return (
    <Box {...rest}>
      <SnackbarAlert content={getErrorMessage()} />
      <Stack
        width="400px"
        spacing={2}
        alignItems="center"
        component="form"
        onSubmit={() => console.log('TODO')}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton
            component="label"
            disabled={!canEdit || isLoading}
            sx={{ mr: 3 }}
          >
            <UserAvatar user={user} />
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
        <Typography>{`email: ${user.email}`}</Typography>
        <Typography>{`joined: ${user.createdAt}`}</Typography>
        <Typography>{`admin: ${user.admin}`}</Typography>
        <Button
          onClick={() => Router.push('/users')}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </Stack>

    </Box>
  )
}

export default UserProfile
