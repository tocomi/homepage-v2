import { Client, isFullBlock, isFullPage } from '@notionhq/client'
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: 'secret_FSLxNbd2Sn8D69Obym1YRv5bCHmgn4fZeOuJ1a8EuTs',
})

const DATABASE_ID = 'adc862a2f0484671a72451146842c838'

export const getDatabase = async (databaseId = DATABASE_ID) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  })
  return response.results.filter<PageObjectResponse>((r): r is PageObjectResponse => isFullPage(r))
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response as PageObjectResponse
}

export const getBlocks = async (blockId: string) => {
  const blocks: BlockObjectResponse[] = []
  let cursor
  while (true) {
    const response: ListBlockChildrenResponse = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    })
    const { results, next_cursor } = response
    blocks.push(
      ...results.filter<BlockObjectResponse>((r): r is BlockObjectResponse => isFullBlock(r))
    )
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }
  return blocks
}
