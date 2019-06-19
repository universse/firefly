import matchSorter, { rankings } from 'match-sorter'
import searchData from 'data/mivEB3GnRswZyWZMNkaO.json'

const allCollectionIds = Object.keys(searchData).map(id => ({ id }))

const options = {
  keys: [
    {
      // minRanking: rankings.CASE_SENSITIVE_EQUAL,
      key: collection => searchData[collection.id].name
    },
    {
      maxRanking: rankings.WORD_STARTS_WITH,
      key: collection => searchData[collection.id].tags
    }
  ]
  // threshold: rankings.ACRONYM
}

export async function search (input, collectionIds, sort, tags) {
  const tagCounts = {}

  const matchedIds = matchSorter(
    collectionIds || allCollectionIds,
    input.trim(),
    options
  )

  if (!collectionIds) return { collectionIds: matchedIds }

  const filteredIds = matchedIds.filter(collection =>
    tags.every(filter =>
      searchData[collection.id].tags.some(tag => tag.toLowerCase() === filter)
    )
      ? searchData[collection.id].tags.forEach(tag => {
          const lowered = tag.toLowerCase()
          tagCounts[lowered] = tagCounts[lowered] ? ++tagCounts[lowered] : 1
        }) || true
      : false
  )

  return {
    collectionIds: sort
      ? filteredIds.sort(({ id: id1 }, { id: id2 }) =>
          sort === 'asc'
            ? searchData[id1].level - searchData[id2].level
            : searchData[id2].level - searchData[id1].level
        )
      : filteredIds,

    aggregatedTags: Object.entries(tagCounts).sort(
      ([tag1, count1], [tag2, count2]) =>
        tags.indexOf(tag2) - tags.indexOf(tag1) || count2 - count1
    )
  }
}
