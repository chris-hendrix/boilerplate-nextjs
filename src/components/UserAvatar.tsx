import { Avatar } from '@mui/material'
import { User } from '@prisma/client'

type Props = {
  user?: Partial<User> | null
}

const UserAvatar: React.FC<Props> = ({ user, ...rest }) => {
  if (!user) return null
  const { name, image } = user
  return image ? <Avatar src={image} {...rest} /> : <Avatar {...rest}>{name?.charAt(0) || ''}</Avatar>
}

export default UserAvatar
