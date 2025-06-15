import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import useUser from '@/hooks/useUser'
import ReactMarkdown from 'react-markdown'

interface Post {
  id: string
  title: string
  content: string
  createdAt: any
  author: {
    uid: string
    name?: string
    photoURL?: string | null
  }
}

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const user = useUser()
  const isAuthor = user && post?.author?.uid === user.uid



  useEffect(() => {
    if (!id) return

    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id as string)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const postData = { id: docSnap.id, ...docSnap.data() } as Post
          setPost(postData)
          setEditTitle(postData.title)
          setEditContent(postData.content)
        } else {
          router.push('/blog')
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        router.push('/blog')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, router])

  const handleSave = async () => {
    if (!post || !editTitle.trim() || !editContent.trim()) return

    setSaving(true)
    try {
      const excerpt = editContent.substring(0, 150) + (editContent.length > 150 ? '...' : '')
      
      await updateDoc(doc(db, 'posts', post.id), {
        title: editTitle.trim(),
        content: editContent.trim(),
        excerpt
      })

      setPost({
        ...post,
        title: editTitle.trim(),
        content: editContent.trim()
      })
      setEditing(false)
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Error updating post. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!post || !confirm('Are you sure you want to delete this post?')) return

    try {
      await deleteDoc(doc(db, 'posts', post.id))
      router.push('/blog')
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post. Please try again.')
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container">
        <p>Post not found.</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} - Blog</title>
        <meta name="description" content={post.content.slice(0, 100)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.slice(0, 100)} />
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
          {editing ? (
            <div className="form">
              <div className="form-group">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '2rem', fontWeight: '600' }}
                />
              </div>
              <div className="form-group">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '300px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleSave} disabled={saving} className="btn">
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => setEditing(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h1 className="title">{post.title}</h1>
                  <div className="post-date">
                    {formatDate(post.createdAt)}
                  </div>
                </div>
                {isAuthor && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setEditing(true)} className="btn btn-secondary">
                      Edit
                    </button>
                    <button onClick={handleDelete} className="btn btn-secondary">
                      Delete
                    </button>
                  </div>
                )}
              </div>
              
              <div className="post-content">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}