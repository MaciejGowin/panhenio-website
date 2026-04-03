import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './globals.css'
import styles from './layout.module.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font',
})

export const metadata = {
  metadataBase: new URL('https://www.panhenio.pl'),
  title: 'Pan Henio – wydarzenia dla seniorów',
  description: 'Pan Henio – znajdź spacery, warsztaty, spotkania i inne wydarzenia dla seniorów we Wrocławiu i innych miastach Polski.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://www.panhenio.pl',
    title: 'Pan Henio – wydarzenia dla seniorów',
    description: 'Znajdź spacery, warsztaty, spotkania i inne wydarzenia dla seniorów we Wrocławiu i innych miastach Polski.',
    images: ['/panhenio-banner.png'],
    locale: 'pl_PL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pan Henio – wydarzenia dla seniorów',
    description: 'Znajdź spacery, warsztaty, spotkania i inne wydarzenia dla seniorów we Wrocławiu i innych miastach Polski.',
    images: ['/panhenio-banner.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={inter.variable}>
      <body>
        <div className={styles.wrapper}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
