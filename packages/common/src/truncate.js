function truncate (str, length = 120) {
  if (str.length <= length) return str.length
  let final
  if (str.slice(0, length).endsWith(' ')) final = str.slice(0, length - 1)
  if (str.slice(0, length + 1).endsWith(' ')) final = str.slice(0, length)
  else {
    const trimmed = str.slice(0, length)
    final = trimmed.slice(0, trimmed.lastIndexOf(' '))
  }
  return final.length
}

module.exports = truncate
