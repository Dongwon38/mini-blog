import AuthButton from '@/components/AuthButton'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Dongwon's Room</title>
        <meta name="description" content="Developer and creator. Welcome to my minimal portfolio and blog." />
        <meta property="og:title" content="Dongwon Kang – Portfolio" />
        {/* 썸네일 이미지 */}
        <meta property="og:image" content="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg" />
        <meta property="og:description" content="Developer and creator. Welcome to my minimal portfolio and blog." />
      </Head>

      <div className="container">
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <AuthButton />
        </nav>

        <main>
          <h1 className="title">Your Name</h1>
          <p className="subtitle">
            Software developer, designer, and writer based in Your City.
          </p>
          
          <p>
            Welcome to my personal space on the internet. I write about technology, 
            design, and life. Currently working on interesting projects and always 
            learning something new.
          </p>

          <div className="social-links">
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:your.email@example.com">
              Email
            </a>
          </div>
        </main>
      </div>
    </>
  )
}