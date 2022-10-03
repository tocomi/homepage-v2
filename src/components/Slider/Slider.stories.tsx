import { expect } from '@storybook/jest'
import { type ComponentMeta, type ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { Slider } from './Slider'

export default { component: Slider } as ComponentMeta<typeof Slider>

export const Index: ComponentStoryObj<typeof Slider> = {
  args: {
    sx: { width: 300, m: 12 },
    valueLabelDisplay: 'auto',
    defaultValue: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.hover(canvas.getByRole('slider'))

    // NOTE: ホバーすると数値が表示される
    await expect(canvas.getByText('50')).toBeInTheDocument()
  },
}
