export const copyToClipboard = str => {
  const el = document.createElement('textarea')

  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false

  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

export const getHostname = url => {
  if (typeof window === 'object') {
    return new URL(url).hostname
  } else {
    const { URL } = require('url')
    return new URL(url).hostname
  }
}
