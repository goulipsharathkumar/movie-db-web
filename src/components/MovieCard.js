import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './MovieCard.css'

const IMG_BASE = 'https://image.tmdb.org/t/p/w300'

class MovieCard extends Component {
  onClickViewDetails = () => {
    const {movieDetails, history} = this.props
    history.push(`/movies/${movieDetails.id}`)
  }

  render() {
    const {movieDetails} = this.props
    const {
      title,
      poster_path: posterPath,
      vote_average: voteAverage,
    } = movieDetails

    const posterUrl = posterPath
      ? `${IMG_BASE}${posterPath}`
      : 'https://via.placeholder.com/300x450?text=No+Image'

    const rating = voteAverage ? voteAverage.toFixed(1) : 'N/A'

    const getRatingClass = r => {
      const num = parseFloat(r)
      if (num >= 7.5) return 'rating-high'
      if (num >= 5) return 'rating-mid'
      return 'rating-low'
    }

    return (
      <li className="movie-card">
        <div className="poster-wrapper">
          <img src={posterUrl} alt={title} className="movie-poster" />
          <div className="poster-overlay">
            <button
              type="button"
              className="view-details-btn"
              onClick={this.onClickViewDetails}
            >
              View Details
            </button>
          </div>
        </div>
        <div className="card-info">
          <h3 className="movie-title">{title}</h3>
          <div className={`rating-badge ${getRatingClass(rating)}`}>
            ⭐ {rating}
          </div>
        </div>
      </li>
    )
  }
}

export default withRouter(MovieCard)
