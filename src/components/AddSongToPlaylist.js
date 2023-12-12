/* AddSongToPlaylist.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Select from "react-select";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

function AddSongToPlaylist() {
    // Setting variables and state
    const location = useLocation();
    const navigate = useNavigate();
    const song = location.state.song;
    const songID = song.song_id;
    const [playlistMap, setPlaylistMap] = useState([]);
    const [playlistID, setPlaylistID] = useState();
    const [playlist, setPlaylist] = useState();

    // Function to retreive playlists
    const loadPlaylists = async () => {
        const response = await fetch(`${API_ENDPOINT}/api/playlists`);
        const data = await response.json();

        await setPlaylistMap(
            data.map((playlist) => ({
                value: playlist,
                label: playlist.playlist_name,
            }))
        );
    };

    // Function to add songs to selected playlist
    const addToPlaylist = async () => {
        const newPlaylistSong = { playlistID, songID };

        const response = await fetch(`${API_ENDPOINT}/api/playlistSongs`, {
            method: "POST",
            body: JSON.stringify(newPlaylistSong),
            headers: {
                "content-type": "application/json",
            },
        });

        if (response.status === 200) {
            alert(`Added song to playlist`);
            navigate("/viewPlaylist", { state: { playlistToView: playlist } });
        } else {
            alert("New song not added.");
        }
    };

    // Updating state variables with new data
    const handleChange = (playlist) => {
        setPlaylistID(playlist.playlist_id);
        setPlaylist(playlist);
    };

    // Refreshes the playlist table when data changes
    useEffect(() => {
        loadPlaylists();
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <h2>Edit</h2>
            <div className="form-edit-container">
                <form className="form-edit" action="">
                    <h4 className="form-title">
                        Add Song "{song.song_name}" to a Playlist
                    </h4>
                    <label for="playlistID">Choose a Playlist:</label>
                    <Select
                        name="playlistID"
                        id="playlist-id"
                        className="select"
                        options={playlistMap}
                        onChange={(selected) => handleChange(selected.value)}
                    />
                </form>
                <div className="edit-button-container">
                    <button
                        type="button"
                        className="delete-button form-edit-button"
                        onClick={() => navigate("../songs")}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="add-button form-edit-button"
                        onClick={() => addToPlaylist()}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddSongToPlaylist;
