/* ViewPlaylist.js

Citation Information
This file contains all original code written by the app's developers.
*/

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

// Creates the playlsit table
function ViewPlaylist() {
    // Setting variables and state
    const navigate = useNavigate();
    const location = useLocation();
    const playlistToView = location.state.playlistToView;

    const [playlist, setPlaylist] = useState("");
    const [playlistID, setPlaylistID] = useState(playlistToView.playlist_id);
    const [playlistName, setPlaylistName] = useState(
        playlistToView.playlist_name
    );

    // Function to retrieve the playlist
    const loadPlaylist = async () => {
        const response = await fetch(
            `${API_ENDPOINT}/api/playlistSongs?playlistID=${playlistID}`
        );
        const data = await response.json();
        setPlaylist(data);
    };

    // Function to return to the playlist page
    const navigateBack = () => {
        navigate("/playlists");
    };

    // Refreshes the playlist table when data changes
    useEffect(() => {
        loadPlaylist();
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <div className="table-container playlist-view-container">
                <h2 className="table-title">{playlistName}</h2>
                <table className="table">
                    <thead>
                        <tr className="table-heading">
                            <th>Song</th>
                            <th>Artist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlist &&
                            playlist.map((song) => (
                                <tr className="table-rows">
                                    <td>{song.song_name}</td>
                                    <td>{song.artist_name}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button
                    className="playlist-back-button edit-button"
                    onClick={navigateBack}
                >
                    Back to Playlists
                </button>
            </div>
        </div>
    );
}

export default ViewPlaylist;
