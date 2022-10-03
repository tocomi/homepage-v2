import { Paper as MuiPaper } from '@mui/material'
import { ComponentProps, FC, memo } from 'react'

export const Paper: FC<ComponentProps<typeof MuiPaper>> = memo(function Paper(props) {
  return <MuiPaper elevation={8} {...props} />
})
