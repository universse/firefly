import matchSorter, { rankings } from 'match-sorter'

import searchData from 'data/mivEB3GnRswZyWZMNkaO.json'
import memoize from '../memoize'

const allCollectionIds = Object.keys(searchData).map(id => ({ id }))

export function init () {
  return searchData
}

const options = {
  keys: [
    {
      // minRanking: rankings.CASE_SENSITIVE_EQUAL,
      key: ({ id }) => searchData[id].name
    },
    {
      maxRanking: rankings.WORD_STARTS_WITH,
      key: ({ id }) => searchData[id].tags
    }
  ]
  // threshold: rankings.ACRONYM
}

const match = memoize((collectionIds, input) =>
  matchSorter(JSON.parse(collectionIds) || allCollectionIds, input, options)
)

const countTags = memoize(matched => {
  const tagCounts = {}

  matched.forEach(({ id }) =>
    searchData[id].tags.forEach(tag => {
      const lowered = tag.toLowerCase()
      tagCounts[lowered] = tagCounts[lowered] ? ++tagCounts[lowered] : 1
    })
  )

  return tagCounts
})

const filter = memoize((matched, tagCounts, tags) => {
  tagCounts = { ...tagCounts }

  const filtered = matched.filter(
    ({ id }) =>
      JSON.parse(tags).every(filter =>
        searchData[id].tags.some(tag => tag.toLowerCase() === filter)
      ) ||
      searchData[id].tags.forEach(tag => {
        const lowered = tag.toLowerCase()
        tagCounts[lowered] = --tagCounts[lowered]
      })
  )

  return { filtered, tagCounts }
})

const order = memoize((filtered, sort) =>
  sort
    ? filtered.sort(({ id: id1 }, { id: id2 }) =>
        sort === 'asc'
          ? searchData[id1].level - searchData[id2].level
          : searchData[id2].level - searchData[id1].level
      )
    : filtered
)

export function search (input, sort, tags, collectionIds = null) {
  const matched = match(collectionIds, input.trim())
  if (!collectionIds) return { collectionIds: matched }
  const { filtered, tagCounts } = filter(matched, countTags(matched), tags)
  const ordered = order(filtered, sort)

  return {
    collectionIds: ordered,
    aggregatedTags: Object.entries(tagCounts)
  }
}
