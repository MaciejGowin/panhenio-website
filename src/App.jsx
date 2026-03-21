import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Categories from './components/Categories/Categories'
import Recommendations from './components/Recommendations/Recommendations'
import Illustration from './components/Illustration/Illustration'
import Footer from './components/Footer/Footer'
import OProjekcie from './components/OProjekcie/OProjekcie'
import styles from './App.module.css'

function getPage() {
  return window.location.hash === '#o-projekcie' ? 'o-projekcie' : 'home'
}

export default function App() {
  const [page, setPage] = useState(getPage)

  useEffect(() => {
    const handler = () => setPage(getPage())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return (
    <div className={styles.app}>
      <Navbar />
      {page === 'o-projekcie' ? (
        <OProjekcie />
      ) : (
        <main className={styles.main}>
          <Hero />
          <Categories />
          <Recommendations />
          <Illustration />
        </main>
      )}
      <Footer />
    </div>
  )
}
