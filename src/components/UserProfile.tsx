import { useEffect, useState } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'
import { Box, Button, IconButton, Typography } from '@mui/material'
import supabase from '@/lib/supabase'
import SnackbarAlert from '@/components/SnackbarAlert'
import UserAvatar from '@/components/UserAvatar'

type Props = {
  user: Partial<User>,
  [x: string]: unknown
}

const UserProfile: React.FC<Props> = ({ user, ...rest }) => {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | undefined>()
  const [isError, setIsError] = useState(false)
  const canEdit = session?.user?.id === user.id

  console.log({ canEdit })

  const uploadFile = async () => {
    if (!supabase || !file) return
    const bucket = process.env.NODE_ENV
    const path = `${user.id}/${file.name}`
    const { data, error } = await supabase.storage.from(bucket).upload(path, file)
    setIsError(Boolean(error))
    console.log({ data }) // TODO save path to db
  }

  useEffect(() => { file && uploadFile() }, [file])

  return (
  <Box {...rest}>
      {isError && <SnackbarAlert content="Upload failed" />}
    <Box display="flex" alignItems="center" mb={2}>
        <IconButton
          component="label"
          disabled={!canEdit}
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
