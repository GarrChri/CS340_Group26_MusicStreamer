import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function ViewPlaylist () {

    const navigate = useNavigate();
    const location = useLocation();
    const playlistToView = location.state.playlistToView;

    const [playlist, setPlaylist] = useState("");
    const [playlistID, setPlaylistID] = useState(playlistToView.playlist_id);
    const [playlistName, setPlaylistName] = useState(playlistToView.playlist_name);

    const loadPlaylist = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/playlistSongs?playlistID=${playlistID}`);
        const data = await response.json();
        setPlaylist(data);
        console.log(data)
    }

    const navigateBack = () => {
        navigate('/playlists')            
    }
    
    useEffect(() => {
        loadPlaylist();
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <h2>{playlistName}</h2>
      <table className="table">
        <thead>
          <tr className="table-rows">
            <th>Song</th>
          </tr>
        </thead>
        <tbody>
          {playlist && playlist.map((song) => (
            <tr className="table-rows">
              <td>{song.song_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button 
        className="playlist-back-button"
        onClick={navigateBack}
        >Back to Playlists</button>
      </div>
        </div>
    );
}

export default ViewPlaylist;