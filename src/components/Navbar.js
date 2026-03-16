import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './Navbar.css'

class Navbar extends Component {
  state = {searchInput: ''}

  onChangeSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  onSearch = () => {
    const {searchInput} = this.state
    const {history} = this.props
    if (searchInput.trim() !== '') {
      history.push(`/search?query=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  onKeyDown = e => {
    if (e.key === 'Enter') this.onSearch()
  }

  render() {
    const {searchInput} = this.state
    const {location} = this.props
    const path = location.pathname

    return (
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <h1 className="brand-heading">movieDB</h1>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${path === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/top-rated"
              className={`nav-link ${path === '/top-rated' ? 'active' : ''}`}
            >
              Top Rated
            </Link>
          </li>
          <li>
            <Link
              to="/upcoming"
              className={`nav-link ${path === '/upcoming' ? 'active' : ''}`}
            >
              Upcoming
            </Link>
          </li>
        </ul>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchInput}
            onChange={this.onChangeSearch}
            onKeyDown={this.onKeyDown}
            className="search-input"
          />
          <button type="button" onClick={this.onSearch} className="search-btn">
            Search
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
