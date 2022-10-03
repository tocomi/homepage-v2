import { Autocomplete } from '@mui/material'
import { ComponentProps, FC, memo } from 'react'

export const AutoComplete: FC<ComponentProps<typeof Autocomplete>> = memo(function AutoComplete(
  props
) {
  return <Autocomplete {...props} />
})
