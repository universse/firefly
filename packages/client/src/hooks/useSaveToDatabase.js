import { useEffect } from 'react'

export default function useSaveToDatabase (firebase, change) {
  useEffect(() => {
    if (change) {
      // console.log(change)
    }
  }, [change])
}
