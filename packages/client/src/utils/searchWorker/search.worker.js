import matchSorter, { rankings } from 'match-sorter'

import memoize from '../memoize'

const searchData = JSON.parse(
  '{"HhRsuZ6IPyylqS7B6U6w":{"category":"artificial intelligence","itemCount":1,"level":2.3,"name":"Convolutional Neural Network","tags":["image recognition","deep learning","neural network"]},"JcNubtmHfKgPFnbZAExY":{"category":"design","itemCount":1,"level":1,"name":"Design Fundamental","tags":["visual design","design principles"]},"Om6hJWi21OyDVbhTORSz":{"category":"web development","itemCount":1,"level":3,"name":"React Hooks","tags":["react","hooks","state management"]},"Pw2TFeJJKnYpFt06LiwY":{"category":"artificial intelligence","itemCount":1,"level":2.6,"name":"Image Recognition With Keras","tags":["keras","tensorflow","cnn"]},"fQw2oGPJenZYG3JckiJa":{"category":"artificial intelligence","itemCount":1,"level":3.5,"name":"Reinforcement Learning","tags":["machine learning","python","openai"]},"pGnSWxe9S0fWu3T7RiFh":{"category":"programming","itemCount":1,"level":2,"name":"Getting Started With GraphQL","tags":["GraphQL","backend"]},"pqT2mJij6rC84d2bqlmC":{"category":"artificial intelligence","itemCount":6,"level":0,"name":"Getting Started With Machine Learning","tags":["machine learning","data science"]},"ucGpgE7vKATTYfb4XmdI":{"category":"artificial intelligence","itemCount":1,"level":1.2,"name":"Data Science Fundamentals","tags":["machine learning","supervised learning","big data"]}}'
)

const allCollectionIds = Object.keys(searchData).map(id => ({ id }))

export function init () {
  return searchData
}

const options = {
  keys: [
    // { key:
    ({ id }) => searchData[id].name,
    // minRanking: rankings.CASE_SENSITIVE_EQUAL,
    // },
    // { key: ({ id }) => searchData[id].tags,
    // maxRanking: rankings.WORD_STARTS_WITH
    // },
    // { key:
    ({ id }) => `${searchData[id].name} ${searchData[id].tags.join(' ')}`
    // maxRanking: rankings.EQUAL
    // }
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
    ? [...filtered].sort(({ id: id1 }, { id: id2 }) =>
        sort === 'asc'
          ? searchData[id1].level - searchData[id2].level
          : searchData[id2].level - searchData[id1].level
      )
    : filtered
)

export function search (input, sort, tags, collectionIds = false) {
  const matched = match(collectionIds || null, input.trim())
  if (collectionIds === false) return { collectionIds: matched }
  const { filtered, tagCounts } = filter(matched, countTags(matched), tags)
  const ordered = order(filtered, sort)

  return {
    collectionIds: ordered,
    aggregatedTags: Object.entries(tagCounts)
  }
}