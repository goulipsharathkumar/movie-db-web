import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from './MovieCard'
import Pagination from './Pagination'
import './MovieGrid.css'

const API_KEY = '6ccac5f4b2b012c3355e67301bd7a131'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieGrid extends Component {
  state = {
    moviesList: [],
    currentPage: 1,
    totalPages: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovies(1)
  }

  componentDidUpdate(prevProps) {
    const {apiPath, query} = this.props
    if (prevProps.apiPath !== apiPath || prevProps.query !== query) {
      this.getMovies(1)
    }
  }

  getMovies = async page => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {apiPath, query} = this.props
    try {
      let url = ''
      if (query) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query,
        )}&page=${page}`
      } else {
        url = `https://api.themoviedb.org/3/movie/${apiPath}?api_key=${API_KEY}&language=en-US&page=${page}`
      }
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          moviesList: data.results || [],
          totalPages: Math.min(data.total_pages || 1, 500),
          currentPage: page,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onPageChange = page => {
    this.getMovies(page)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#032541" height={50} width={50} />
    </div>
  )

  renderFailureView = () => {
    const {currentPage} = this.state
    return (
      <div className="failure-container">
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-desc">
          We are having some trouble completing your request. Please try again.
        </p>
        <button
          type="button"
          className="retry-btn"
          onClick={() => this.getMovies(currentPage)}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {moviesList, currentPage, totalPages} = this.state
    if (moviesList.length === 0) {
      return (
        <div className="no-results-container">
          <h2 className="no-results-text">No movies found</h2>
        </div>
      )
    }
    return (
      <>
        <ul className="movies-grid">
          {moviesList.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.onPageChange}
        />
      </>
    )
  }

  renderMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {heading} = this.props
    return (
      <div className="page-content">
        <h1 className="page-heading">{heading}</h1>
        {this.renderMovies()}
      </div>
    )
  }
}

export default MovieGrid
