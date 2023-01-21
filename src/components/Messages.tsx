import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Box, Chip, IconButton, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'

import { useAddMessageMutation, useGetMessagesQuery } from '@/services/message'

import UserAvatar from './UserAvatar'

const Messages = ({ ...rest }) => {
  const [content, setContent] = useState<string>('')
  const { data: messages, isLoading } = useGetMessagesQuery()
  const [addMessage, { isLoading: isSending }] = useAddMessageMutation()
  const { data: session } = useSession()

  if (isLoading || !messages) return null

  const sendMessage = async () => {
    await addMessage({ content, user: session?.user })
    setContent('')
  }

  const renderMessageList = () => (
    <Box display="flex" flexDirection="column" >
      {messages.map((message) => (
        <Box key={message.id} mb={2}>
          <Chip
            avatar={<UserAvatar user={message?.user} />}
            label={message.content}
          />
        </Box>
      ))}
    </Box>
  )

  const renderMessageInput = () => (
    <Box display="flex" alignItems="center">
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
              disabled={Boolean(content.length === 0) || isSending} >
              <Send />
            </IconButton>
        }}
        sx={{ pl: 2 }}
      />
    </Box>
  )

  return (
    <Box {...rest}>
      <Box sx={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
        {renderMessageList()}
        <Box display="flex" flexGrow={1} justifyContent="flex-end" />
        {renderMessageInput()}
      </Box>
    </Box>
  )
}

export default Messages
