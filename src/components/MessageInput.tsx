import { useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'

import { useAddMessageMutation } from '@/services/message'

const MessageInput = ({ ...rest }) => {
  const [content, setContent] = useState<string>('')
  const [addMessage, { isLoading }] = useAddMessageMutation()

  const sendMessage = async () => {
    await addMessage({ content })
    setContent('')
  }

  return (
    <TextField
      fullWidth
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
      {...rest}
    />

  )
}

export default MessageInput
