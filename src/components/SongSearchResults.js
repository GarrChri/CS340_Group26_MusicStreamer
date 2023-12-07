import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function SongSearchResults () {
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = location.state.searchQuery;
    const [songs, setSongs] = useState([]);
    
    // fetch song(s) based on search query
    const loadSongs = async () => {

        const response = await fetch(`${API_ENDPOINT}/api/songs?searchSong=${searchQuery}`);
        const data = await response.json();
        console.log(data)
        setSongs(data);
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
            <h2>Search results for "{searchQuery}"</h2>
            <table className="table">
                <thead>
                    <tr className="table-rows">
                    <th>Song Name</th>
                    <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song) => (
                        <tr className="table-rows">
                            <td>{song.song_name}</td>
                            <td>{song.artist_name}</td>
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
        </div>
        
    );
}

export default SongSearchResults;