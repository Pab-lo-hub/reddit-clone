import timeago from 'lib/timeago'
import { useState } from 'react'
import NewComment from 'components/NewComment'

const Comment = ({ comment }) => {
  const [showReply, setShowReply] = useState(false)

  return (
    <div className=' mt-6'>
      <p>
        {comment.author.name} {timeago.format(new Date(comment.createdAt))}
      </p>
      <p>{comment.content}</p>
      {showReply ? (
        <div className='pl-10'>
          <NewComment comment={comment} post={post} />
        </div>
      ) : (
        <p
          className='underline text-sm cursor-pointer'
          onClick={() => setShowReply(true)}
        >
          reply
        </p>
      )}
      <p
        className='underline text-sm cursor-pointer'
        onClick={() => setShowReply(true)}
      >
        reply
      </p>
    </div>
  )
}

export default function Comments({ comments, post }) {
  if (!comments) return null

  return (
    <>
      {comments.map((comment, index) => (
        <div key={index}>
          <Comment key={index} comment={comment} post={post} />
          {comment.comments && (
            <div className='pl-10'>
              <Comments comments={comment.comments} post={post} />
            </div>
          )}
        </div>
      ))}
    </>
  )
}