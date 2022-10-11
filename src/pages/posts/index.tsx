import { Typography } from '@mui/material'
import type { InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import styles from './index.module.css'
import { getDatabase } from '@/domain/notion'

const Posts: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <>
      <Typography variant="h1">POSTS</Typography>
      <ol className={styles.posts}>
        {posts.map((post) => {
          const date = new Date(post.last_edited_time).toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })
          console.log(post.properties)
          return (
            <li key={post.id} className={styles.post}>
              <h3 className={styles.postTitle}>
                <Link href={`/posts/${post.id}`}>
                  <a>
                    {/* @ts-ignore title の型が取得できない */}
                    <Typography>{post.properties.Name.title[0].plain_text}</Typography>
                  </a>
                </Link>
              </h3>

              <p className={styles.postDescription}>{date}</p>
              <Link href={`/posts/${post.id}`}>
                <a> Read post →</a>
              </Link>
            </li>
          )
        })}
      </ol>
    </>
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
