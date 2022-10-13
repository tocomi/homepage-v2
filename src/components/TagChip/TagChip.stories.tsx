import { type ComponentMeta, type ComponentStoryObj } from '@storybook/react'
import { TagChip } from './TagChip'

export default { component: TagChip } as ComponentMeta<typeof TagChip>

export const Index: ComponentStoryObj<typeof TagChip> = {
  args: {
    variant: 'filled',
    label: 'Develop',
    colorKey: 'blue',
  },
}
