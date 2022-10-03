import { type ComponentMeta, type ComponentStoryObj } from '@storybook/react'
import { Paper } from './Paper'

export default { component: Paper } as ComponentMeta<typeof Paper>

export const Index: ComponentStoryObj<typeof Paper> = {
  args: {
    sx: (theme) => ({
      bgcolor: theme.palette.primary.main,
      height: 200,
      width: 300,
    }),
  },
}
