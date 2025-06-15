import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  createdAt: any
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[]
        setPosts(postsData)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <Head>
        <title>Blog - Your Name</title>
        <meta name="description" content="Personal blog posts" />
      </Head>

      <div className="container">
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/blog/new">New Post</Link>
        </nav>

        <main>
          <h1 className="title">Blog</h1>
          
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p>No posts yet. <Link href="/blog/new">Write your first post</Link>.</p>
          ) : (
            <ul className="post-list">
              {posts.map((post) => (
                <li key={post.id} className="post-item">
                  <h2 className="post-title">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <div className="post-date">
                    {formatDate(post.createdAt)}
                  </div>
                  <p className="post-excerpt">{post.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  )
}