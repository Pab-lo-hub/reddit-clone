import Link from 'next/link'
import Prisma from 'lib/prisma'
import { getUser, getPostsFromUser } from 'lib/data.js'
import Posts from 'components/posts'

export default function Profile({ user, posts }) {
  if (!user) return <p className='text-center p-5'>User does not exist 😞</p>
  return (
    <>
      <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
        <Link href={`/`}>
          <a className='underline'>Home</a>
        </Link>
        <p className='grow'></p>
      </header>
      <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
        <p className='text-center'>/u/{user.name}</p>
      </header>
      <Posts posts={posts} />
    </>
  )
}

export async function getServerSideProps({ params }) {
  let user = await getUser(params.name, Prisma)
	user = JSON.parse(JSON.stringify(user))

  let posts = await getPostsFromUser(params.name, Prisma)
	posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      user,
      posts,
    },
  }
}