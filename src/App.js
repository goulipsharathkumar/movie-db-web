import './App.css'
import {Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import MovieDetails from './components/MovieDetails'
import SearchedMovies from './components/SearchedMovies'

const App = () => (
  <div className="app-container">
    <Navbar />
    <Switch>
      <Route exact path="/" component={PopularMovies} />
      <Route path="/top-rated" component={TopRatedMovies} />
      <Route path="/upcoming" component={UpcomingMovies} />
      <Route path="/movies/:id" component={MovieDetails} />
      <Route path="/search" component={SearchedMovies} />
    </Switch>
  </div>
)

export default App
