import React from 'react'
import { ThemeProvider } from 'emotion-theming'

const theme = {
  colors: {
    brand100: '',
    brand500: '#ed5565',
    brand900: '',
    danger: '',
    gray100: '',
    gray500: '',
    gray900: '',
    topics: {
      ai: '',
      cloud: '',
      design: '',
      marketing: '',
      programming: '',
      psychology: '',
      startup: '',
      'web development': ''
    }
  }
}

export default ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)
