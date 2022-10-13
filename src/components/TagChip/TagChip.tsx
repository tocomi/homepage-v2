import { css } from '@emotion/react'
import { Chip } from '@mui/material'
import { ComponentProps, FC, memo } from 'react'

const colors = {
  default: '#E3E2E080',
  gray: '#E3E2E0',
  brown: '#EEE0DA',
  orange: '#FADEC9',
  yellow: '#FAF3DD',
  green: '#DBEDDB',
  blue: '#D3E5EF',
  purple: '#E8DEEE',
  pink: '#F5E0E9',
  red: '#FFE2DD',
}

type Props = {
  variant: NonNullable<ComponentProps<typeof Chip>['variant']>
  label: ComponentProps<typeof Chip>['label']
  colorKey: keyof typeof colors
}

export const TagChip: FC<Props> = memo(function TagChip({ variant, label, colorKey }) {
  return (
    <Chip
      variant={variant}
      label={label}
      size="small"
      sx={{
        // TODO: MUI の theme で設定したい
        backgroundColor: variant === 'filled' ? colors[colorKey] : 'white',
        borderColor: variant === 'outlined' ? colors[colorKey] : 'white',
        padding: 1,
        borderRadius: 4,
      }}
      css={css`
        .MuiChip-label {
          margin-bottom: 2px;
        }
      `}
    />
  )
})
