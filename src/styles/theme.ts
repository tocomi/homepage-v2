import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans', 'Noto Sans JP', '-apple-system', 'Roboto', 'sans-serif'].join(','),
    fontSize: 14,
  },
  palette: {
    primary: {
      main: '#52a9b9',
    },
    secondary: {
      main: '#607eaa',
    },
    error: {
      main: red.A400,
    },
  },
  spacing: 2,
})

export default theme
