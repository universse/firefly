import matchSorter from 'match-sorter'
import { NormalizedCollectionsFilename } from 'common'

let searchData

export async function search (input) {
  if (!searchData) {
    searchData = Object.values(
      await import(`data/${NormalizedCollectionsFilename}.json`)
    )
  }

  return matchSorter(searchData, input, {
    keys: ['name']
  })
}
