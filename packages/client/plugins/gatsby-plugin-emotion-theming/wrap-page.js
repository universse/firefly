import React from 'react'
import { ThemeProvider } from 'emotion-theming'

const theme = {
  colors: {
    brand100: '',
    brand500: '#ed5565',
    brand900: '',
    danger: '#da4453',
    gray100: '#faf9f9',
    gray300: '#f1f1f1',
    gray500: 'rgba(0, 0, 0, 0.6)',
    gray700: 'rgba(0, 0, 0, 0.7)',
    gray900: 'rgba(0, 0, 0, 0.87)',
    topics: {
      ai: '#9eda44',
      cloud: '#44da80',
      design: '#44dacb',
      marketing: '#449eda',
      programming: '#4453da',
      psychology: '#8044da',
      startup: '#cb44da',
      'web development': '#da449e'
    }
  }
}

export default ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)
