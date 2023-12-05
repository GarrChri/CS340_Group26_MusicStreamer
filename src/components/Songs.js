import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Select from "react-select";
import NavBar from "./NavBar";


// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;


// Creates the songs table
function Songs() {

  // Setting variables and state
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState("");
  const [singleSongName, setSingleSongName] = useState("");
  const [releaseID, setReleaseID] = useState("");
  const [genreID, setGenreID] = useState("");

  // Function to retrieve songs
  const loadSongs = async () => {

      const response = await fetch(`${API_ENDPOINT}/api/songs`);
      const data = await response.json();
      console.log(data)
      setSongs(data);
  }

  // Function to retrieve a single song
  const loadSingleSong = async (song_id) => {

    const response = await fetch(`${API_ENDPOINT}/api/songs/${song_id}`);
    const data = await response.json();
    setSongs(data);
}

  // function to create a new song
  const createSong = async () => {
      const newSong = {songName, releaseID, genreID}

      const response = await fetch(`${API_ENDPOINT}/api/songs`, {
          method: "POST",
          body: JSON.stringify(newSong),
          headers: {
              "content-type": "application/json"
          }
      });

      if (response.status === 200) {
          alert(`Added new song: ${songName}`);
          loadSongs();
      } else {
          alert("New song not added. Check required fields");
      }
  }

  const deleteSong = async (song_id, song_name) => {
      const response = await fetch(`${API_ENDPOINT}/api/songs/${song_id}`, {
          method: "DELETE"});

      if (response.status === 200){
          alert(`Deleted ${song_name}`);
          loadSongs();
      } else {
          alert("Song not deleted");
      }
  }

  function confirmDelete (song_id, song_name) {
    if (window.confirm(`Are you sure you want to delete ${song_name}?`)){
        deleteSong(song_id, song_name)
} 
}

  const editSong = (song) => {     
      // navigate to edit page, sending state props to the edit page/component 
      navigate("/editSong", { state: { songToEdit: song }});
  }

  useEffect(() => {
      loadSongs();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <h2>Songs</h2>
      <table className="table">
        <thead>
          <tr className="table-rows">
            <th>ID</th>
            <th>Song</th>
            <th>Release ID</th>
            <th>Genre ID</th>
            <th>Stream Count</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr className="table-rows">
              <td>{song.song_id}</td>
              <td>{song.song_name}</td>
              <td>{song.release_id}</td>
              <td>{song.genre_id}</td>
              <td>{song.stream_count}</td>
              <td className="table-button">
                  <button 
                      onClick={() => editSong(song)}
                      >Edit</button>
              </td>
              <td className="table-button">
                  <button
                      onClick={() => confirmDelete(song.song_id, song.song_name)}
                      >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Search for a Song</h4>

      <form action="" className="search-form">
        <Select
          className="select song-select"
          placeholder=""
          options={songs}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null
          }}
          isClearable
          isSearchable
        />
        <button className="search-button">Search</button>
      </form>

      <h4 className="form-create-title">Add a new Song</h4>
      <form className="form-create" action="">
        <label for="songName">Song: </label>
        <input 
          name="songName"
          type="text" 
          id="song-name" 
          className="form-create-input" 
          onChange={e => setSongName(e.target.value)}
        />
        <label for="releaseID">Release ID: </label>
        <input 
          name="releaseID"
          type="text" 
          id="release-id" 
          className="form-create-input" 
          onChange={e => setReleaseID(e.target.value)}
        />
        <label for="genreID">Genre ID: </label>
        <input 
          name="genreID"
          type="text" 
          id="genreID" 
          className="form-create-input" 
          onChange={e => setGenreID(e.target.value)}
        />
        <button type="button" onClick = {() => createSong()}>Add</button>
      </form>
    </div>
  );
}

export default Songs;