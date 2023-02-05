import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Box, Chip, IconButton, TextField, Tooltip } from '@mui/material'
import { Send } from '@mui/icons-material'

import { useAddMessageMutation, useGetMessagesQuery } from '@/store/message'

import UserAvatar from './UserAvatar'

type Props = {
  iconsOnly?: boolean
  [x: string]: unknown
}

const Messages: React.FC<Props> = ({ iconsOnly = false, ...rest }) => {
  const [content, setContent] = useState<string>('')
  const { data: messages, isLoading } = useGetMessagesQuery()
  const [addMessage, { isLoading: isSending }] = useAddMessageMutation()
  const { data: session } = useSession()

  if (isLoading || !messages) return null

  const sendMessage = async () => {
    await addMessage({ content })
    setContent('')
  }

  const renderMessageList = () => (
    <Box display="flex" flexDirection="column" >
      {messages.map((message) => (
        <Box key={message.id} mb={2}>
          <Tooltip title={`${message?.user?.name}${iconsOnly ? `: ${message?.content}` : ''}`}>
            <Chip
              avatar={<UserAvatar user={message?.user} />}
              label={!iconsOnly && message.content}
            />
          </Tooltip>
        </Box>
      ))}
    </Box>
  )

  const renderMessageInput = () => (
    <Box display="flex" alignItems="center">
      <UserAvatar user={session?.user} />
      <TextField
        className="messageInput"
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
              className="sendMessageButton"
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
      <Box display="flex" height="100%" flexDirection="column">
        {renderMessageList()}
        <Box display="flex" flexGrow={1} justifyContent="flex-end" />
        {!iconsOnly && renderMessageInput()}
      </Box>
    </Box>
  )
}

export default Messages
