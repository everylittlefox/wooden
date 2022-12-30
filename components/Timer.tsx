import { useEffect, useState } from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar'
import { useInterval } from '../lib/hooks'
import { toHHMMSS } from '../lib/utils'
import useTimerStore from '../stores/timerStore'
import Button from './Button'
import PauseIcon from './PauseIcon'
import PlayIcon from './PlayIcon'

type TimerProps = {
  seconds: number
  type: 'break' | 'task'
  onFinish?: () => void
}

const Timer: React.FC<TimerProps> = ({ seconds, type, onFinish }) => {
  const initTimer = useTimerStore((s) => s.init)
  const tick = useTimerStore((s) => s.tick)
  const secs = useTimerStore((s) => s.secondsLeft)
  const [ticking, setTicking] = useState(false)

  useEffect(() => {
    initTimer(type, seconds)
  }, [initTimer, type, seconds])

  useEffect(() => {
    if (type === 'break') setTicking(true)
  }, [type])

  useInterval(
    () => {
      tick()
    },
    ticking ? 1000 : null
  )

  useEffect(() => {
    if (secs === 0) {
      onFinish && onFinish()
      setTicking(false)
    }
  }, [secs]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center">
      <div className="w-60">
        <CircularProgressbarWithChildren
          strokeWidth={4}
          styles={buildStyles({
            trailColor: 'rgb(229 231 235)',
            pathColor: '#bdbdbd'
          })}
          value={secs / seconds}
          maxValue={1}
        >
          <span className="text-5xl text-gray-500">{toHHMMSS(secs)}</span>
          <span className="text-sm text-gray-500 mt-8">{type}</span>
        </CircularProgressbarWithChildren>
      </div>
      <div className="mt-16">
        {type === 'task' && (
          <Button onClick={() => setTicking(!ticking)}>
            {ticking ? (
              <PauseIcon className="w-6 h-6 text-gray-500" />
            ) : (
              <PlayIcon className="w-6 h-6 text-gray-500" />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Timer
