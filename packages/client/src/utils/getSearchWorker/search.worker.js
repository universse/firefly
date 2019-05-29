import matchSorter from 'match-sorter'

let searchData

export async function search (input) {
  if (!searchData) {
    searchData = await fetch('/data/inSZHihe121BmAaTS48B.json').then(res =>
      res.json()
    )
  }

  return matchSorter(searchData, input, {
    keys: ['name']
  })
}
