import { Avatar } from '@mui/material'
import { User } from '@prisma/client'
import { useGetFileQuery } from '@/store'

type Props = {
  user: Partial<User> | null | undefined,
  [x: string]: unknown
}

const UserAvatar: React.FC<Props> = ({ user, ...rest }) => {
  const {
    data: bucketImageUrl,
    isLoading: isBucketImageUrlLoading
  } = useGetFileQuery(user?.bucketImage as string, { skip: !user?.bucketImage })

  if (!user || isBucketImageUrlLoading) return null

  const { name, image } = user
  const imageUrl = bucketImageUrl || image

  return imageUrl ? <Avatar src={imageUrl} {...rest} /> : <Avatar {...rest}>{name?.charAt(0) || ''}</Avatar>
}

export default UserAvatar
