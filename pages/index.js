import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Posts from '@/components/posts'
import Coffees from '@/components/coffees'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Takehome Challenge</title>
        <meta name="description" content="App Academy Mock Takehome Challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <div className={styles.container}>
          <div className={styles.main}>
            <Posts />
          </div>
          <div className={styles.right}>
            <Coffees />
          </div>
        </div>
      </main>
    </>
  )
}
