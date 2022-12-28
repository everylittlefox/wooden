import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { v4 } from 'uuid'
import Button from '../components/Button'
import Layout from '../components/Layout'
import TextInput from '../components/TextInput'
import useStudySessionStore from '../stores/studySessionStore'

export default function Home() {
  const router = useRouter()
  const createSession = useStudySessionStore((s) => s.create)
  const [name, setName] = useState('')
  const [taskDuration, setTaskDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [description, setDescription] = useState('')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const id = v4()
    createSession({ id, name: name, taskDuration, breakDuration, description })
    router.push('/session/' + id)
  }

  return (
    <>
      <Head>
        <title>wooden</title>
      </Head>
      <Layout>
        <div className="max-w-2xl mx-auto my-16 border rounded p-4">
          <h1 className="text-lg mb-4 font-medium">new study session</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="mb-3">
                <label className="mb-2 block">name</label>
                <TextInput name="name" value={name} onChange={setName} />
              </div>
              <div className="mb-3">
                <label className="mb-2 block">description (optional)</label>
                <TextInput
                  name="description"
                  value={description}
                  onChange={setDescription}
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block">task duration (mins)</label>
                <TextInput<number>
                  name="taskDuration"
                  min={10}
                  max={30}
                  onChange={setTaskDuration}
                  value={taskDuration}
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block">break duration (mins)</label>
                <TextInput<number>
                  name="breakDuration"
                  min={0}
                  max={15}
                  onChange={setBreakDuration}
                  value={breakDuration}
                />
              </div>
            </div>

            <div className="flex">
              <Button className="ml-auto">create</Button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  )
}
