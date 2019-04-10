import { useRef, useEffect } from 'react'

export default function useInterval (callback, delay, shouldStartImmediately) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick () {
      savedCallback.current()
    }

    if (delay !== null) {
      shouldStartImmediately && tick()

      const id = setInterval(tick, delay)

      return () => {
        clearInterval(id)
      }
    }
  }, [delay, shouldStartImmediately])
}
