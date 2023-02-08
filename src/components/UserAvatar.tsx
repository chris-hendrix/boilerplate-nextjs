import { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { User } from '@prisma/client'

type Props = {
  user: Partial<User> | null | undefined,
  [x: string]: unknown
}

const UserAvatar: React.FC<Props> = ({ user, ...rest }) => {
  const [bucketImageUrl, setBucketImageUrl] = useState<string | undefined>()
  useEffect(() => { loadBucketImageUrl() }, [])

  const loadBucketImageUrl = async () => {
    if (!user?.bucketImage) return
    const res = await fetch(`/api/storage?path=${user.bucketImage}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    setBucketImageUrl(url)
  }

  if (!user) return null
  const { name, image } = user
  const imageUrl = bucketImageUrl || image

  return imageUrl ? <Avatar src={imageUrl} {...rest} /> : <Avatar {...rest}>{name?.charAt(0) || ''}</Avatar>
}

export default UserAvatar
