import { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { User } from '@prisma/client'

type Props = {
  user: Partial<User>,
  [x: string]: unknown
}

const UserAvatar: React.FC<Props> = ({ user, ...rest }) => {
  const { name, image, bucketImage } = user
  const [bucketImageUrl, setBucketImageUrl] = useState<string | undefined>()

  const loadBucketImageUrl = async () => {
    const res = await fetch(`/api/storage?path=${bucketImage}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    setBucketImageUrl(url)
  }

  useEffect(() => { bucketImage && loadBucketImageUrl() }, [bucketImage])

  if (!user) return null
  const imageUrl = bucketImageUrl || image
  console.log({ imageUrl }) // TODO fix
  return imageUrl ? <Avatar src={imageUrl} {...rest} /> : <Avatar {...rest}>{name?.charAt(0) || ''}</Avatar>
}

export default UserAvatar
