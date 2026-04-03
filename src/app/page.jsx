import Hero from '../components/Hero/Hero'
import Categories from '../components/Categories/Categories'
import Recommendations from '../components/Recommendations/Recommendations'
import Illustration from '../components/Illustration/Illustration'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Hero />
      <Categories />
      <Recommendations />
      <Illustration />
    </main>
  )
}
