import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  buildStyles,
  CircularProgressbarWithChildren
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import NoteIcon from '../../components/NoteIcon'
import PlayIcon from '../../components/PlayIcon'
import PlusIcon from '../../components/PlusIcon'
import Stepper from '../../components/Stepper'
import { toHHMMSS } from '../../lib/utils'
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
            <div className="flex-1 flex items-center justify-center">
              <div className="flex">
                <div className="flex flex-col items-center pr-36">
                  <div className="w-60">
                    <CircularProgressbarWithChildren
                      strokeWidth={4}
                      styles={buildStyles({
                        trailColor: 'rgb(229 231 235)'
                      })}
                      value={0}
                      maxValue={1}
                    >
                      <span className="text-5xl text-gray-500">
                        {toHHMMSS(session.taskDuration)}
                      </span>
                    </CircularProgressbarWithChildren>
                  </div>
                  <Button className="mt-auto">
                    <PlayIcon className="w-6 h-6 text-gray-400" />
                  </Button>
                </div>
                <div className="px-10">
                  <Stepper steps={4} current={4} />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
  )
}
