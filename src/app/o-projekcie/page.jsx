import OProjekcie from '../../components/OProjekcie/OProjekcie'

const BASE_URL = 'https://www.panhenio.pl'

export const metadata = {
  title: 'O projekcie Pan Henio – bezpłatny serwis wydarzeń dla seniorów',
  description: 'Pan Henio to bezpłatny serwis pomagający seniorom znajdować warsztaty, spacery i spotkania w swoim mieście. Poznaj naszą misję.',
  alternates: { canonical: `${BASE_URL}/o-projekcie` },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${BASE_URL}/o-projekcie`,
  name: 'O projekcie – Pan Henio',
  description: 'Pan Henio to bezpłatny serwis pomagający seniorom znajdować warsztaty, spacery i spotkania w swoim mieście. Poznaj naszą misję.',
}

export default function OProjekciePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OProjekcie />
    </>
  )
}
