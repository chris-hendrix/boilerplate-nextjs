import { Avatar, Box, Chip } from '@mui/material'
import { Message } from '@/types'

type Props = {
  messages: Message[]
}

const MessageList: React.FC<Props> = ({ messages, ...rest }) => (
  <Box display="flex" flexDirection="column" {...rest}>
    {messages.map((message) => (
      <Box key={message.id} mb={2}>
        <Chip
          avatar={<Avatar>{message?.user?.name?.charAt(0)}</Avatar>}
          label={message.content}
        />
      </Box>
    ))}
  </Box>
)

export default MessageList
