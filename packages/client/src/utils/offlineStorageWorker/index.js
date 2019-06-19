import OfflineStorageWorker from './offlineStorage.worker'

export default typeof window === 'object' && new OfflineStorageWorker()
