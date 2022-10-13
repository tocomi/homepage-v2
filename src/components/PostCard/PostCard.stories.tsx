import { type ComponentMeta, type ComponentStoryObj } from '@storybook/react'
import { PostCard } from './PostCard'

export default { component: PostCard } as ComponentMeta<typeof PostCard>

export const Index: ComponentStoryObj<typeof PostCard> = {
  args: {
    emoji: '🐹',
    title: 'Go x MySQL の API 開発環境をサクッと用意したい',
    tags: ['Develop', 'Go', 'MySQL'],
    createdAt: '2022/10/14',
  },
}
