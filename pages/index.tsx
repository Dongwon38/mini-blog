import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Your Name - Portfolio</title>
        <meta name="description" content="Personal portfolio and blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
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