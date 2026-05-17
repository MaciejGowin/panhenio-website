import Faq, { faqSchema } from '../../components/Faq/Faq'

const BASE_URL = 'https://www.panhenio.pl'

export const metadata = {
  title: 'Często zadawane pytania – Pan Henio',
  description: 'Odpowiedzi na najczęstsze pytania dotyczące serwisu Pan Henio – skąd pochodzi oferta, jak często jest aktualizowana, dla kogo są wydarzenia i jak się zapisać.',
  alternates: { canonical: `${BASE_URL}/czesto-zadawane-pytania` },
}

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Faq />
    </>
  )
}
