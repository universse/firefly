function truncate (str, length = 120) {
  if (str.length <= length) return 0
  let final
  if (str.slice(0, length).endsWith(' ')) final = str.slice(0, length - 1)
  if (str.slice(0, length + 1).endsWith(' ')) final = str.slice(0, length)
  else {
    const trimmed = str.slice(0, length)
    final = trimmed.slice(0, trimmed.lastIndexOf(' '))
  }
  return final.length
}

function getTruncatedString (str, length = 120) {
  if (typeof str !== 'string') return ''
  const cutOff = truncate(str, length)
  return cutOff ? `${str.slice(0, cutOff)}...` : str
}

module.exports = { truncate, getTruncatedString }
