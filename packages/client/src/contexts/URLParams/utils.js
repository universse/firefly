import URLParamKeys from 'constants/URLParamKeys'

export function constructHref (searchInput, sort, tags) {
  const params = []

  searchInput.trim() &&
    params.push(`${URLParamKeys.SEARCH_INPUT}=${searchInput.trim()}`)

  sort && params.push(`${URLParamKeys.SORT}=${sort}`)

  tags.length &&
    params.push(`${URLParamKeys.TAGS}=${[...tags].reverse().join(',')}`)

  const queryString = params.join('&')

  return `${window.location.pathname}${queryString ? `?${queryString}` : ''}`
}
