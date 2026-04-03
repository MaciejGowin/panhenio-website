import SearchPage from '../../components/SearchPage/SearchPage'

export const metadata = {
  title: 'Szukaj wydarzeń – Pan Henio',
  robots: { index: false, follow: false },
}

export default async function SzukajPage({ searchParams }) {
  const params = await searchParams
  return (
    <SearchPage
      initialPhrase={params.fraza || ''}
      initialCityId={params.miasto || ''}
      initialCategoryId={params.kategoria || ''}
    />
  )
}
