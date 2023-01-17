import { Box, Chip } from '@mui/material'
import { useGetMessagesQuery } from '@/services/message'
import UserAvatar from './UserAvatar'

const MessageList: React.FC = ({ ...rest }) => {
  const { data: messages, isLoading } = useGetMessagesQuery()

  if (isLoading || !messages) return null
  return (
  <Box display="flex" flexDirection="column" {...rest}>
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
}

export default MessageList
