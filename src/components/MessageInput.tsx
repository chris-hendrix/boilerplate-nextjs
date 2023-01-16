import { useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'

const MessageInput = ({ ...rest }) => {
  const [message, setMessage] = useState<string>('')
  return (
    <TextField
      fullWidth
      value={message}
      placeholder="Enter message"
      onChange={(e) => setMessage(e.target.value)}
      InputProps={{
        endAdornment:
          <IconButton
            onClick={() => console.log(message)}
            disabled={Boolean(message.length === 0)} >
            <Send />
          </IconButton>
      }}
      {...rest}
    />

  )
}

export default MessageInput
