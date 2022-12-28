import create from 'zustand'

export type StudySession = {
  id: string
  name: string
  description?: string
  taskDuration: number
  breakDuration: number
}

interface StudySessionStore {
  sessions: StudySession[]
  create(ss: StudySession): void
  find(id: string): StudySession | undefined
}

const useStudySessionStore = create<StudySessionStore>((set, get) => ({
  sessions: [],
  create(ss) {
    set((store) => ({
      ...store,
      sessions: store.sessions.concat(ss)
    }))
  },
  find(id) {
    return get().sessions.find(s => s.id === id)
  }
}))

export default useStudySessionStore
