import { useMemo } from 'react'

type StepperProps = {
  steps: number
  current?: number
}

const BASE_STEP_CLASSES =
  'flex items-center justify-center font-medium w-10 h-10 border rounded-full'
const FOLLOWING_STEP_CLASSES =
  'before:block before:h-12 before:w-2 before:bg-gray-200 before:absolute relative before:bottom-12 mt-16 before:rounded-full'
const ACTIVE_STEP_CLASSES = 'border-teal-400 font-semibold text-teal-600'
const COMPLETED_STEP_CLASSES =
  'bg-teal-400 font-bold border-none text-white'

const Stepper: React.FC<StepperProps> = ({ steps, current = 1 }) => {
  const stepElements = useMemo(
    () =>
      Array.from({ length: steps })
        .map((_, i) => i + 1)
        .map((s, i) => {
          let classes = [BASE_STEP_CLASSES]

          if (i > 0) classes = classes.concat(FOLLOWING_STEP_CLASSES.split(' '))
          if (s < current) classes = classes.concat(COMPLETED_STEP_CLASSES)
          if (s === current) classes.push(ACTIVE_STEP_CLASSES)
          if ((s === current && i > 0) || s < current)
            classes = classes.filter((c) => c !== 'before:bg-gray-200').concat('before:bg-teal-200')

          return (
            <div className={classes.join(' ')} key={Math.random().toString()}>
              {s}
            </div>
          )
        }),
    [steps, current]
  )

  return <div>{stepElements}</div>
}

export default Stepper
