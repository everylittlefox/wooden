import create from 'zustand'

interface TimerState {
  type?: 'break' | 'task' | null
  secondsLeft: number
  tick(): void
  init(type: 'break' | 'task', seconds: number): void
}

const useTimerStore = create<TimerState>((set, get) => ({
  type: null,
  secondsLeft: -1,
  tick() {
    set((s) => ({ secondsLeft: s.secondsLeft - 1 }))
  },
  init(type, secondsLeft) {
    set(() => ({ type, secondsLeft }))
  }
}))

export default useTimerStore
