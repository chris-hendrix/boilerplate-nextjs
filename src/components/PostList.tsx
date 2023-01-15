import { GetStaticProps } from 'next'
import { Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material'
import { Post } from '@/types'

export const getStaticProps: GetStaticProps = async () => {
  const posts = [
    {
      id: '1',
      title: 'Hello world!',
      content: 'Hello world do you exist?',
      published: true,
      author: {
        name: 'Chris ',
        email: 'chendrix1123@gmail.com',
      },
    },
    {
      id: '2',
      title: 'Prisma is the perfect ORM for Next.js',
      content: '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
      published: true,
      author: {
        name: 'Nikolas Burk',
        email: 'burk@prisma.io',
      },
    }
  ]
  return {
    props: { posts },
    revalidate: 10
  }
}

type Props = {
  posts: Post[]
}

const PostList: React.FC<Props> = ({ posts, ...rest }) => (
  <Box {...rest}>
    {posts.map((p) => (
      <Card key={p.id} sx={{ mb: 1 }}>
        <CardContent>
          <Typography variant="body1">{p.title}</Typography>
          <Typography variant="caption">{p?.author?.name}</Typography>
        </CardContent>
        <CardActions>
          <Button>View</Button>
        </CardActions>
      </Card>
    ))}
  </Box>
)

export default PostList
