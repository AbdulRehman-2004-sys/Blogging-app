'use client'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Comment = ({ blogId }) => {
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true);

  console.log(blogId)
  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/comments?blogId=${blogId}`);
      const result = await res.json();
      setComments(result);
    } catch (error) {
      toast.error(error?.message || 'Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId])

  // Submit a new comment
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !comment) {
      setMessage('Please fill in all fields')
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: blogId, name, email, comment }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Comment posted successfully!')
        setName('')
        setEmail('')
        setComment('')
        fetchComments() // Refresh comments
      } else {
        toast.error(data.error || '❌ Failed to post comment')
      }
    } catch (err) {
      console.error('Submit error:', err)
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="w-[70%] m-auto mt-10 flex gap-16">
      <div className='w-[100%]'>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="space-y-4">
            {comments?.map((c) => (
              <li key={c._id} className="border-b p-3 rounded">
                <p className="text-[1rem] font-semibold">{c.name}</p>
                <p className="text-[0.9rem] text-gray-500">{c.email}</p>
                <p className="mt-1">{`${c.comment}`}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4 pt-4">
        <h3 className="text-lg font-semibold">Leave a Comment</h3>

        <input
          type="text"
          placeholder="Your name"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Your comment"
          rows={4}
          className="w-full border px-3 py-2 rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Post Comment
        </button>

      </form>
    </div>
  )
}

export default Comment
