export const baseFontSize = 16

export const headerHeightInRem = 4

export const mobileHeaderHeightInRem = 3.5

export const mobileNavigationHeightInRem = 3.5

export const mobileBarsHeightInRem =
  mobileHeaderHeightInRem + mobileNavigationHeightInRem

export const mobileProgressBarHeight = 2.25

export const media = {
  desktop: 'screen and (min-width: 52.0625rem)',
  nonDesktop: 'screen and (max-width: 52rem)',
  mobile: 'screen and (max-width: 37rem)',
  nonMobile: 'screen and (min-width: 37.0625rem)',
  tablet: 'screen and (min-width: 37.0625rem) and (max-width: 52rem)'
}

export const screens = {
  desktop: `@media ${media.desktop}`,
  nonDesktop: `@media ${media.nonDesktop}`,
  mobile: `@media ${media.mobile}`,
  nonMobile: `@media ${media.nonMobile}`,
  tablet: `@media ${media.tablet}`
}
