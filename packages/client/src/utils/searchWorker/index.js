import SearchWorker from './search.worker'

export default typeof window === 'object' && new SearchWorker()
