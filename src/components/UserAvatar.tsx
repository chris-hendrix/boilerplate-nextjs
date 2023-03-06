import { useEffect } from 'react'
import { Avatar } from '@mui/material'
import { useGetFileQuery, useGetUserQuery } from '@/store'

type Props = {
  userId: string | null | undefined,
  [x: string]: unknown
}

const UserAvatar: React.FC<Props> = ({ userId, ...rest }) => {
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(userId || '', { skip: !userId })

  const {
    data: bucketImageUrl,
    isLoading: isBucketImageUrlLoading,
    refetch: refetchBucketImageUrl,
  } = useGetFileQuery(user?.bucketImage as string, { skip: !user?.bucketImage })

  const isLoading = isUserLoading || isBucketImageUrlLoading

  useEffect(() => {
    if (isUserLoading) return
    if (isBucketImageUrlLoading) return
    if (!user) return
    if (!bucketImageUrl) return
    refetchBucketImageUrl()
  }, [isUserLoading, user?.bucketImage])

  if (!user || isLoading) return null
  const imageUrl = bucketImageUrl || user?.image || '/avatar.png'

  return <Avatar src={imageUrl} {...rest} />
}

export default UserAvatar
