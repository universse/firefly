export function constructHref (searchInput, sort, tags) {
  const params = []

  searchInput.trim() && params.push(`q=${searchInput.trim()}`)
  sort && params.push(`s=${sort}`)
  tags.length && params.push(`t=${[...tags].reverse().join(',')}`)

  const queryString = params.join('&')

  return `${window.location.pathname}${queryString ? `?${queryString}` : ''}`
}
