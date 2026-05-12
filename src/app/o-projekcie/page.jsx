import OProjekcie from '../../components/OProjekcie/OProjekcie'

const BASE_URL = 'https://www.panhenio.pl'

export const metadata = {
  title: 'O projekcie – Pan Henio',
  description: 'Pan Henio to projekt stworzony z myślą o seniorach, którzy chcą aktywnie spędzać czas i odkrywać ciekawe wydarzenia w swoim mieście.',
  alternates: { canonical: `${BASE_URL}/o-projekcie` },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${BASE_URL}/o-projekcie`,
  name: 'O projekcie – Pan Henio',
  description: 'Pan Henio to projekt stworzony z myślą o seniorach, którzy chcą aktywnie spędzać czas i odkrywać ciekawe wydarzenia w swoim mieście.',
}

export default function OProjekciePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OProjekcie />
    </>
  )
}
