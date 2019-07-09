export const baseFontSize = 16

export const headerHeightInRem = 4

export const mobileHeaderHeightInRem = 3.5

export const bottomBarHeightInRem = 3.5

export const mobileBarsHeightInRem =
  mobileHeaderHeightInRem + bottomBarHeightInRem

export const mobileProgressBarHeightInRem = 2.25

const mobileWidth = '37rem'
const desktopWidth = '58rem'

export const media = {
  desktop: `screen and (min-width: ${desktopWidth})`,
  nonDesktop: `screen and (max-width: ${desktopWidth})`,
  mobile: `screen and (max-width: ${mobileWidth})`,
  nonMobile: `screen and (min-width: ${mobileWidth})`,
  tablet: `screen and (min-width: ${mobileWidth}) and (max-width: ${desktopWidth})`
}

export const screens = {
  desktop: `@media ${media.desktop}`,
  nonDesktop: `@media ${media.nonDesktop}`,
  mobile: `@media ${media.mobile}`,
  nonMobile: `@media ${media.nonMobile}`,
  tablet: `@media ${media.tablet}`
}
