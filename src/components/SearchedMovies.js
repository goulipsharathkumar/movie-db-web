import MovieGrid from './MovieGrid'

const SearchedMovies = ({location}) => {
  const params = new URLSearchParams(location.search)
  const query = params.get('query') || ''

  return (
    <MovieGrid
      key={query}
      heading={`Search Results for "${query}"`}
      query={query}
    />
  )
}

export default SearchedMovies
