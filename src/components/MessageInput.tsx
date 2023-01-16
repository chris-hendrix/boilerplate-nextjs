import { useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'

const MessageInput = ({ ...rest }) => {
  const [content, setContent] = useState<string>('')

  const sendMessage = async () => {
    try {
      await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      setContent('')
    } catch (error) {
      console.error(error)
    }
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
            disabled={Boolean(content.length === 0)} >
            <Send />
          </IconButton>
      }}
      {...rest}
    />

  )
}

export default MessageInput
