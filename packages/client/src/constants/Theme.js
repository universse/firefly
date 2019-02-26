export const media = {
  desktop: 'screen and (min-width: 52.0625rem)',
  nonDesktop: 'screen and (max-width: 52rem)',
  mobile: 'screen and (max-width: 37rem)',
  nonMobile: 'screen and (min-width: 37.0625rem)',
  tablet: 'screen and (min-width: 37.0625rem) and (max-width: 52rem)'
}

export default {
  colors: {
    brand100: '#ed5567',
    brand500: '#e4234f',
    brand900: '#c70e3a',
    danger: '#da4453',
    white: 'rgba(255, 255, 255, 0.9)',
    gray100: '#f9fafb',
    gray300: '#f1f1f1',
    gray400: '#cfcfcf',
    gray500: '#666',
    gray600: 'rgba(0, 0, 0, 0.55)',
    gray700: 'rgba(0, 0, 0, 0.7)',
    gray900: 'rgba(0, 0, 0, 0.87)',
    success: '#13ae36'
  },
  gradients: {
    left:
      'linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 30%)',
    right:
      'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 30%)'
  },
  screens: {
    desktop: `@media ${media.desktop}`,
    nonDesktop: `@media ${media.nonDesktop}`,
    mobile: `@media ${media.mobile}`,
    nonMobile: `@media ${media.nonMobile}`,
    tablet: `@media ${media.tablet}`
  },
  shadows: [
    '0 1px 2px rgba(0, 0, 0, 0.05)',
    '0 2px 4px rgba(0, 0, 0, 0.1)',
    '0 4px 8px rgba(0, 0, 0, 0.2)'
  ],
  typography: {}
}
