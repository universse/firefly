import { useEffect } from 'react'
import offlineStorageWorker from 'utils/offlineStorageWorker'

export default function useOfflinePersistence (values) {
  useEffect(() => {
    values && offlineStorageWorker.persist(values)
  }, [values])
}
