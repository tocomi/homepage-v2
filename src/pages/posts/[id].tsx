import { ParsedUrlQuery } from 'node:querystring'
import {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import styles from './post.module.css'
import { getBlocks, getDatabase, getPage } from '@/domain/notion'

export const Text: FC<{
  textProperties: {
    annotations: {
      bold: boolean
      code: boolean
      color: string
      italic: boolean
      strikethrough: boolean
      underline: boolean
    }
    text: { content: string; link?: { url: string } }
  }[]
}> = ({ textProperties }) => {
  if (!textProperties) {
    return null
  }
  return (
    <>
      {textProperties.map((value) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value
        return (
          <span
            key={text.content}
            className={[
              bold ? styles.bold : '',
              code ? styles.code : '',
              italic ? styles.italic : '',
              strikethrough ? styles.strikethrough : '',
              underline ? styles.underline : '',
            ].join(' ')}
            style={color !== 'default' ? { color } : {}}
          >
            {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
          </span>
        )
      })}
    </>
  )
}

const renderNestedList = (
  block: BulletedListItemBlockObjectResponse | NumberedListItemBlockObjectResponse
) => {
  const { type } = block
  // @ts-ignore
  const value = block[type]
  if (!value) return null

  const isNumberedList = value.children[0].type === 'numbered_list_item'

  if (isNumberedList) {
    return <ol>{value.children.map((block: BlockObjectResponse) => renderBlock(block))}</ol>
  }
  return <ul>{value.children.map((block: BlockObjectResponse) => renderBlock(block))}</ul>
}

const renderBlock = (block: BlockObjectResponse) => {
  const { type, id } = block
  // @ts-ignore
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text textProperties={value.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1>
          <Text textProperties={value.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2>
          <Text textProperties={value.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          <Text textProperties={value.rich_text} />
        </h3>
      )
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <Text textProperties={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <Text textProperties={value.rich_text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <Text textProperties={value.rich_text} />
          </summary>
          {value.children?.map((block: BlockObjectResponse) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      )
    case 'child_page':
      return <p>{value.text}</p>
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure>
          {/* TODO: 画像のサイズを動的に取得したい */}
          <Image src={src} alt={caption} width="800" height="400" />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    case 'divider':
      return <hr key={id} />
    case 'quote':
      return <blockquote key={id}>{value.rich_text}</blockquote>
    case 'code':
      return (
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      )
    case 'file':
      const src_file = value.type === 'external' ? value.external.url : value.file.url
      const splitSourceArray = src_file.split('/')
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
      const caption_file = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure>
          <div className={styles.file}>
            📎{' '}
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      )
    case 'bookmark':
    case 'link_preview':
      const href = value.url
      return (
        <a href={href} target="_brank" className={styles.bookmark}>
          {href}
        </a>
      )
    case 'table_of_contents':
      // NOTE: 表示するための情報が足りない
      return null
    default:
      return (
        <>❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})</>
      )
  }
}

type Props = {
  page: PageObjectResponse
  blocks: BlockObjectResponse[]
}

const Post: FC<Props> = ({ page, blocks }) => {
  if (!page || !blocks) {
    return <div />
  }
  console.log('👾 -> blocks', blocks)

  return (
    <div>
      <Head>
        {/* @ts-ignore title の型が取得できない */}
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className={styles.container}>
        <h1 className={styles.name}>
          {/* @ts-ignore title の型が取得できない */}
          <Text textProperties={page.properties.Name.title} />
        </h1>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href="/posts">
            <a className={styles.back}>← Go home</a>
          </Link>
        </section>
      </article>
    </div>
  )
}

export default Post

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const database = await getDatabase()
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { id } = context.params!
  const page = await getPage(id)
  const blocks = await getBlocks(id)

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    // @ts-ignore
    if (block.has_children && !block[block.type].children) {
      // @ts-ignore
      block[block.type]['children'] = childBlocks.find((x) => x.id === block.id)?.children
    }
    return block
  })

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  }
}
