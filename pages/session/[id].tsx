import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
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
            <div className="p-3 border-b flex items-center justify-between">
              <h2 className="font-medium">notes</h2>
              <button className='text-gray-500 inline-flex w-8 h-8 items-center justify-center hover:bg-gray-100 rounded-full'>
                <PlusIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
              no notes
            </div>
          </div>
          <div className="flex-1"></div>
        </Layout>
      </>
    )
  )
}
