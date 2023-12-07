import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Artists from './components/Artists';
import ArtistPage from './components/ArtistPage';
import EditArtist from './components/EditArtist';
import Releases from './components/Releases';
import EditRelease from './components/EditRelease';
import ReleaseTypes from './components/ReleaseTypes';
import EditReleaseType from './components/EditReleaseType';
import Songs from './components/Songs';
import SongSearchResults from './components/SongSearchResults';
import EditSong from './components/EditSong';
import Genres from './components/Genres';
import EditGenre from './components/EditGenre';
import Users from './components/Users';
import EditUser from './components/EditUser';
import Playlists from './components/Playlists';
import EditPlaylist from './components/EditPlaylist';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/editUser" element={<EditUser />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/editPlaylist" element={<EditPlaylist />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artistPage" element={<ArtistPage />} />
          <Route path="/editArtist" element={<EditArtist />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/songSearchResults" element={<SongSearchResults />} />
          <Route path="/editSong" element={<EditSong />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/editRelease" element={<EditRelease />} />
          <Route path="/releasetypes" element={<ReleaseTypes />} />
          <Route path="/editReleaseType" element={<EditReleaseType />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/editGenre" element={<EditGenre />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;