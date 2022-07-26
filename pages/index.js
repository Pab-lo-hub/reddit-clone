import Head from 'next/head'
import Prisma from 'lib/prisma'
import { getPosts } from 'lib/data'
import Posts from 'components/posts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home({ posts }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const loading = status === 'loading'

  if (loading) {
    return null
  }

  if (session && !session.user.name) {
    router.push('/setup')
  }

  return (
    <div>
      <Head>
        <title></title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
        <p>Reddit clone</p>
        <p className='grow'></p>
        <a
          className='flex-l border px-4 font-bold rounded-full mb-1'
          href={session ? '/api/auth/signout' : '/api/auth/signin'}
        >
          {session ? 'logout' : 'login'}
        </a>
      </header>

      <Posts posts={posts} />
    </div>
  )
}

export async function getServerSideProps() {
  let posts = await getPosts(Prisma)
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts,
    },
  }
}