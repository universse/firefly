export const getHostname = url => {
  if (typeof window === 'object') {
    return new URL(url).hostname
  } else {
    const { URL } = require('url')
    return new URL(url).hostname
  }
}
