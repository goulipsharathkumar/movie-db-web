import {Link} from 'react-router-dom'
import './MovieCard.css'

const IMG_BASE = 'https://image.tmdb.org/t/p/w300'

const MovieCard = ({movieDetails}) => {
  const {
    id,
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
          <Link to={`/movies/${id}`} className="view-details-btn">
            View Details
          </Link>
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

export default MovieCard
