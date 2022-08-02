import Head from 'next/head'
import { getPosts } from 'lib/data.js'
import prisma from 'lib/prisma'
import timeago from 'lib/timeago'

const Post = ({ post }) => {
  return (
    <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 mx-20 my-10'>
      <div className='flex flex-shrink-0 pb-0 '>
        <div className='flex-shrink-0 block group '>
          <div className='flex items-center text-gray-800'>
            /r/{post.subredditName} Posted by {post.author.name}{' '}
            {timeago.format(new Date(post.createdAt))}
          </div>
        </div>
      </div>
      <div className='mt-5'>
				<p className='flex-shrink text-2xl font-bold color-primary width-auto'>          
					{post.title}
        </p>
				<p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
          {post.content}
        </p>
      </div>
    </div>
  )
}

const Posts = ({ posts }) => {
  if (!posts) return null

  return (
    <>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </>
  )
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Reddit Clone</title>
        <meta name='description' content='A great social network!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
        <p>Reddit clone</p>
        <p className='grow'></p>
        <a
          className='flex-l border px-4 font-bold rounded-full mb-1'
          href='/api/auth/signin'
        >
          login
        </a>
      </header>
      
      <Posts posts={posts} />
    </div>
  )
}

export async function getServerSideProps() {
  let posts = await getPosts(prisma)
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts: posts,
    },
  }
}