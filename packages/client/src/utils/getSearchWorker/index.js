import SearchWorker from './search.worker'

let searchWorker

export default function getSearchWorker () {
  if (!searchWorker) {
    searchWorker = new SearchWorker()
    // await init search data
    // searchWorker.init(data)
  }
  return searchWorker
}
