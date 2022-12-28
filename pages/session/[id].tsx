import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  buildStyles,
  CircularProgressbarWithChildren
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Layout from '../../components/Layout'
import PlayIcon from '../../components/PlayIcon'
import PlusIcon from '../../components/PlusIcon'
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
            <div className="py-3 px-8 border-b flex items-center justify-between">
              <h2 className="font-medium">notes</h2>
              <button className="text-gray-500 inline-flex w-8 h-8 items-center justify-center hover:bg-gray-100 rounded-full">
                <PlusIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
              no notes
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-60">
              <CircularProgressbarWithChildren
                strokeWidth={4}
                styles={buildStyles({
                  trailColor: 'rgb(229 231 235)'
                })}
                value={0}
                maxValue={1}
              >
                {/* <span className='text-4xl font-medium'>23:04</span> */}
                <button className="text-gray-400">
                  <PlayIcon className="w-24 h-24" />
                </button>
              </CircularProgressbarWithChildren>
            </div>
            <div className="ml-48">
              <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                1
              </div>
              <div className="flex items-center justify-center w-10 h-10 border rounded-full before:block before:h-12 before:w-2 before:bg-gray-200 before:absolute relative before:bottom-12 mt-16 before:rounded-full">
                2
              </div>
              <div className="flex items-center justify-center w-10 h-10 border rounded-full before:block before:h-12 before:w-2 before:bg-gray-200 before:absolute relative before:bottom-12 mt-16 before:rounded-full">
                3
              </div>
              <div className="flex items-center justify-center w-10 h-10 border rounded-full before:block before:h-12 before:w-2 before:bg-gray-200 before:absolute relative before:bottom-12 mt-16 before:rounded-full">
                4
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
  )
}
