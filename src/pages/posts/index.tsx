import Grid from '@mui/material/Unstable_Grid2'
import type { InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import { PostCard } from '@/components'
import { getDatabase } from '@/domain/notion'

const Posts: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  console.log('👾 -> posts', posts)
  return (
    <Grid container spacing={8} justifyContent="center">
      {posts.map((post) => {
        const createdAt = new Date(post.created_time).toLocaleString('ja-JP', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })
        return (
          <Grid key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>
                <PostCard
                  // @ts-ignore
                  emoji={post.icon?.emoji}
                  // @ts-ignore
                  title={post.properties.Name.title[0].plain_text}
                  // @ts-ignore
                  tags={post.properties.Tags.multi_select}
                  createdAt={createdAt}
                />
              </a>
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export const getStaticProps = async () => {
  const database = await getDatabase()

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  }
}

export default Posts
