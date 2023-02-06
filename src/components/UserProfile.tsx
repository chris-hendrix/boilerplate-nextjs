import { useEffect, useState } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useUpdateUserMutation } from '@/store/user'
import SnackbarAlert from '@/components/SnackbarAlert'
import UserAvatar from '@/components/UserAvatar'

type Props = {
  user: Partial<User>,
  [x: string]: unknown
}

const UserProfile: React.FC<Props> = ({ user, ...rest }) => {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | undefined>()
  const [isUploadError, setIsUploadError] = useState(false)
  const [updateUser, { isLoading, isError: isUpdateError }] = useUpdateUserMutation()
  const canEdit = session?.user?.id === user.id

  const getErrorMessage = () => {
    if (isUploadError) return 'Error uploading'
    if (isUpdateError) return 'Error saving'
    return null
  }

  const uploadFile = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/storage', {
        method: 'POST',
        body: formData
      })
      const path = await res.json()
      await updateUser({ id: user.id, bucketImage: path })
    } catch (error) {
      setIsUploadError(true)
    }
  }

  useEffect(() => { file && uploadFile() }, [file])

  return (
  <Box {...rest}>
      <SnackbarAlert content={getErrorMessage()} />
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
  </Box>
  )
}

export default UserProfile
