import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Artists from './components/Artists';
import Releases from './components/Releases';
import ReleaseTypes from './components/ReleaseTypes';
import Songs from './components/Songs';
import SongArtists from './components/SongArtists';
import Genres from './components/Genres';
import Users from './components/Users';
import Playlists from './components/Playlists';
import PlaylistSongs from './components/PlaylistSongs';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/releasetypes" element={<ReleaseTypes />} />
          <Route path="/genres" element={<Genres />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
