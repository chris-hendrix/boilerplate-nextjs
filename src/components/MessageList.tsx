import { Avatar, Box, Chip } from '@mui/material'
import { useGetMessagesQuery } from '@/services/message'

const MessageList: React.FC = ({ ...rest }) => {
  const { data: messages, isLoading } = useGetMessagesQuery()

  if (isLoading || !messages) return null
  return (
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
}

export default MessageList
