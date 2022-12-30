import Head from 'next/head'
import shallow from 'zustand/shallow'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import Layout from '../../components/Layout'
import NoteIcon from '../../components/NoteIcon'
import PlusIcon from '../../components/PlusIcon'
import Stepper from '../../components/Stepper'
import Timer from '../../components/Timer'
import useStudySessionStore from '../../stores/studySessionStore'

export default function Set() {
  const router = useRouter()
  const id = router.query.id as string
  const session = useStudySessionStore(
    useCallback((s) => s.find(id), [id]),
    shallow
  )
  const finishTimer = useStudySessionStore((s) => s.finishTimer)
  const startSession = useStudySessionStore((s) => s.start)

  useEffect(() => {
    if (!session) {
      router.replace('/')
    }
  }, [session, router])

  useEffect(() => {
    startSession(id)
  }, [id, startSession])

  return (
    session && (
      <>
        <Head>
          <title>{session.name}</title>
        </Head>
        <Layout className="flex">
          <div className="flex-1 flex flex-col">
            <div className="px-8 py-6">
              <h1 className="text-2xl">{session.name}</h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              {!session.completed ? (
                <>
                  <Stepper
                    className="mb-24"
                    steps={4}
                    current={session.current!}
                  />
                  <Timer
                    onFinish={() => finishTimer(id)}
                    seconds={
                      session.next === 'task'
                        ? session.taskDuration
                        : session.breakDuration
                    }
                    type={session.next!}
                  />
                </>
              ) : (
                <p>
                  Hooray! You have completed{' '}
                  <span className="font-semibold">{session.name}</span>
                </p>
              )}
            </div>
          </div>
          <div className="border-l flex flex-col w-1/3">
            <div className="p-6 flex">
              <button className="ml-auto text-gray-500 inline-flex w-8 h-8 items-center justify-center hover:bg-teal-50 hover:border rounded-full">
                <PlusIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
              <NoteIcon className="w-36 h-36 text-gray-200" />
              <p className="text-sm text-gray-500 mt-3 font-semibold">
                no notes
              </p>
            </div>
          </div>
        </Layout>
      </>
    )
  )
}
