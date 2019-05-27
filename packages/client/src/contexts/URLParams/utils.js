export function constructHref (sort, tags) {
  const params = []

  sort && params.push(`sort=${sort}`)
  tags.length && params.push(`tags=${[...tags].reverse().join(',')}`)

  const queryString = params.join('&')

  return `${window.location.pathname}${queryString ? `?${queryString}` : ''}`
}
