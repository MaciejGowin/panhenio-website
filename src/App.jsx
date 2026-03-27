import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Categories from './components/Categories/Categories'
import Recommendations from './components/Recommendations/Recommendations'
import Illustration from './components/Illustration/Illustration'
import Footer from './components/Footer/Footer'
import OProjekcie from './components/OProjekcie/OProjekcie'
import PolitykaPrywatnosci from './components/PolitykaPrywatnosci/PolitykaPrywatnosci'
import CyfrowyHenio from './components/CyfrowyHenio/CyfrowyHenio'
import EventPage from './components/EventPage/EventPage'
import SearchPage from './components/SearchPage/SearchPage'
import styles from './App.module.css'

function getPage() {
  const hash = window.location.hash
  if (hash === '#o-projekcie') return { name: 'o-projekcie' }
  if (hash === '#polityka-prywatnosci') return { name: 'polityka-prywatnosci' }
  if (hash === '#cyfrowy-henio') return { name: 'cyfrowy-henio' }
  const eventMatch = hash.match(/^#wydarzenie\/([^/]+)\/([^?]+)(?:\?(.*))?$/)
  if (eventMatch) {
    const params = new URLSearchParams(eventMatch[3] || '')
    return { name: 'wydarzenie', sourceId: eventMatch[1], eventId: eventMatch[2], backHref: params.get('back') || '#szukaj' }
  }
  if (hash === '#szukaj' || hash.startsWith('#szukaj?')) {
    const qs = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : ''
    const params = new URLSearchParams(qs)
    return {
      name: 'szukaj',
      phrase: params.get('phrase') || '',
      cityId: params.get('cityId') || '',
      categoryId: params.get('categoryId') || '',
    }
  }
  return { name: 'home' }
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
      {page.name === 'o-projekcie' ? (
        <OProjekcie />
      ) : page.name === 'polityka-prywatnosci' ? (
        <PolitykaPrywatnosci />
      ) : page.name === 'cyfrowy-henio' ? (
        <CyfrowyHenio />
      ) : page.name === 'wydarzenie' ? (
        <EventPage sourceId={page.sourceId} eventId={page.eventId} backHref={page.backHref} />
      ) : page.name === 'szukaj' ? (
        <SearchPage key={page.phrase + page.cityId + page.categoryId} initialPhrase={page.phrase} initialCityId={page.cityId} initialCategoryId={page.categoryId} />
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
