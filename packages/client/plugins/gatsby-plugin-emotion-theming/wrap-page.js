import React from 'react'
import { ThemeProvider } from 'emotion-theming'

// TODO: more accessible colors
const theme = {
  colors: {
    brand100: '',
    brand500: '#ed5567',
    brand900: '',
    danger: '#da4453',
    gray100: '#f2f5f8',
    gray300: '#f1f1f1',
    gray400: '#cfcfcf',
    gray500: 'rgba(0, 0, 0, 0.6)',
    gray700: 'rgba(0, 0, 0, 0.7)',
    gray900: 'rgba(0, 0, 0, 0.87)'
  }
}

export default ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)
