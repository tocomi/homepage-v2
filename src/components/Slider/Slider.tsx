import { Slider as MuiSlider } from '@mui/material'
import { ComponentProps, FC, memo } from 'react'

export const Slider: FC<ComponentProps<typeof MuiSlider>> = memo(function Slider(props) {
  return <MuiSlider {...props} />
})
