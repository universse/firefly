import matchSorter from 'match-sorter'
import { NormalizedCollectionsPath } from 'common'

let searchData

export async function search (input) {
  if (!searchData) {
    searchData = await fetch(NormalizedCollectionsPath)
      .then(res => res.json())
      .then(data => Object.values(data))
  }

  return matchSorter(searchData, input, {
    keys: ['name']
  })
}
