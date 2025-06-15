import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import useUser from "@/hooks/useUser"

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const user = useUser()

  // user가 undefined인 경우 → 로딩 중
  if (user === undefined) {
    return <p>Loading...</p>  // 또는 spinner
  }

  // 로그인 안 된 경우 → alert 띄우고 리디렉션 또는 메시지
  if (!user) {
    return (
      <div className="container">
        <p style={{ color: 'red' }}>로그인 후 글을 작성할 수 있습니다.</p>
        <Link href="/">← 홈으로</Link>
      </div>
    )
  }

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
        createdAt: serverTimestamp(),
        author: {
          uid: user.uid,
          name: user.displayName || "Anonymous",
          photoURL: user.photoURL || null
        }
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