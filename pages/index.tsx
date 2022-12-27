import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>wooden</title>
        <meta name="description" content="description for wooden" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-50 text-orange-400">
        <h1>hello wooden!</h1>
      </main>
    </>
  )
}
