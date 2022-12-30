import create from 'zustand'

export type StudySession = {
  id: string
  name: string
  description?: string
  taskDuration: number
  breakDuration: number
  next?: 'break' | 'task' | null
  completed?: boolean
  current?: number | null
}

interface StudySessionStore {
  sessions: StudySession[]
  create(ss: StudySession): void
  find(id: string): StudySession | undefined
  start(id: string): void
  finishTimer(id: string): void
}

const useStudySessionStore = create<StudySessionStore>((set, get) => ({
  sessions: [],
  create(ss) {
    set((store) => ({
      sessions: store.sessions.concat({
        ...ss,
        taskDuration: ss.taskDuration * 60,
        breakDuration: ss.breakDuration * 60,
        next: 'task'
      })
    }))
  },
  find(id) {
    return get().sessions.find((s) => s.id === id)
  },
  start(id) {
    const session = get().find(id)

    if (session)
      set((store) => ({
        sessions: store.sessions
          .filter((s) => s.id !== id)
          .concat({
            ...session,
            next: 'task',
            current: 1
          })
      }))
  },
  finishTimer(id) {
    const session = get().find(id)

    if (session && session.current != undefined) {
      if (session.current < 4) {
        set((store) => ({
          sessions: store.sessions
            .filter((s) => s.id !== id)
            .concat({
              ...session,
              next: invertTimerType(session.next),
              current:
                session.next === 'break'
                  ? (session.current || 0) + 1
                  : session.current
            })
        }))
      } else {
        set((store) => ({
          sessions: store.sessions
            .filter((s) => s.id !== id)
            .concat({
              ...session,
              next: null,
              completed: true
            })
        }))
      }
    }
  }
}))

const invertTimerType = (type: 'break' | 'task' | null = null) =>
  type === 'break' ? 'task' : 'break'

export default useStudySessionStore
