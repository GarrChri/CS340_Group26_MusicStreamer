import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import NavBar from "./NavBar";

// Define API URL
const API_ENDPOINT = process.env.REACT_APP_PROXY;

// Creates the song result table
function SongSearchResults() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = location.state.searchQuery;
    const [songs, setSongs] = useState([]);

    // Function to fetch song(s) based on the search query
    const loadSongs = async () => {
        const response = await fetch(
            `${API_ENDPOINT}/api/songs?searchSong=${searchQuery}`
        );
        const data = await response.json();
        setSongs(data);
    };

    // Function to delete a song
    const deleteSong = async (song_id, song_name) => {
        const response = await fetch(`${API_ENDPOINT}/api/songs/${song_id}`, {
            method: "DELETE",
        });

        if (response.status === 200) {
            alert(`Deleted ${song_name}`);
            loadSongs();
        } else {
            alert("Song not deleted");
        }
    };

    // Alert the user to verify correct entry is being deleted
    function confirmDelete(song_id, song_name) {
        if (window.confirm(`Are you sure you want to delete ${song_name}?`)) {
            deleteSong(song_id, song_name);
        }
    }

    // Navigate to the edit page, sending state props to the edit page/component
    const editSong = (song) => {
        navigate("/editSong", { state: { songToEdit: song } });
    };

    // Navigate to the add page, sending state props to the add page/component
    const addToPlaylist = (song) => {
        navigate("/addSongToPlaylist", { state: { song: song } });
    };

    // Function to return to the songs page
    const navigateBack = () => {
        navigate("/songs");
    };

    // Refreshes the songs table when data changes
    useEffect(() => {
        loadSongs();
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <h2>Search results for "{searchQuery}"</h2>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr className="table-heading">
                            <th>ID</th>
                            <th>Song</th>
                            <th>Release Name</th>
                            <th>Genre</th>
                            <th>Stream Count</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song) => (
                            <tr className="table-rows">
                                <td>{song.song_id}</td>
                                <td>{song.song_name}</td>
                                <td>{song.release_name}</td>
                                <td>{song.genre_name}</td>
                                <td>{song.stream_count}</td>
                                <td className="table-button">
                                    <button
                                        className="edit-button"
                                        onClick={() => editSong(song)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="table-button">
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            confirmDelete(
                                                song.song_id,
                                                song.song_name
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="table-button">
                                    <button
                                        className="add-button"
                                        onClick={() => addToPlaylist(song)}
                                    >
                                        Add to Playlist...
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="edit-button" onClick={navigateBack}>
                Back to Songs
            </button>
        </div>
    );
}

export default SongSearchResults;
