import {Route, Routes} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Components/Landing'
import Login from './Components/Login'; 
import Signup from './Components/Signup';
import Home from './Components/Home'
import Profile from './Components/Profile'
import ExploreMovies from './Components/ExploreMovies'
import ClubCard from './Components/ClubCard';
import About from './Components/About'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Landing/> } /> 
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='dashboard' element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='explore-movies' element={<ExploreMovies />}/> 
        <Route path='movie-clubs' element={<ClubCard/>} /> 
        <Route path='about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;