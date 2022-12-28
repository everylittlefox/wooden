import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import Layout from '../../components/Layout'
import NoteIcon from '../../components/NoteIcon'
import PlusIcon from '../../components/PlusIcon'
import Stepper from '../../components/Stepper'
import Timer from '../../components/Timer'
import useStudySessionStore from '../../stores/studySessionStore'

export default function Set() {
  const router = useRouter()
  const findSession = useStudySessionStore((sss) => sss.find)
  const id = router.query.id as string
  const session = findSession(id)

  useEffect(() => {
    if (!session) {
      router.replace('/')
    }
  }, [session, router])

  return (
    session && (
      <>
        <Head>
          <title>{session.name}</title>
        </Head>
        <Layout className="flex">
          <div className="border-r flex flex-col w-1/3">
            <div className="py-3 px-8 flex">
              <button className="ml-auto text-gray-500 inline-flex w-8 h-8 items-center justify-center hover:bg-teal-50 rounded-full">
                <PlusIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
              <NoteIcon className="w-36 h-36 text-gray-300" />
              <p className="text-sm text-gray-500 mt-3">no notes</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="px-8 py-3">
              <h1 className="text-2xl">{session.name}</h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <Stepper className="mb-24" steps={4} />
              <Timer seconds={session.taskDuration} type="task" />
            </div>
          </div>
        </Layout>
      </>
    )
  )
}
