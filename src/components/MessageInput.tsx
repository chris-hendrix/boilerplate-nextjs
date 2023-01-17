import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Box, IconButton, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'

import { useAddMessageMutation } from '@/services/message'

import UserAvatar from './UserAvatar'

const MessageInput = ({ ...rest }) => {
  const [content, setContent] = useState<string>('')
  const [addMessage, { isLoading }] = useAddMessageMutation()
  const { data: session } = useSession()

  const sendMessage = async () => {
    await addMessage({ content })
    setContent('')
  }

  return (
    <Box display="flex" alignItems="center" {...rest}>
      <UserAvatar user={session?.user} />
      <TextField
        fullWidth
        disabled={!session}
        value={content}
        placeholder="Enter message"
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            sendMessage()
          }
        }}
        InputProps={{
          endAdornment:
            <IconButton
              onClick={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              disabled={Boolean(content.length === 0) || isLoading} >
              <Send />
            </IconButton>
        }}
        sx={{ pl: 2 }}
      />
    </Box>

  )
}

export default MessageInput
