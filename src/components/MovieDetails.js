import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './MovieDetails.css'

const API_KEY = '6ccac5f4b2b012c3355e67301bd7a131'
const IMG_BASE_LARGE = 'https://image.tmdb.org/t/p/w500'
const IMG_BASE_SMALL = 'https://image.tmdb.org/t/p/w185'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    movieData: null,
    castList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {id} = match.params
    try {
      const [movieResponse, castResponse] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
        ),
      ])
      if (movieResponse.ok && castResponse.ok) {
        const movieData = await movieResponse.json()
        const castJson = await castResponse.json()
        this.setState({
          movieData,
          castList: castJson.cast || [],
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  formatRuntime = mins => {
    if (!mins) return 'N/A'
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#032541" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We are having some trouble completing your request. Please try again.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {movieData, castList} = this.state
    const {
      title,
      poster_path: posterPath,
      backdrop_path: backdropPath,
      vote_average: voteAverage,
      runtime,
      genres,
      release_date: releaseDate,
      overview,
    } = movieData

    const posterUrl = posterPath
      ? `${IMG_BASE_LARGE}${posterPath}`
      : 'https://via.placeholder.com/500x750?text=No+Image'

    const backdropUrl = backdropPath
      ? `https://image.tmdb.org/t/p/w1280${backdropPath}`
      : null

    const rating = voteAverage ? voteAverage.toFixed(1) : 'N/A'
    const releaseYear = releaseDate ? releaseDate.split('-')[0] : 'N/A'
    const genreNames = genres ? genres.map(g => g.name).join(', ') : 'N/A'

    return (
      <>
        {backdropUrl && (
          <div
            className="backdrop"
            style={{backgroundImage: `url(${backdropUrl})`}}
          />
        )}
        <div className="details-content">
          <section className="movie-details-section">
            <div className="movie-poster-wrap">
              <img src={posterUrl} alt={title} className="detail-poster" />
            </div>
            <div className="movie-info">
              <h1 className="detail-title">{title}</h1>
              <div className="meta-row">
                <span className="meta-badge rating-badge-detail">
                  ⭐ {rating}
                </span>
                <span className="meta-badge">{releaseYear}</span>
                <span className="meta-badge">
                  {this.formatRuntime(runtime)}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Genre</span>
                <span className="info-value">{genreNames}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Release Date</span>
                <span className="info-value">{releaseDate || 'N/A'}</span>
              </div>
              <div className="overview-section">
                <h3 className="overview-label">Overview</h3>
                <p className="overview-text">
                  {overview || 'No overview available.'}
                </p>
              </div>
            </div>
          </section>

          {castList.length > 0 && (
            <section className="cast-section">
              <h2 className="cast-heading">Cast</h2>
              <ul className="cast-grid">
                {castList.slice(0, 20).map(member => {
                  const castImg = member.profile_path
                    ? `${IMG_BASE_SMALL}${member.profile_path}`
                    : 'https://via.placeholder.com/185x278?text=N/A'
                  return (
                    <li
                      key={
                        member.cast_id !== undefined
                          ? member.cast_id
                          : member.id
                      }
                      className="cast-card"
                    >
                      <img
                        src={castImg}
                        alt={member.name}
                        className="cast-photo"
                      />
                      <div className="cast-info">
                        <p className="cast-name">{member.name}</p>
                        <p className="cast-character">{member.character}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </div>
      </>
    )
  }

  renderMovieDetails = () => {
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
    return <div className="details-page">{this.renderMovieDetails()}</div>
  }
}

export default MovieDetails
