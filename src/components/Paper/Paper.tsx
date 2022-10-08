import { css } from '@emotion/react'
import { Paper as MuiPaper } from '@mui/material'
import { ComponentProps, FC, memo } from 'react'

export const Paper: FC<ComponentProps<typeof MuiPaper>> = memo(function Paper(props) {
  return (
    <MuiPaper
      css={css`
        border-radius: 12px;
        padding: 32px;
      `}
      elevation={4}
      {...props}
    />
  )
})
