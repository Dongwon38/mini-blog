import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setLoading(true)
    try {
      const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '')
      
      await addDoc(collection(db, 'posts'), {
        title: title.trim(),
        content: content.trim(),
        excerpt,
        createdAt: serverTimestamp()
      })

      router.push('/blog')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>New Post - Blog</title>
      </Head>

      <div className="container">
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </nav>

        <Link href="/blog" className="back-link">
          ← Back to Blog
        </Link>

        <main>
          <h1 className="title">New Post</h1>
          
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-textarea"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn">
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </form>
        </main>
      </div>
    </>
  )
}