import { useEffect, useRef } from 'react'

// Code from Dan Abramov
type CallbackFunc = () => void
export const useInterval = (callback: CallbackFunc, delay: number | null) => {
  const savedCallback = useRef<CallbackFunc>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
